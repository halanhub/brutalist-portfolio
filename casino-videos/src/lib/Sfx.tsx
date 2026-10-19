import React from "react";
import { Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { useStretch } from "./sceneTime";

export type SfxName =
  | "whoosh"
  | "pop"
  | "ticks"
  | "ding"
  | "typing"
  | "click"
  | "shimmer";

/**
 * Sound effect cued on the scene's base timeline, so it stays on its visual beat
 * when the scene is stretched to fit the narration. Effects live in public/sfx
 * (generated with ElevenLabs sound effects, levelled to -20 LUFS) and sit under
 * the voice, which is at -16 LUFS.
 */
export const Sfx: React.FC<{ name: SfxName; at: number; volume?: number }> = ({
  name,
  at,
  volume = 0.4,
}) => {
  const stretch = useStretch();
  return (
    <Sequence
      from={Math.round(at * stretch)}
      layout="none"
      name={`sfx: ${name}`}
    >
      <Audio src={staticFile(`sfx/${name}.mp3`)} volume={volume} />
    </Sequence>
  );
};
