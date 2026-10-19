"""Batch Swedish TTS with Chatterbox Multilingual (one model load for all lines).

    python scripts/chatterbox_tts.py <lines.json> <out_dir> <reference.wav>

lines.json maps scene id -> text. Writes <out_dir>/<scene>.raw.wav per line.

Chatterbox varies between takes and sometimes slurs a word. When faster-whisper
is installed, each take is transcribed and compared with the script; the best
take wins, and we stop early once a take reads back (almost) exactly.
  CB_TAKES         maximum takes per line (default 4)
  CB_EXAGGERATION  delivery energy: 0.5 is neutral, lower is calmer (default 0.35)
  CB_CFG           pacing: lower is slower and more relaxed (default 0.4)
"""
import difflib
import json
import os
import re
import sys

import torch
import torchaudio as ta
from chatterbox.mtl_tts import ChatterboxMultilingualTTS

lines_path, out_dir, reference = sys.argv[1:4]
lines = json.load(open(lines_path, encoding="utf-8"))
max_takes = int(os.environ.get("CB_TAKES", "4"))
exaggeration = float(os.environ.get("CB_EXAGGERATION", "0.35"))
cfg_weight = float(os.environ.get("CB_CFG", "0.4"))

device = "cuda" if torch.cuda.is_available() else "cpu"
model = ChatterboxMultilingualTTS.from_pretrained(device=device)

try:
    from faster_whisper import WhisperModel

    whisper = WhisperModel("small", device=device, compute_type="int8" if device == "cpu" else "float16")
except ImportError:
    whisper = None
    max_takes = 1

# Whisper writes numbers as digits; the script spells them out. Map the ones we use.
NUMBERS = {
    "tvåhundra": "200", "trettiofem": "35", "sjutusen": "7000", "sju tusen": "7000",
    "noll": "0", "trettio": "30", "tolv": "12", "hundra": "100", "fyrtiofem": "45",
}


def normalise(text: str) -> str:
    text = text.lower()
    for word, digits in NUMBERS.items():
        text = text.replace(word, digits)
    text = re.sub(r"[^\w\s]", " ", text)
    return " ".join(text.replace("-", " ").split())


def score(path: str, text: str) -> tuple[float, str]:
    segments, _ = whisper.transcribe(path, language="sv")
    heard = " ".join(s.text.strip() for s in segments)
    return difflib.SequenceMatcher(None, normalise(text), normalise(heard)).ratio(), heard


for scene, text in lines.items():
    best = None
    for take in range(max_takes):
        torch.manual_seed(7 + take)  # deterministic: re-runs give the same takes
        wav = model.generate(
            text,
            language_id="sv",
            audio_prompt_path=reference,
            exaggeration=exaggeration,
            cfg_weight=cfg_weight,
        )
        path = f"{out_dir}/{scene}.take{take}.wav"
        ta.save(path, wav, model.sr)
        if whisper is None:
            best = (1.0, "", path)
            break
        s, heard = score(path, text)
        if best is None or s > best[0]:
            best = (s, heard, path)
        if s >= 0.97:
            break
    os.replace(best[2], f"{out_dir}/{scene}.raw.wav")
    for f in os.listdir(out_dir):
        if f.startswith(f"{scene}.take"):
            os.remove(os.path.join(out_dir, f))
    print(f"{scene:14} take score {best[0]:.2f}  heard: {best[1]}", flush=True)
