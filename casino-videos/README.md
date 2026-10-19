# Casino videos

Motion-graphic explainer videos for [mga-casino-utan-svensk-licens.se](https://mga-casino-utan-svensk-licens.se),
made with [Remotion](https://www.remotion.dev). Vertical 1080×1920, Swedish narration, brand
colours, a URL badge throughout and a responsible-gambling end card.

The style guide and the step-by-step for new videos are in [CLAUDE.md](CLAUDE.md).

## Setup

```console
npm i
cp .env.example .env   # add your ElevenLabs key
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Opens Remotion Studio to preview every video |
| `npm run fetch-site` | Downloads all site pages to `content/pages.json` |
| `npm run voice <video-id>` | Generates the narration, e.g. `npm run voice snabba-uttag` |
| `npx remotion render <CompositionId> out/<name>.mp4 --codec=h264 --crf=16` | Renders a video |

Video ids for `npm run voice`: `omsattningskrav`, `nya-pay-n-play`, `snabba-uttag`,
`nya-pay-n-play-utan-svensk-licens`.

## Finished videos

Final renders are in [`renders/`](renders).

## Licences

- Remotion is free for individuals and companies of up to 3 people; larger teams need a
  [company licence](https://www.remotion.pro/license).
- Narration and sound effects are generated with ElevenLabs on a paid plan, which allows
  commercial use.
