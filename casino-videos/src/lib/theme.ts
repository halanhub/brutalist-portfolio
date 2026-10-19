import type React from "react";
import { Easing } from "remotion";
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fonts are bundled in public/fonts so renders never depend on a network fetch.
export const font = "Inter Tight";
for (const subset of ["latin", "latin-ext"]) {
  loadFont({
    family: font,
    url: staticFile(`fonts/inter-tight-${subset}-wght-normal.woff2`),
    weight: "100 900",
  });
}

// One palette for every video. Swap these for the site's brand colours.
// Brand: Malta-flag red and white, from mga-casino-utan-svensk-licens.se.
export const theme = {
  ink: "#16090B",
  paper: "#FFFFFF",
  mute: "#7A6A6C",
  accent: "#CF142B",
  accentDeep: "#8E0A1B",
  accentSoft: "#F3A9B2",
  card: "rgba(255,255,255,0.8)",
};

// Shared motion vocabulary so every scene moves the same way.
export const ease = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
};

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/**
 * Style for an element entering with progress p (0 → 1): rise, scale and blur.
 *
 * Ease-out curves spend many frames moving by fractions of a pixel. Rendering
 * those sub-pixel offsets, tiny scales and near-zero blurs makes text re-raster
 * slightly differently every frame, which reads as shaking. So the tail snaps to
 * rest, translations land on whole pixels, and filters switch off once invisible.
 */
export const entrance = (
  p: number,
  { rise = 0, from = 1, blur = 0 }: { rise?: number; from?: number; blur?: number },
): React.CSSProperties => {
  const q = p > 0.985 ? 1 : p;
  const b = (1 - q) * blur;
  return {
    opacity: q,
    translate: `0 ${Math.round((1 - q) * rise)}px`,
    scale: q === 1 ? "1" : String(from + (1 - from) * q),
    filter: b < 0.4 ? "none" : `blur(${b.toFixed(1)}px)`,
  };
};
