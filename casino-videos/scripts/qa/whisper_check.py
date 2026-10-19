import sys
from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8")
for f in sys.argv[1:]:
    segs, _ = m.transcribe(f, language="sv")
    print(f.split("/")[-1], "→", " ".join(s.text.strip() for s in segs))
