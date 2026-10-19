import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { SceneProps as BaseSceneProps } from "../../lib/Explainer";
import { DrawCheck, MaskLine, Phone, RingBurst } from "../../lib/kinetic";
import { CountUp, Eyebrow, GlassCard, Stage } from "../../lib/primitives";
import { useSceneFrame } from "../../lib/sceneTime";
import { Sfx } from "../../lib/Sfx";
import { clamp, ease, entrance, theme } from "../../lib/theme";
import { PayNPlayData } from "./data";

type SceneProps = BaseSceneProps<PayNPlayData>;

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

// 1 ─ Stacked uppercase headline on brand red, revealed line by line from a mask.
export const Hook: React.FC<SceneProps> = ({ d, exit }) => {
  const sub = useProgress(34, 50);
  const ring = interpolate(useSceneFrame(), [0, 90], [0.85, 1.05], clamp);
  return (
    <Stage tone="red">
      <Column gap={0}>
        <div
          style={{
            position: "absolute",
            width: 900,
            height: 900,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.18)",
            scale: ring.toFixed(3),
          }}
        />
        <MaskLine start={4} size={150} color={theme.paper} exitAt={exit}>
          {d.hook[0]}
        </MaskLine>
        <MaskLine start={10} size={170} color={theme.paper} exitAt={exit + 2}>
          {d.hook[1]}
        </MaskLine>
        <MaskLine start={16} size={150} color={theme.paper} exitAt={exit + 4}>
          {d.hook[2]}
        </MaskLine>
        <div
          style={{
            marginTop: 48,
            padding: "18px 36px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.14)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            color: theme.paper,
            fontSize: 40,
            fontWeight: 600,
            ...entrance(sub * (1 - useProgress(exit, exit + 10, ease.in)), { rise: 24, blur: 8 }),
          }}
        >
          {d.hookSub}
        </div>
      </Column>
      <Sfx name="whoosh" at={4} volume={0.5} />
    </Stage>
  );
};

// 2 ─ Two steps slide in from the sides and fuse into one.
export const Merge: React.FC<SceneProps> = ({ d }) => {
  const frame = useSceneFrame();
  const slide = interpolate(frame, [12, 42], [0, 1], { ...clamp, easing: ease.inOut });
  const merged = frame >= 44;
  const pop = useProgress(44, 58);
  const pill = (label: string, side: -1 | 1) => (
    <div
      style={{
        position: "absolute",
        padding: "30px 44px",
        borderRadius: 999,
        background: theme.paper,
        border: `2px solid ${theme.accentSoft}`,
        boxShadow: "0 24px 50px -24px rgba(120,10,25,0.35)",
        fontSize: 44,
        fontWeight: 650,
        whiteSpace: "nowrap",
        translate: `${Math.round(side * (1 - slide) * 560 + side * 170)}px 0`,
        opacity: interpolate(frame, [6, 16], [0, 1], clamp),
      }}
    >
      {label}
    </div>
  );
  return (
    <Stage>
      <Column gap={120}>
        <MaskLine start={0} size={96} weight={750} uppercase={false}>
          Pay N Play <span style={{ color: theme.accent }}>=</span>
        </MaskLine>
        <div style={{ position: "relative", width: "100%", height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {!merged && pill(d.merge.left, -1)}
          {!merged && pill(d.merge.right, 1)}
          <RingBurst start={44} size={700} />
          {merged && (
            <div
              style={{
                padding: "36px 56px",
                borderRadius: 999,
                background: theme.accent,
                color: theme.paper,
                fontSize: 54,
                fontWeight: 750,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                boxShadow: "0 30px 60px -24px rgba(150,0,20,0.6)",
                ...entrance(pop, { from: 0.7 }),
              }}
            >
              {d.merge.result}
            </div>
          )}
        </div>
      </Column>
      <Sfx name="whoosh" at={12} volume={0.35} />
      <Sfx name="pop" at={44} volume={0.6} />
      <Sfx name="ding" at={46} volume={0.3} />
    </Stage>
  );
};

// 3 ─ The real flow on a phone: amount → BankID → account → play.
const SCREEN = [0, 60, 120, 175]; // base frames where each phone screen starts

const Screen: React.FC<{ index: number; children: React.ReactNode }> = ({ index, children }) => {
  const frame = useSceneFrame();
  const start = SCREEN[index];
  const end = SCREEN[index + 1];
  const inP = index === 0 ? 1 : interpolate(frame, [start - 8, start + 6], [0, 1], { ...clamp, easing: ease.inOut });
  const outP = end === undefined ? 0 : interpolate(frame, [end - 8, end + 6], [0, 1], { ...clamp, easing: ease.inOut });
  if (inP <= 0 || outP >= 1) return null;
  return (
    <AbsoluteFill
      style={{
        padding: "120px 44px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        translate: `${Math.round((1 - inP) * 100 - outP * 100)}% 0`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

export const PhoneFlow: React.FC<SceneProps> = ({ d }) => {
  const frame = useSceneFrame();
  const typed = d.amount.slice(0, Math.max(0, Math.min(d.amount.length, Math.floor((frame - 10) / 8) + 1)));
  const pressed = interpolate(frame, [44, 48, 54], [1, 0.94, 1], clamp);
  const scan = interpolate(frame, [70, 104], [0, 1], { ...clamp, easing: ease.inOut });
  const verified = useProgress(104, 116);
  const created = useProgress(128, 142);
  const step = frame < SCREEN[1] - 4 ? 0 : frame < SCREEN[2] - 4 ? 1 : frame < SCREEN[3] - 4 ? 2 : 3;
  const phoneIn = useProgress(0, 20);

  return (
    <Stage>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 300 }}>
        {/* Step label above the phone; remounting per step replays the mask reveal. */}
        <div style={{ height: 150, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Eyebrow start={SCREEN[step]}>{`Steg ${step + 1} av 4`}</Eyebrow>
          <MaskLine key={step} start={step === 0 ? 4 : SCREEN[step] - 2} size={66} weight={750} uppercase={false}>
            {d.steps[step]}
          </MaskLine>
        </div>
        <Phone width={540} style={{ marginTop: 30, ...entrance(phoneIn, { rise: 160, from: 0.94 }) }}>
          <Screen index={0}>
            <div style={{ fontSize: 30, color: theme.mute, fontWeight: 500 }}>Insättning</div>
            <div style={{ fontSize: 110, fontWeight: 750, letterSpacing: "-0.04em", marginTop: 20 }}>
              {typed || "0"}
              <span style={{ color: theme.mute, fontSize: 60 }}> kr</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, width: "100%", marginTop: 40 }}>
              {KEYS.map((k, i) => (
                <div
                  key={i}
                  style={{
                    height: 84,
                    borderRadius: 22,
                    background: k ? "rgba(22,9,11,0.05)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 38,
                    fontWeight: 600,
                  }}
                >
                  {k}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 34,
                width: "100%",
                padding: "30px 0",
                borderRadius: 26,
                background: theme.accent,
                color: theme.paper,
                fontSize: 38,
                fontWeight: 700,
                textAlign: "center",
                scale: pressed.toFixed(3),
              }}
            >
              Spela nu
            </div>
          </Screen>

          <Screen index={1}>
            <div style={{ fontSize: 30, color: theme.mute, fontWeight: 500 }}>Bekräfta {d.amount} kr</div>
            <div style={{ position: "relative", width: 300, height: 300, marginTop: 120 }}>
              <svg width="300" height="300" viewBox="0 0 100 100" style={{ position: "absolute", inset: 0 }}>
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(22,9,11,0.08)" strokeWidth="5" />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke={theme.accent}
                  strokeWidth="5"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - scan}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {verified > 0 ? (
                  <DrawCheck start={104} size={150} />
                ) : (
                  // Simple fingerprint glyph (generic, not a BankID logo)
                  <svg width="130" height="130" viewBox="0 0 24 24" fill="none" stroke={theme.ink} strokeWidth="1.4" strokeLinecap="round">
                    <path d="M12 11c0 3.5-1 6.5-3 9" />
                    <path d="M15.5 12.5c0 3-.6 5.5-1.8 7.8" />
                    <path d="M8.5 10.5a3.5 3.5 0 0 1 7 0" />
                    <path d="M6 13c0-1 .1-2 .5-3a6 6 0 0 1 11 .5c.4 1.4.5 3 .4 4.5" />
                    <path d="M4.5 9a8.5 8.5 0 0 1 15 0" />
                  </svg>
                )}
              </div>
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, marginTop: 70 }}>{verified > 0.5 ? "Godkänt" : "Öppna BankID…"}</div>
          </Screen>

          <Screen index={2}>
            <div style={{ marginTop: 160 }}>
              <DrawCheck start={128} size={190} />
            </div>
            <div style={{ fontSize: 50, fontWeight: 750, marginTop: 50, ...entrance(created, { rise: 20 }) }}>Konto skapat</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 40, fontSize: 32, color: theme.mute, ...entrance(useProgress(136, 150), { rise: 20 }) }}>
              <div>✕ Inget formulär</div>
              <div>✕ Inget lösenord</div>
            </div>
          </Screen>

          <Screen index={3}>
            <div style={{ alignSelf: "stretch", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 30, color: theme.mute, fontWeight: 500 }}>Saldo</div>
              <div style={{ fontSize: 44, fontWeight: 750 }}>
                <CountUp to={Number(d.amount)} start={178} duration={20} suffix=" kr" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, width: "100%", marginTop: 40 }}>
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const p = useProgress(180 + i * 4, 196 + i * 4);
                return (
                  <div
                    key={i}
                    style={{
                      height: 220,
                      borderRadius: 28,
                      background: `linear-gradient(${135 + i * 30}deg, ${i % 2 ? theme.accent : theme.accentDeep}, ${i % 3 ? "#FF6B7A" : "#3A0710"})`,
                      ...entrance(p, { rise: 40, from: 0.9 }),
                    }}
                  />
                );
              })}
            </div>
          </Screen>
        </Phone>
      </AbsoluteFill>
      <Sfx name="pop" at={2} volume={0.35} />
      <Sfx name="click" at={10} volume={0.5} />
      <Sfx name="click" at={18} volume={0.5} />
      <Sfx name="click" at={26} volume={0.5} />
      <Sfx name="click" at={45} volume={0.7} />
      <Sfx name="whoosh" at={54} volume={0.25} />
      <Sfx name="ticks" at={72} volume={0.25} />
      <Sfx name="ding" at={104} volume={0.4} />
      <Sfx name="whoosh" at={114} volume={0.25} />
      <Sfx name="pop" at={128} volume={0.5} />
      <Sfx name="whoosh" at={169} volume={0.25} />
      <Sfx name="shimmer" at={180} volume={0.3} />
    </Stage>
  );
};

// 4 ─ Two lanes racing: the classic sign-up crawls, Pay N Play finishes at once.
export const Race: React.FC<SceneProps> = ({ d }) => {
  const frame = useSceneFrame();
  const classic = interpolate(frame, [20, 150], [0, 1], clamp);
  const fast = interpolate(frame, [20, 40], [0, 1], { ...clamp, easing: ease.inOut });
  const lane = (opts: { label: string; p: number; done: boolean; time: string; highlight?: boolean; start: number; children?: React.ReactNode }) => (
    <GlassCard
      start={opts.start}
      style={{
        width: "100%",
        padding: "40px 46px",
        background: opts.highlight ? theme.accent : theme.card,
        color: opts.highlight ? theme.paper : theme.ink,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 44, fontWeight: 700 }}>{opts.label}</div>
        <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-0.03em", opacity: opts.done ? 1 : 0.35 }}>{opts.done ? opts.time : "…"}</div>
      </div>
      {opts.children}
      <div style={{ marginTop: 28, height: 20, borderRadius: 10, background: opts.highlight ? "rgba(255,255,255,0.25)" : "rgba(22,9,11,0.07)" }}>
        <div style={{ height: "100%", width: `${opts.p * 100}%`, borderRadius: 10, background: opts.highlight ? theme.paper : theme.mute }} />
      </div>
    </GlassCard>
  );
  return (
    <Stage>
      <Column gap={36}>
        <MaskLine start={0} size={90} weight={750} uppercase={false}>
          Tid till första spel
        </MaskLine>
        <div style={{ height: 20 }} />
        {lane({
          label: d.race.classic.label,
          p: classic,
          done: classic >= 1,
          time: d.race.classic.time,
          start: 8,
          children: (
            <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
              {d.race.classic.steps.map((s, i) => (
                <div
                  key={s}
                  style={{
                    padding: "12px 24px",
                    borderRadius: 999,
                    background: "rgba(22,9,11,0.06)",
                    fontSize: 30,
                    fontWeight: 600,
                    ...entrance(useProgress(30 + i * 30, 44 + i * 30), { rise: 16 }),
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          ),
        })}
        {lane({ label: d.race.payNPlay.label, p: fast, done: fast >= 1, time: d.race.payNPlay.time, highlight: true, start: 14 })}
        <div style={{ fontSize: 40, fontWeight: 600, color: theme.mute, marginTop: 20, ...entrance(useProgress(110, 126), { rise: 24 }) }}>
          {d.race.note}
        </div>
      </Column>
      <Sfx name="whoosh" at={20} volume={0.4} />
      <Sfx name="ding" at={40} volume={0.35} />
      {[30, 60, 90].map((at) => (
        <Sfx key={at} name="pop" at={at} volume={0.3} />
      ))}
      <Sfx name="ticks" at={100} volume={0.2} />
    </Stage>
  );
};

// 5 ─ Checklist on red: three cards, each ticked with a drawn check mark.
export const Checklist: React.FC<SceneProps> = ({ d }) => (
  <Stage tone="red">
    <Column gap={30} style={{ paddingTop: 260 }}>
      <MaskLine start={0} size={64} weight={750} uppercase={false} color={theme.paper}>
        Innan du väljer
      </MaskLine>
      <div style={{ marginTop: -20 }}>
        <MaskLine start={4} size={64} weight={750} uppercase={false} color={theme.paper}>
          ett nytt Pay N Play casino
        </MaskLine>
      </div>
      <div style={{ height: 24 }} />
      {d.checklist.items.map((item, i) => {
        const at = 30 + i * 26;
        return (
          <GlassCard
            key={item.label}
            start={at - 10}
            style={{ width: "100%", padding: "36px 40px", background: theme.paper, color: theme.ink, display: "flex", alignItems: "center", gap: 34 }}
          >
            <DrawCheck start={at} size={84} />
            <div>
              <div style={{ fontSize: 52, fontWeight: 750, letterSpacing: "-0.02em" }}>{item.label}</div>
              <div style={{ fontSize: 30, color: theme.mute, marginTop: 6 }}>{item.note}</div>
            </div>
          </GlassCard>
        );
      })}
    </Column>
    {d.checklist.items.map((_, i) => (
      <React.Fragment key={i}>
        <Sfx name="pop" at={20 + i * 26} volume={0.3} />
        <Sfx name="click" at={32 + i * 26} volume={0.55} />
      </React.Fragment>
    ))}
  </Stage>
);

// 6 ─ Calm responsible-gambling beat.
export const Respect: React.FC<SceneProps> = ({ d, exit }) => (
  <Stage>
    <Column gap={10}>
      <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="1.6" strokeLinejoin="round" style={{ marginBottom: 40, ...entrance(useProgress(0, 16), { from: 0.6 }) }}>
        <path d="M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" />
      </svg>
      <MaskLine start={6} size={84} weight={750} uppercase={false} exitAt={exit}>
        {d.respect[0]}
      </MaskLine>
      <MaskLine start={18} size={66} weight={750} uppercase={false} color={theme.accent} exitAt={exit + 2}>
        {d.respect[1]}
      </MaskLine>
    </Column>
  </Stage>
);
