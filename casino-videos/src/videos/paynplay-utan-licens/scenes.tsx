import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { SceneProps as BaseSceneProps } from "../../lib/Explainer";
import { MaskLine, RingBurst } from "../../lib/kinetic";
import { GlassCard, Stage } from "../../lib/primitives";
import { useSceneFrame } from "../../lib/sceneTime";
import { Sfx } from "../../lib/Sfx";
import { clamp, ease, entrance, theme } from "../../lib/theme";
import { PayNPlayUtanLicensData } from "./data";

type SceneProps = BaseSceneProps<PayNPlayUtanLicensData>;

const Column: React.FC<{ children: React.ReactNode; gap?: number; style?: React.CSSProperties }> = ({
  children,
  gap = 40,
  style,
}) => (
  <AbsoluteFill
    style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 80, gap, ...style }}
  >
    {children}
  </AbsoluteFill>
);

const useProgress = (from: number, to: number, easing = ease.out) =>
  interpolate(useSceneFrame(), [from, to], [0, 1], { ...clamp, easing });

// 1 ─ Two tilted marquee bands scroll the keyword across a red stage.
const Marquee: React.FC<{ text: string; speed: number; top: number; rotate: number; inverted?: boolean; start: number }> = ({
  text,
  speed,
  top,
  rotate,
  inverted,
  start,
}) => {
  const frame = useSceneFrame();
  const p = useProgress(start, start + 16);
  const offset = Math.round((frame * speed) % 1400);
  const item = (
    <span style={{ padding: "0 40px" }}>
      {text} <span style={{ opacity: 0.5 }}>●</span>
    </span>
  );
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: -300,
        width: 1700,
        rotate: `${rotate}deg`,
        background: inverted ? theme.paper : theme.accentDeep,
        color: inverted ? theme.accent : theme.paper,
        padding: "22px 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: 64,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        textTransform: "uppercase",
        ...entrance(p, { rise: rotate > 0 ? 80 : -80 }),
      }}
    >
      <div style={{ translate: `${-offset}px 0` }}>
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  );
};

export const Hook: React.FC<SceneProps> = ({ d, exit }) => {
  const out = useProgress(exit, exit + 12, ease.in);
  return (
    <Stage tone="red">
      <Marquee text={d.marquee} speed={9} top={330} rotate={-6} start={0} />
      <Marquee text={d.marquee} speed={-7} top={1440} rotate={5} inverted start={4} />
      <Column gap={0}>
        <MaskLine start={10} size={130} color={theme.paper} exitAt={exit}>
          {d.hook[0]}
        </MaskLine>
        <MaskLine start={16} size={190} color={theme.paper} exitAt={exit + 2}>
          {d.hook[1]}
        </MaskLine>
        <div style={{ marginTop: 34, fontSize: 40, fontWeight: 600, color: theme.paper, ...entrance(useProgress(30, 46) * (1 - out), { rise: 24 }) }}>
          {d.hookSub}
        </div>
      </Column>
      <Sfx name="whoosh" at={0} volume={0.45} />
      <Sfx name="whoosh" at={10} volume={0.35} />
    </Stage>
  );
};

// 2 ─ Camera pans across three panels, each led by a giant outlined numeral.
const ICONS: Record<string, React.ReactNode> = {
  "1": <path d="M4 7h16v10H4z M8 12h8 M12 9v6" />,
  "2": (
    <>
      <path d="M12 11c0 3.5-1 6.5-3 9" />
      <path d="M15.5 12.5c0 3-.6 5.5-1.8 7.8" />
      <path d="M8.5 10.5a3.5 3.5 0 0 1 7 0" />
      <path d="M6 13c0-1 .1-2 .5-3a6 6 0 0 1 11 .5c.4 1.4.5 3 .4 4.5" />
    </>
  ),
  "3": <path d="M8 5v14l11-7z" />,
};

export const Steps: React.FC<SceneProps> = ({ d }) => {
  const frame = useSceneFrame();
  // Hold on each panel, then glide to the next.
  const pan = interpolate(frame, [0, 46, 64, 106, 124], [0, 0, 1, 1, 2], { ...clamp, easing: ease.inOut });
  return (
    <Stage>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", width: 1080 * 3, height: "100%", translate: `${-Math.round(pan * 1080)}px 0` }}>
          {d.steps.map((s, i) => {
            const local = useProgress(i === 0 ? 4 : 50 + (i - 1) * 60, (i === 0 ? 4 : 50 + (i - 1) * 60) + 18);
            return (
              <div key={s.n} style={{ width: 1080, height: "100%", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 100px" }}>
                <div
                  style={{
                    position: "absolute",
                    right: 40,
                    top: 360,
                    fontSize: 760,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "transparent",
                    WebkitTextStroke: `4px ${theme.accentSoft}`,
                    ...entrance(local, { rise: 120 }),
                  }}
                >
                  {s.n}
                </div>
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={entrance(local, { from: 0.5 })}>
                  {ICONS[s.n]}
                </svg>
                <div style={{ fontSize: 34, fontWeight: 700, color: theme.accent, letterSpacing: "0.16em", textTransform: "uppercase", marginTop: 40 }}>
                  Steg {s.n} av 3
                </div>
                <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.02, marginTop: 14, maxWidth: 760, ...entrance(local, { rise: 50 }) }}>{s.label}</div>
                <div style={{ fontSize: 38, color: theme.mute, marginTop: 20, ...entrance(local, { rise: 30 }) }}>{s.note}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      {/* Progress dots */}
      <div style={{ position: "absolute", bottom: 300, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 18 }}>
        {[0, 1, 2].map((i) => {
          const active = Math.max(0, 1 - Math.abs(pan - i));
          return <div key={i} style={{ width: 18 + Math.round(active * 42), height: 18, borderRadius: 9, background: active > 0.5 ? theme.accent : theme.accentSoft }} />;
        })}
      </div>
      <Sfx name="pop" at={4} volume={0.4} />
      <Sfx name="whoosh" at={46} volume={0.45} />
      <Sfx name="whoosh" at={106} volume={0.45} />
      <Sfx name="click" at={64} volume={0.4} />
      <Sfx name="click" at={124} volume={0.4} />
    </Stage>
  );
};

// 3 ─ Comparison: left values sit still, right values flip in like split-flap cards.
export const Compare: React.FC<SceneProps> = ({ d }) => {
  const frame = useSceneFrame();
  return (
    <Stage>
      <Column gap={26}>
        <MaskLine start={0} size={78} weight={800} uppercase={false}>
          Svensk vs <span style={{ color: theme.accent }}>utländsk</span> licens
        </MaskLine>
        <div style={{ height: 14 }} />
        <div style={{ display: "flex", width: "100%", gap: 20, ...entrance(useProgress(8, 22), { rise: 20 }) }}>
          <div style={{ flex: 1, fontSize: 30, fontWeight: 700, color: theme.mute, textAlign: "center" }}>{d.compare.left}</div>
          <div style={{ flex: 1, fontSize: 30, fontWeight: 700, color: theme.accent, textAlign: "center" }}>{d.compare.right}</div>
        </div>
        {d.compare.rows.map((r, i) => {
          const s = 16 + i * 30;
          const flip = interpolate(frame, [s + 10, s + 24], [90, 0], { ...clamp, easing: ease.out });
          return (
            <div key={r.label} style={{ width: "100%" }}>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: theme.mute, marginBottom: 12, ...entrance(useProgress(s, s + 12), { rise: 12 }) }}>
                {r.label}
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                <GlassCard start={s} style={{ flex: 1, padding: "34px 30px", fontSize: 38, fontWeight: 700, textAlign: "center", minHeight: 170, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {r.left}
                </GlassCard>
                <div style={{ flex: 1, perspective: 900 }}>
                  <div
                    style={{
                      height: "100%",
                      minHeight: 170,
                      padding: "34px 30px",
                      borderRadius: 44,
                      background: theme.accent,
                      color: theme.paper,
                      fontSize: 38,
                      fontWeight: 750,
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 30px 60px -30px rgba(150,0,20,0.6)",
                      transform: flip === 0 ? undefined : `rotateX(${flip.toFixed(1)}deg)`,
                      opacity: flip >= 89 ? 0 : 1,
                    }}
                  >
                    {r.right}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Column>
      {d.compare.rows.map((_, i) => (
        <React.Fragment key={i}>
          <Sfx name="pop" at={16 + i * 30} volume={0.3} />
          <Sfx name="click" at={28 + i * 30} volume={0.5} />
        </React.Fragment>
      ))}
    </Stage>
  );
};

// 4 ─ Bento of three feature tiles on red.
const NEWS_ICONS: Record<string, React.ReactNode> = {
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l3 2 M10 2h4" />
    </>
  ),
};

export const News: React.FC<SceneProps> = ({ d }) => (
  <Stage tone="red">
    <Column gap={30}>
      <MaskLine start={0} size={96} color={theme.paper}>
        Vad är nytt?
      </MaskLine>
      <div style={{ height: 20 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, width: "100%" }}>
        {d.news.map((n, i) => {
          const s = 14 + i * 12;
          return (
            <div
              key={n.label}
              style={{
                gridColumn: i === 0 ? "1 / span 2" : undefined,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RingBurst start={s + 8} size={420} color={theme.paper} />
              <div
                style={{
                  width: "100%",
                  height: i === 0 ? 300 : 360,
                  borderRadius: 48,
                  background: theme.paper,
                  color: theme.ink,
                  padding: 44,
                  display: "flex",
                  flexDirection: i === 0 ? "row" : "column",
                  alignItems: i === 0 ? "center" : "flex-start",
                  justifyContent: i === 0 ? "flex-start" : "space-between",
                  gap: 36,
                  boxShadow: "0 40px 80px -30px rgba(60,0,10,0.5)",
                  ...entrance(useProgress(s, s + 20), { rise: 80, from: 0.85 }),
                }}
              >
                <div style={{ width: 120, height: 120, borderRadius: 32, background: theme.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={theme.paper} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {NEWS_ICONS[n.icon]}
                  </svg>
                </div>
                <div style={{ fontSize: i === 0 ? 58 : 46, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{n.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Column>
    {d.news.map((_, i) => (
      <Sfx key={i} name="pop" at={14 + i * 12} volume={0.4} />
    ))}
  </Stage>
);

// 5 ─ Red flags: each card's flag swings in, then the warning text lands.
export const Flags: React.FC<SceneProps> = ({ d }) => {
  const frame = useSceneFrame();
  return (
    <Stage>
      <Column gap={30}>
        <MaskLine start={0} size={96} weight={850}>
          Röda <span style={{ color: theme.accent }}>flaggor</span>
        </MaskLine>
        <div style={{ height: 20 }} />
        {d.flags.map((f, i) => {
          const s = 16 + i * 26;
          const swing = frame < s ? -40 : Math.round(Math.exp(-(frame - s) / 10) * Math.cos((frame - s) / 3) * -30);
          return (
            <GlassCard key={f} start={s - 6} style={{ width: "100%", padding: "36px 40px", display: "flex", alignItems: "center", gap: 34 }}>
              <svg width="84" height="84" viewBox="0 0 24 24" style={{ flexShrink: 0, rotate: `${swing}deg`, transformOrigin: "20% 95%" }}>
                <path d="M5 21V3" stroke={theme.ink} strokeWidth="2" strokeLinecap="round" />
                <path d="M5 4h12l-2.5 4L17 12H5z" fill={theme.accent} />
              </svg>
              <div style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.15 }}>{f}</div>
            </GlassCard>
          );
        })}
      </Column>
      {d.flags.map((_, i) => (
        <Sfx key={i} name="whoosh" at={14 + i * 26} volume={0.3} />
      ))}
    </Stage>
  );
};

// 6 ─ Calm responsible-gambling beat on red.
export const Respect: React.FC<SceneProps> = ({ d, exit }) => (
  <Stage tone="red">
    <Column gap={10}>
      <MaskLine start={4} size={88} weight={800} uppercase={false} color={theme.paper} exitAt={exit}>
        {d.respect[0]}
      </MaskLine>
      <MaskLine start={16} size={64} weight={700} uppercase={false} color={theme.paper} exitAt={exit + 2}>
        {d.respect[1]}
      </MaskLine>
    </Column>
  </Stage>
);
