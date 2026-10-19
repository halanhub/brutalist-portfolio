import React from "react";
import { AbsoluteFill, CalculateMetadataFunction, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SceneTime } from "./sceneTime";
import { Sfx } from "./Sfx";
import { UrlBadge } from "./UrlBadge";

const FPS = 30;
const T = 12; // transition length in frames
const VOICE_DELAY = 6; // frames of breath before each line
const VOICE_TAIL = 4; // frames of silence after each line, before the next transition
const MAX_STRETCH = 1.4; // longer narration holds the final layout instead of slowing animation further

export type SceneProps<D> = { d: D; exit: number };

export type SceneDef<D> = {
  /** Matches a key in the video's `voice` lines and the narration file name. */
  id: string;
  /** Base choreography length in frames; grows to fit the narration. */
  frames: number;
  C: React.FC<SceneProps<D>>;
};

export type ExplainerProps<D> = D & {
  /** Final frame count per scene, filled in from the voiceover manifest. */
  sceneFrames?: number[];
  withVoice?: boolean;
};

/**
 * Builds a narrated explainer: scenes cross-fade, each scene stretches to fit its
 * voice line, a whoosh marks every cut and the site badge stays on top throughout.
 */
export const makeExplainer = <D extends { site: string }>(videoId: string, scenes: SceneDef<D>[]) => {
  const voiceDir = `voiceover/${videoId}`;

  const calculateMetadata: CalculateMetadataFunction<ExplainerProps<D>> = async ({ props }) => {
    let voice: Record<string, number> = {};
    if (props.withVoice !== false) {
      const res = await fetch(staticFile(`${voiceDir}/manifest.json`));
      if (res.ok) voice = await res.json();
    }
    const sceneFrames = scenes.map(({ id, frames }) => {
      const spoken = voice[id] ? Math.ceil(voice[id] * FPS) + VOICE_DELAY + VOICE_TAIL + T : 0;
      return Math.max(frames, spoken);
    });
    return {
      durationInFrames: sceneFrames.reduce((a, b) => a + b, 0) - (scenes.length - 1) * T,
      props: { ...props, sceneFrames, withVoice: Object.keys(voice).length > 0 },
    };
  };

  const Component: React.FC<ExplainerProps<D>> = ({ sceneFrames, withVoice, ...rest }) => {
    const d = rest as unknown as D;
    return (
      <AbsoluteFill>
        <TransitionSeries>
          {scenes.map(({ id, frames, C }, i) => {
            const dur = sceneFrames?.[i] ?? frames;
            const stretch = Math.min(dur / frames, MAX_STRETCH);
            return (
              <React.Fragment key={id}>
                {i > 0 && (
                  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
                )}
                <TransitionSeries.Sequence durationInFrames={dur} name={id}>
                  <SceneTime stretch={stretch}>
                    <C d={d} exit={(dur - 14) / stretch} />
                  </SceneTime>
                  {i > 0 && (
                    <SceneTime stretch={1}>
                      <Sfx name="whoosh" at={0} volume={0.3} />
                    </SceneTime>
                  )}
                  {withVoice && (
                    <Sequence from={VOICE_DELAY} name={`voice: ${id}`}>
                      <Audio src={staticFile(`${voiceDir}/${id}.mp3`)} />
                    </Sequence>
                  )}
                </TransitionSeries.Sequence>
              </React.Fragment>
            );
          })}
        </TransitionSeries>
        <UrlBadge site={d.site} />
      </AbsoluteFill>
    );
  };

  return { Component, calculateMetadata };
};
