# Casino videos – house style and workflow

Branded vertical (9:16) motion-graphic explainers for **mga-casino-utan-svensk-licens.se**,
built with Remotion. Each video explains one page/keyword of the site, narrated in Swedish.
Read this before making or changing a video.

## Making a new video

1. **Content:** `npm run fetch-site` pulls every page via the WordPress REST API into
   `content/pages.json`; `python3 scripts/page-to-text.py content/pages.json <slug>` prints one
   page as text. Base the script on what the page says; don't invent facts.
2. **Angle:** if an earlier video already covers the topic, pick a different angle (see
   *Videos so far*) so videos are not duplicate content.
3. **Code:** create `src/videos/<name>/` with
   - `data.ts`: site, on-screen text, and a `voice` object with one narration line per scene
     (ids must match the scene ids). Write numbers out in words ("tvåhundra", "sju tusen").
   - `scenes.tsx`: one component per scene, typed `SceneProps<YourData>` from `src/lib/Explainer`.
   - `<Name>Explainer.tsx`: the scene list (`{ id, frames, C }`, always ending with the shared
     `EndCard`) passed to `makeExplainer("<voice-dir>", scenes)`.
   - Register a `<Composition>` in `src/Root.tsx` (1080×1920, 30 fps) and add the video to the
     `videos` map in `scripts/generate-voiceover.mjs`.
4. **Voice:** `npm run voice <voice-dir>` (needs `ELEVENLABS_API_KEY`). Writes
   `public/voiceover/<voice-dir>/*.mp3` plus `manifest.json`; scenes stretch to fit their line.
5. **Check before rendering:**
   - `npx tsc --noEmit`
   - stills of every scene: `npx remotion still <CompositionId> out/x.png --frame=N --scale=0.3`;
     look for clipped text, overlaps and anything colliding with the URL badge at the top
   - narration: `python3 scripts/qa/whisper_check.py public/voiceover/<voice-dir>/*.mp3`
     (Whisper writes "BankID" as "bankidé"; that is the correct Swedish pronunciation)
6. **Render:** `npx remotion render <CompositionId> out/<name>-9x16.mp4 --codec=h264 --crf=16`,
   and copy the final file to `renders/`.

## Brand

- Colours live in `src/lib/theme.ts`: Malta-flag red `#CF142B` (`accent`), deep red, soft pink,
  white and near-black ink. Alternate red and white scenes (`<Stage tone="red">` / `<Stage>`).
- Font: Inter Tight, bundled in `public/fonts` (renders must not depend on network fonts).
- `public/logo.png` is the site logo (Pharaoh hound in a chrome ring).
- **URL badge** (`UrlBadge`) is visible for the whole video, pinned at the top inside the
  Reels/TikTok safe zone. `makeExplainer` adds it automatically.
- **End card** (`EndCard`) closes every video: logo, domain, 18+, "Spela ansvarsfullt",
  Stödlinjen 020-81 91 00, "Informationsvideo · Innehåller reklamlänkar på sajten".

## Voice and sound

- Narrator: ElevenLabs library voice **Malin – Professional Swedish Narration**
  (`zyfJspwEDo0sxPeFmtsn`), model `eleven_multilingual_v2`; this is the default when
  `ELEVENLABS_API_KEY` is set. The user rejected Microsoft Sofie/Mattias, Piper and Chatterbox
  voices as sounding unnatural; Chatterbox remains only as an offline fallback.
- Narration is loudness-normalised to -16 LUFS; sound effects in `public/sfx` sit at -20 LUFS
  and play at volume 0.25–0.6 under the voice. Cue them with `<Sfx name at volume>` on the
  scene's base timeline.
- Every scene cut gets a soft whoosh automatically.
- Never commit the API key. Use `.env` (git-ignored) or environment secrets.

## Motion rules (learned the hard way)

- Animate only with `useSceneFrame()` + `interpolate()`; never CSS transitions.
- Use `entrance(p, { rise, from, blur })` from `theme.ts` for anything that moves in. It snaps
  the ease-out tail, rounds translations to whole pixels and turns filters off when invisible.
  Raw sub-pixel tails made text visibly **shake**.
- Counters (`CountUp`) land on the final value instead of crawling through the last digits.
- `MaskLine` reveals need headroom for **Å/Ä/Ö**; the padding in `kinetic.tsx` handles it, so
  don't remove it (uppercase umlauts were getting cut off).
- Give each new keyword its own visual concept while keeping the brand. Styles used so far:
  blur-in words and glass cards; mask-reveal capitals with a phone mockup; stopwatch and moving
  coin tracks with a stamp; tilted marquees, camera pan, flip cards and red flags.

## Content rules

These are deliberate and agreed with the site owner. Keep them in every video:

- Don't present "no Spelpaus" as a selling point. Where Spelpaus comes up, frame it as a
  protection you don't have, and include a "Har du Spelpaus? Respektera din avstängning." beat.
- Don't show ways around Swedish bank blocks (Revolut/Wise tips, "undvik svenska banker",
  Swish/Trustly alternatives).
- No named casino brands (several on the site actually hold Swedish licences).
- No paid-ad framing; these are informational videos for the site, YouTube and organic social.

## Videos so far

| Composition | Keyword / page | Angle and style |
|---|---|---|
| `Omsattningskrav-9x16` | casino utan omsättningskrav | wagering maths (200 kr × 35x = 7 000 kr), tiers, game contribution; blur-in words, glass cards |
| `NyaPayNPlay-9x16` | nya pay n play casino | what Pay N Play is, the BankID flow on a phone, sign-up time race, checklist |
| `SnabbaUttag-9x16` | casino utan svensk licens snabba uttag | pending period, payout time per method, ID verification stamp, limits, 3 tips |
| `NyaPayNPlayUtanLicens-9x16` | nya pay n play casino utan svensk licens | 3 steps, Swedish vs foreign licence (supervision, tax on winnings, Spelpaus), what's new, red flags |
