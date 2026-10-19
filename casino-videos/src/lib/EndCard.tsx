import React from "react";
import { useSceneFrame } from "./sceneTime";
import { Sfx } from "./Sfx";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import { BlurWords, Stage } from "./primitives";
import { clamp, ease, entrance, theme } from "./theme";

/** Mandatory closing card on every video: logo, site, 18+, responsible gambling, Stödlinjen. */
export const EndCard: React.FC<{ site: string }> = ({ site }) => {
  const frame = useSceneFrame();
  const logo = interpolate(frame, [0, 26], [0, 1], {
    ...clamp,
    easing: ease.out,
  });
  const shine = interpolate(frame, [20, 50], [-120, 220], clamp);
  const p = interpolate(frame, [30, 48], [0, 1], {
    ...clamp,
    easing: ease.out,
  });
  return (
    <Stage tone="red">
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 90,
          gap: 56,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 460,
            height: 460,
            ...entrance(logo, { from: 0.7 }),
            rotate: logo > 0.985 ? "0deg" : `${(1 - logo) * -14}deg`,
            filter: `${logo > 0.975 ? "" : `blur(${((1 - logo) * 16).toFixed(1)}px) `}drop-shadow(0 40px 60px rgba(60,0,10,0.45))`,
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{ width: "100%", height: "100%" }}
          />
          {/* Light sweep across the chrome ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              overflow: "hidden",
              mixBlendMode: "screen",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20%",
                bottom: "-20%",
                width: "30%",
                left: `${shine}%`,
                rotate: "20deg",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
              }}
            />
          </div>
        </div>
        <div style={{ whiteSpace: "nowrap" }}>
          <BlurWords
            text={site}
            size={56}
            weight={600}
            start={16}
            stagger={2}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            ...entrance(p, { rise: 30 }),
          }}
        >
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                border: `4px solid ${theme.paper}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 38,
                fontWeight: 700,
              }}
            >
              18+
            </div>
            <div style={{ fontSize: 44, fontWeight: 600 }}>
              Spela ansvarsfullt
            </div>
          </div>
          <div
            style={{
              fontSize: 32,
              color: "rgba(255,255,255,0.8)",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Stödlinjen 020-81 91 00 · stodlinjen.se
            <br />
            Informationsvideo · Innehåller reklamlänkar på sajten
          </div>
        </div>
      </AbsoluteFill>
      <Sfx name="shimmer" at={0} volume={0.55} />
    </Stage>
  );
};
