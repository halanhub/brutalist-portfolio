import React from "react";
import { interpolate } from "remotion";
import { useSceneFrame } from "./sceneTime";
import { clamp, ease, entrance, theme } from "./theme";

/**
 * Headline line that slides up from behind a mask, the "editorial" reveal used
 * by the Pay N Play template. Exits by sliding on up out of the mask.
 */
export const MaskLine: React.FC<{
  children: React.ReactNode;
  start?: number;
  size?: number;
  weight?: number;
  color?: string;
  exitAt?: number;
  uppercase?: boolean;
}> = ({ children, start = 0, size = 120, weight = 800, color, exitAt, uppercase = true }) => {
  const frame = useSceneFrame();
  const inP = interpolate(frame, [start, start + 18], [0, 1], { ...clamp, easing: ease.out });
  const outP =
    exitAt === undefined ? 0 : interpolate(frame, [exitAt, exitAt + 12], [0, 1], { ...clamp, easing: ease.in });
  // Travel far enough (140% of the line) to clear the padded mask in both directions.
  const y = inP > 0.985 ? 0 : Math.round((1 - inP) * 140);
  return (
    // The mask needs headroom above the cap height for Å/Ä/Ö and room below for
    // descenders; the negative margins keep the line's layout box unchanged.
    <div
      style={{
        overflow: "hidden",
        lineHeight: 1,
        paddingTop: size * 0.25,
        paddingBottom: size * 0.12,
        marginTop: -size * 0.25,
        marginBottom: -size * 0.04,
        textAlign: "center",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          fontSize: size,
          fontWeight: weight,
          letterSpacing: uppercase ? "-0.045em" : "-0.03em",
          textTransform: uppercase ? "uppercase" : undefined,
          color,
          translate: `0 ${y - Math.round(outP * 140)}%`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Check mark that draws its stroke, inside a filled circle that pops in. */
export const DrawCheck: React.FC<{ start: number; size?: number; bg?: string; fg?: string }> = ({
  start,
  size = 72,
  bg = theme.accent,
  fg = theme.paper,
}) => {
  const frame = useSceneFrame();
  const pop = interpolate(frame, [start, start + 10], [0, 1], { ...clamp, easing: ease.out });
  const draw = interpolate(frame, [start + 6, start + 20], [0, 1], { ...clamp, easing: ease.inOut });
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        ...entrance(pop, { from: 0.4 }),
      }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
        <path
          d="M4 12.5l5 5L20 6.5"
          stroke={fg}
          strokeWidth={3.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
      </svg>
    </div>
  );
};

/** Expanding ring, used as an accent burst behind an element landing. */
export const RingBurst: React.FC<{ start: number; size?: number; color?: string }> = ({
  start,
  size = 600,
  color = theme.accent,
}) => {
  const frame = useSceneFrame();
  const p = interpolate(frame, [start, start + 26], [0, 1], { ...clamp, easing: ease.out });
  if (p <= 0 || p >= 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `${Math.max(1, Math.round(10 * (1 - p)))}px solid ${color}`,
        opacity: 1 - p,
        scale: String(0.3 + p * 0.9),
        pointerEvents: "none",
      }}
    />
  );
};

/** Phone frame. Children render inside the screen (clipped to its rounded corners). */
export const Phone: React.FC<{ width?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  width = 560,
  children,
  style,
}) => {
  const height = width * 2.05;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: width * 0.15,
        background: "#0E0A0B",
        padding: width * 0.03,
        boxShadow: "0 60px 120px -40px rgba(90,0,15,0.55), 0 0 0 2px rgba(255,255,255,0.08) inset",
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: width * 0.125,
          overflow: "hidden",
          background: theme.paper,
        }}
      >
        {children}
        {/* Dynamic island */}
        <div
          style={{
            position: "absolute",
            top: width * 0.03,
            left: "50%",
            translate: "-50% 0",
            width: width * 0.3,
            height: width * 0.065,
            borderRadius: 999,
            background: "#0E0A0B",
          }}
        />
      </div>
    </div>
  );
};
