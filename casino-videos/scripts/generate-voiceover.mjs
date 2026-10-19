// Generates one narration file per scene and a manifest with their durations.
//
//   node scripts/generate-voiceover.mjs <videoId>
//
// TTS_PROVIDER picks the engine (default: elevenlabs when ELEVENLABS_API_KEY is set):
//   elevenlabs            ELEVENLABS_VOICE_ID overrides the default voice (Malin)
//   chatterbox            free, open source, copies the voice in voices/reference.wav
//     CHATTERBOX_PYTHON   python with chatterbox-tts installed (default: python3)
//     VOICE_REF           reference clip to copy (default: voices/reference.wav)
//   edge                  Microsoft Sofie/Mattias via the edge-tts CLI
//     EDGE_VOICE          sv-SE-SofieNeural (default) or sv-SE-MattiasNeural
//     EDGE_TTS            path to the edge-tts binary (default: edge-tts)
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const videos = {
  omsattningskrav: "src/videos/wagering/data.ts",
  "nya-pay-n-play": "src/videos/paynplay/data.ts",
  "snabba-uttag": "src/videos/payouts/data.ts",
  "nya-pay-n-play-utan-svensk-licens": "src/videos/paynplay-utan-licens/data.ts",
};

const videoId = process.argv[2];
if (!videos[videoId]) {
  console.error(`Usage: node scripts/generate-voiceover.mjs <${Object.keys(videos).join("|")}>`);
  process.exit(1);
}

// Data files are TypeScript; Node strips the types for us.
const mod = await import(pathToFileURL(path.resolve(videos[videoId])).href);
const data = Object.values(mod).find((v) => v && typeof v === "object" && v.voice);
const outDir = path.join("public", "voiceover", videoId);
mkdirSync(outDir, { recursive: true });

const elevenKey = process.env.ELEVENLABS_API_KEY;
const provider = process.env.TTS_PROVIDER ?? (elevenKey ? "elevenlabs" : "chatterbox");

const elevenlabs = async (text, file) => {
  // Default: "Malin - Professional Swedish Narration" from the ElevenLabs voice library.
  const voiceId = process.env.ELEVENLABS_VOICE_ID ?? "zyfJspwEDo0sxPeFmtsn";
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": elevenKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.2, use_speaker_boost: true },
    }),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
};

const edge = (text, file) => {
  execFileSync(process.env.EDGE_TTS ?? "edge-tts", [
    "--voice", process.env.EDGE_VOICE ?? "sv-SE-SofieNeural",
    "--rate", "+8%",
    "--text", text,
    "--write-media", file,
  ]);
};

const seconds = (file) =>
  Number(
    execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file])
      .toString()
      .trim(),
  );

// Trim leading/trailing silence and normalise loudness so every line sits at the same level.
const polish = (raw, file) => {
  const trim = "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05";
  execFileSync("ffmpeg", [
    "-v", "error", "-y", "-i", raw,
    "-af", `${trim},areverse,${trim},areverse,loudnorm=I=-16:TP=-1.5:LRA=11`,
    "-ar", "44100", "-b:a", "192k", file,
  ]);
  rmSync(raw);
};

// Chatterbox renders every line in one Python process so the model loads once.
if (provider === "chatterbox") {
  const linesFile = path.join(outDir, "lines.json");
  writeFileSync(linesFile, JSON.stringify(data.voice));
  execFileSync(
    process.env.CHATTERBOX_PYTHON ?? "python3",
    ["scripts/chatterbox_tts.py", linesFile, outDir, process.env.VOICE_REF ?? "voices/reference.wav"],
    { stdio: ["ignore", "inherit", "ignore"] },
  );
  rmSync(linesFile);
}

const manifest = {};
for (const [scene, text] of Object.entries(data.voice)) {
  const file = path.join(outDir, `${scene}.mp3`);
  let raw;
  if (provider === "chatterbox") {
    raw = path.join(outDir, `${scene}.raw.wav`);
  } else if (provider === "elevenlabs") {
    raw = path.join(outDir, `${scene}.raw.mp3`);
    await elevenlabs(text, raw);
  } else {
    raw = path.join(outDir, `${scene}.raw.mp3`);
    edge(text, raw);
  }
  polish(raw, file);
  manifest[scene] = seconds(file);
  console.log(`${scene.padEnd(14)} ${manifest[scene].toFixed(2)}s`);
}
writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Provider: ${provider} → ${outDir}`);
