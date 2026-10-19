import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useSceneFrame } from "./sceneTime";
import { clamp, ease, entrance, font, theme } from "./theme";

/** Soft gradient stage, white or brand red, with a slowly drifting glow. */
export const Stage: React.FC<{
  tone?: "light" | "red";
  children?: React.ReactNode;
}> = ({ tone = "light", children }) => {
  const red = tone === "red";
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const drift = Math.sin(frame / 40) * height * 0.03;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: red ? theme.accent : theme.paper,
        fontFamily: font,
        color: red ? theme.paper : theme.ink,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background: red
            ? `radial-gradient(70% 45% at 50% ${15 + drift / 20}%, #FF4A5E 0%, transparent 70%), radial-gradient(80% 50% at 50% ${100 + drift / 20}%, ${theme.accentDeep} 0%, transparent 75%)`
            : `radial-gradient(80% 45% at 50% ${100 + drift / 20}%, ${theme.accent}33 0%, ${theme.accent}0D 45%, transparent 75%)`,
        }}
      />
      {children}
      <Grain />
    </AbsoluteFill>
  );
};

/** Animated film grain, regenerated every 2 frames. */
const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2);
  const x = Math.floor(random(`gx${seed}`) * 200);
  const y = Math.floor(random(`gy${seed}`) * 200);
  return (
    <AbsoluteFill
      style={{
        opacity: 0.07,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundPosition: `${x}px ${y}px`,
        pointerEvents: "none",
      }}
    />
  );
};

/**
 * Kinetic headline: each word rises out of a blur, staggered.
 * `start` and `stagger` are in frames. Words wrapped in *asterisks* get the accent colour.
 */
export const BlurWords: React.FC<{
  text: string;
  start?: number;
  stagger?: number;
  size?: number;
  weight?: number;
  color?: string;
  accent?: string;
  exitAt?: number;
  align?: "center" | "left";
}> = ({
  text,
  start = 0,
  stagger = 4,
  size = 96,
  weight = 600,
  color,
  accent = theme.accent,
  exitAt,
  align = "center",
}) => {
  const frame = useSceneFrame();
  // Accent spans may cover several words: "*ta ut*".
  let inAccent = false;
  const words = text.split(" ").map((raw) => {
    const opens = raw.startsWith("*");
    const closes = raw.endsWith("*");
    const accent = inAccent || opens;
    if (opens) inAccent = true;
    if (closes) inAccent = false;
    return { word: raw.replace(/\*/g, ""), accent };
  });
  const exit =
    exitAt === undefined
      ? 0
      : interpolate(frame, [exitAt, exitAt + 12], [0, 1], {
          ...clamp,
          easing: ease.in,
        });
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: `0 ${size * 0.26}px`,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: "-0.035em",
        lineHeight: 1.05,
        color,
        textAlign: align,
        opacity: 1 - exit,
        filter: exit < 0.02 ? "none" : `blur(${(exit * 24).toFixed(1)}px)`,
        scale: exit < 0.02 ? "1" : String(1 + exit * 0.06),
      }}
    >
      {words.map(({ word, accent: isAccent }, i) => {
        const t0 = start + i * stagger;
        const p = interpolate(frame, [t0, t0 + 16], [0, 1], {
          ...clamp,
          easing: ease.out,
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              ...entrance(p, { rise: size * 0.5, blur: 18 }),
              color: isAccent ? accent : undefined,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

/** Frosted glass card that springs in. */
export const GlassCard: React.FC<{
  start?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ start = 0, style, children }) => {
  const frame = useSceneFrame();
  const p = interpolate(frame, [start, start + 22], [0, 1], {
    ...clamp,
    easing: ease.out,
  });
  return (
    <div
      style={{
        background: theme.card,
        backdropFilter: "blur(24px)",
        border: "1.5px solid rgba(207,20,43,0.08)",
        borderRadius: 44,
        boxShadow:
          "0 40px 80px -30px rgba(120,10,25,0.3), 0 2px 0 rgba(255,255,255,0.8) inset",
        ...entrance(p, { rise: 120, from: 0.92, blur: 14 }),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Number that counts up with Swedish thousand separators. */
export const CountUp: React.FC<{
  to: number;
  start: number;
  duration?: number;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({ to, start, duration = 30, suffix = "", style }) => {
  const frame = useSceneFrame();
  const p = interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: ease.inOut,
  });
  // Land on the final value instead of crawling through the last few digits,
  // which reads as flicker.
  const v = p > 0.92 ? to : p * to;
  const text = Math.round(v)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (
    <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {text}
      {suffix}
    </span>
  );
};

/** Small uppercase label above headlines. */
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  start?: number;
  color?: string;
}> = ({ children, start = 0, color = theme.accent }) => {
  const frame = useSceneFrame();
  const p = interpolate(frame, [start, start + 14], [0, 1], {
    ...clamp,
    easing: ease.out,
  });
  return (
    <div
      style={{
        fontSize: 30,
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color,
        ...entrance(p, { rise: 20 }),
      }}
    >
      {children}
    </div>
  );
};
