import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { SceneProps as BaseSceneProps } from "../../lib/Explainer";
import { DrawCheck, MaskLine, RingBurst } from "../../lib/kinetic";
import { Eyebrow, GlassCard, Stage } from "../../lib/primitives";
import { useSceneFrame } from "../../lib/sceneTime";
import { Sfx } from "../../lib/Sfx";
import { clamp, ease, entrance, theme } from "../../lib/theme";
import { PayoutsData } from "./data";

type SceneProps = BaseSceneProps<PayoutsData>;

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

// 1 ─ A stopwatch sweeps around the headline.
export const Hook: React.FC<SceneProps> = ({ d, exit }) => {
  const frame = useSceneFrame();
  const sweep = interpolate(frame, [0, 70], [0, 1], { ...clamp, easing: ease.inOut });
  const ringIn = useProgress(0, 18);
  const out = useProgress(exit, exit + 12, ease.in);
  return (
    <Stage tone="red">
      <Column gap={0}>
        <svg
          width="1000"
          height="1000"
          viewBox="0 0 100 100"
          style={{ position: "absolute", ...entrance(ringIn * (1 - out), { from: 0.85 }) }}
        >
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" />
          {Array.from({ length: 60 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1={i % 5 ? 6.5 : 5.5}
              x2="50"
              y2="8.5"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={i % 5 ? 0.3 : 0.6}
              transform={`rotate(${i * 6} 50 50)`}
            />
          ))}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke={theme.paper}
            strokeWidth="1.6"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - sweep}
            transform="rotate(-90 50 50)"
          />
          <circle cx="50" cy="4" r="1.6" fill={theme.paper} transform={`rotate(${sweep * 360} 50 50)`} />
        </svg>
        <MaskLine start={8} size={150} color={theme.paper} exitAt={exit}>
          {d.hook[0]}
        </MaskLine>
        <MaskLine start={14} size={150} color={theme.paper} exitAt={exit + 2}>
          {d.hook[1]}
        </MaskLine>
        <div style={{ marginTop: 30, fontSize: 34, fontWeight: 600, color: theme.paper, maxWidth: 640, textAlign: "center", ...entrance(useProgress(30, 46) * (1 - out), { rise: 24 }) }}>
          {d.hookSub}
        </div>
      </Column>
      <Sfx name="ticks" at={0} volume={0.35} />
      <Sfx name="whoosh" at={8} volume={0.45} />
      <Sfx name="ding" at={68} volume={0.25} />
    </Stage>
  );
};

// 2 ─ Two tracks: a coin crawls through a long pending zone, the other arrives at once.
const Track: React.FC<{ label: string; wait: string; note: string; pending: number; travel: number; highlight?: boolean; start: number }> = ({
  label,
  wait,
  note,
  pending,
  travel,
  highlight,
  start,
}) => {
  const W = 820;
  const x = Math.round(travel * (W - 60));
  const arrived = travel >= 1;
  return (
    <GlassCard start={start} style={{ width: "100%", padding: "40px 44px", background: highlight ? theme.accent : theme.card, color: highlight ? theme.paper : theme.ink }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontSize: 42, fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: 58, fontWeight: 800, letterSpacing: "-0.03em" }}>{wait}</div>
      </div>
      <div style={{ fontSize: 28, opacity: 0.7, marginTop: 4 }}>{note}</div>
      <div style={{ position: "relative", width: W, height: 60, marginTop: 30 }}>
        <div style={{ position: "absolute", top: 26, left: 0, right: 0, height: 8, borderRadius: 4, background: highlight ? "rgba(255,255,255,0.3)" : "rgba(22,9,11,0.08)" }} />
        {pending > 0 && (
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 90,
              width: pending,
              height: 32,
              borderRadius: 8,
              background: "repeating-linear-gradient(135deg, rgba(22,9,11,0.12) 0 10px, rgba(22,9,11,0.04) 10px 20px)",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: x,
            width: 60,
            height: 60,
            borderRadius: 30,
            background: highlight ? theme.paper : theme.accent,
            color: highlight ? theme.accent : theme.paper,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            fontWeight: 800,
            boxShadow: "0 10px 24px -8px rgba(90,0,15,0.5)",
          }}
        >
          {arrived && highlight ? "✓" : "kr"}
        </div>
      </div>
    </GlassCard>
  );
};

export const Pending: React.FC<SceneProps> = ({ d }) => {
  const frame = useSceneFrame();
  // Slow lane: reaches the pending zone, waits, then crawls on.
  const slow = interpolate(frame, [24, 44, 140], [0, 0.13, 0.62], { ...clamp });
  const fast = interpolate(frame, [24, 50], [0, 1], { ...clamp, easing: ease.inOut });
  return (
    <Stage>
      <Column gap={34}>
        <Eyebrow start={0}>Pending-period</Eyebrow>
        <MaskLine start={2} size={70} weight={750} uppercase={false}>
          {d.pending.title}
        </MaskLine>
        <div style={{ height: 16 }} />
        <Track {...d.pending.swedish} pending={520} travel={slow} start={10} />
        <Track {...d.pending.foreign} pending={0} travel={fast} highlight start={16} />
      </Column>
      <Sfx name="whoosh" at={24} volume={0.35} />
      <Sfx name="ding" at={50} volume={0.35} />
      <Sfx name="ticks" at={60} volume={0.2} />
    </Stage>
  );
};

// 3 ─ Leaderboard of payment methods; bar length is time on a log scale.
export const Methods: React.FC<SceneProps> = ({ d }) => {
  const max = Math.log10(Math.max(...d.methods.map((m) => m.minutes)));
  return (
    <Stage>
      <Column gap={30}>
        <MaskLine start={0} size={84} weight={750} uppercase={false}>
          Uttagstid per <span style={{ color: theme.accent }}>metod</span>
        </MaskLine>
        <div style={{ height: 16 }} />
        {d.methods.map((m, i) => {
          const s = 16 + i * 12;
          const p = useProgress(s, s + 30);
          const fast = i < 2;
          const width = (Math.log10(m.minutes) / max) * 100;
          return (
            <GlassCard key={m.label} start={s - 6} style={{ width: "100%", padding: "30px 40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontSize: 44, fontWeight: 700 }}>
                  <span style={{ color: theme.mute, fontWeight: 600, marginRight: 18 }}>{i + 1}</span>
                  {m.label}
                </div>
                <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-0.02em", color: fast ? theme.accent : theme.ink }}>{m.time}</div>
              </div>
              <div style={{ marginTop: 18, height: 16, borderRadius: 8, background: "rgba(22,9,11,0.07)" }}>
                <div style={{ height: "100%", width: `${width * p}%`, borderRadius: 8, background: fast ? theme.accent : theme.mute }} />
              </div>
            </GlassCard>
          );
        })}
        <div style={{ fontSize: 28, color: theme.mute, marginTop: 10, ...entrance(useProgress(70, 84), { rise: 16 }) }}>{d.methodsNote}</div>
      </Column>
      {d.methods.map((m, i) => (
        <Sfx key={m.label} name="pop" at={10 + i * 12} volume={0.3} />
      ))}
    </Stage>
  );
};

// 4 ─ Documents slide in and get stamped "Verifierat".
export const Kyc: React.FC<SceneProps> = ({ d }) => {
  const frame = useSceneFrame();
  const stamp = interpolate(frame, [70, 78], [0, 1], { ...clamp, easing: ease.in });
  const shake = frame >= 78 && frame < 84 ? (frame % 2 ? 6 : -6) : 0;
  return (
    <Stage tone="red">
      <Column gap={40}>
        <MaskLine start={0} size={74} weight={750} uppercase={false} color={theme.paper}>
          Första uttaget?
        </MaskLine>
        <MaskLine start={6} size={74} weight={750} uppercase={false} color={theme.paper}>
          Verifiera direkt.
        </MaskLine>
        <div style={{ position: "relative", width: "100%", height: 640, marginTop: 30, translate: `${shake}px 0` }}>
          {d.kyc.docs.map((doc, i) => {
            const p = useProgress(18 + i * 14, 40 + i * 14);
            return (
              <div
                key={doc}
                style={{
                  position: "absolute",
                  left: 40 + i * 180,
                  top: i * 250,
                  width: 640,
                  height: 340,
                  borderRadius: 36,
                  background: theme.paper,
                  color: theme.ink,
                  padding: 44,
                  boxShadow: "0 40px 80px -30px rgba(60,0,10,0.5)",
                  rotate: `${i ? 4 : -5}deg`,
                  ...entrance(p, { rise: 200, from: 0.9 }),
                }}
              >
                <div style={{ fontSize: 40, fontWeight: 750, marginBottom: 30 }}>{doc}</div>
                <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
                  <div style={{ width: 120, height: 150, borderRadius: 18, background: "rgba(22,9,11,0.08)" }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                    {[0.9, 0.7, 0.8].map((w, j) => (
                      <div key={j} style={{ height: 18, width: `${w * 100}%`, borderRadius: 9, background: "rgba(22,9,11,0.1)" }} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          {stamp > 0 && (
            <div style={{ position: "absolute", left: 0, right: 0, top: 400, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <RingBurst start={78} size={640} color={theme.paper} />
              <div
                style={{
                  padding: "22px 46px",
                  border: `8px solid ${theme.accent}`,
                  borderRadius: 24,
                  color: theme.accent,
                  background: "rgba(255,255,255,0.92)",
                  fontSize: 76,
                  fontWeight: 900,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  rotate: "-8deg",
                  opacity: stamp,
                  scale: stamp >= 1 ? "1" : String(2.4 - 1.4 * stamp),
                }}
              >
                {d.kyc.stamp}
              </div>
            </div>
          )}
        </div>
      </Column>
      <Sfx name="whoosh" at={18} volume={0.3} />
      <Sfx name="whoosh" at={32} volume={0.3} />
      <Sfx name="pop" at={78} volume={0.8} />
      <Sfx name="ding" at={80} volume={0.3} />
    </Stage>
  );
};

// 5 ─ Limits as two big stat tiles.
export const Limits: React.FC<SceneProps> = ({ d }) => (
  <Stage>
    <Column gap={36}>
      <MaskLine start={0} size={84} weight={750} uppercase={false}>
        Kolla <span style={{ color: theme.accent }}>uttagsgränserna</span>
      </MaskLine>
      <div style={{ height: 20 }} />
      {d.limits.map((l, i) => (
        <GlassCard key={l.label} start={14 + i * 16} style={{ width: "100%", padding: "48px 50px" }}>
          <div style={{ fontSize: 34, fontWeight: 600, color: theme.mute }}>{l.label}</div>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: "-0.04em", marginTop: 8 }}>{l.value}</div>
        </GlassCard>
      ))}
    </Column>
    <Sfx name="pop" at={14} volume={0.35} />
    <Sfx name="pop" at={30} volume={0.35} />
  </Stage>
);

// 6 ─ Three numbered tips, each ticked.
export const Tips: React.FC<SceneProps> = ({ d }) => (
  <Stage tone="red">
    <Column gap={30}>
      <MaskLine start={0} size={110} color={theme.paper}>
        3 tips
      </MaskLine>
      <div style={{ height: 20 }} />
      {d.tips.map((t, i) => {
        const at = 18 + i * 22;
        return (
          <GlassCard key={t} start={at - 8} style={{ width: "100%", padding: "34px 40px", background: theme.paper, color: theme.ink, display: "flex", alignItems: "center", gap: 30 }}>
            <div style={{ fontSize: 64, fontWeight: 800, color: theme.accentSoft, width: 90 }}>{`0${i + 1}`}</div>
            <div style={{ flex: 1, fontSize: 48, fontWeight: 750, letterSpacing: "-0.02em" }}>{t}</div>
            <DrawCheck start={at + 6} size={72} />
          </GlassCard>
        );
      })}
    </Column>
    {d.tips.map((_, i) => (
      <React.Fragment key={i}>
        <Sfx name="pop" at={10 + i * 22} volume={0.3} />
        <Sfx name="click" at={24 + i * 22} volume={0.55} />
      </React.Fragment>
    ))}
  </Stage>
);
