import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, ease, entrance, font, theme } from "./theme";

/**
 * Persistent site badge pinned to the top of every video. A white pill reads on
 * both the red and the white scenes. Sits inside the platform safe zone (below
 * the Reels/TikTok header, well above the caption area).
 */
export const UrlBadge: React.FC<{ site: string }> = ({ site }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const p = interpolate(frame, [6, 28], [0, 1], { ...clamp, easing: ease.out });
  // Slow light sweep across the pill every 6 seconds keeps it alive without distracting.
  const sweep = interpolate(frame % 180, [0, 40], [-40, 140], clamp);
  return (
    <div
      style={{
        position: "absolute",
        top: 120,
        left: 0,
        width,
        display: "flex",
        justifyContent: "center",
        ...entrance(p, { rise: -40, blur: 10 }),
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "12px 34px 12px 12px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.92)",
          border: "1.5px solid rgba(207,20,43,0.12)",
          boxShadow: "0 18px 40px -16px rgba(90,0,15,0.45)",
          fontFamily: font,
        }}
      >
        <Img src={staticFile("logo.png")} style={{ width: 64, height: 64 }} />
        <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.01em", color: theme.ink }}>
          {site.replace(/\.se$/, "")}
          <span style={{ color: theme.accent }}>.se</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${sweep}%`,
            width: "25%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
            rotate: "15deg",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};
