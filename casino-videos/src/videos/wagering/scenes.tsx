import React from "react";
import { useSceneFrame } from "../../lib/sceneTime";
import { Sfx } from "../../lib/Sfx";
import { AbsoluteFill, interpolate } from "remotion";
import {
  BlurWords,
  CountUp,
  Eyebrow,
  GlassCard,
  Stage,
} from "../../lib/primitives";
import { clamp, ease, entrance, theme } from "../../lib/theme";
import { WageringData } from "./data";

const Center: React.FC<{ children: React.ReactNode; gap?: number }> = ({
  children,
  gap = 48,
}) => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: 90,
      gap,
    }}
  >
    {children}
  </AbsoluteFill>
);

export type SceneProps = { d: WageringData; exit: number };

export const Hook: React.FC<SceneProps> = ({ d, exit }) => (
  <Stage tone="red">
    <Center gap={40}>
      <Eyebrow start={4} color={theme.paper}>
        Bonusguide
      </Eyebrow>
      <BlurWords
        text={d.hook}
        size={130}
        start={10}
        stagger={6}
        accent={theme.paper}
        exitAt={exit}
      />
    </Center>
    <Sfx name="whoosh" at={8} volume={0.5} />
  </Stage>
);

export const Definition: React.FC<SceneProps> = ({ d, exit }) => (
  <Stage>
    <Center>
      <BlurWords
        text={d.definition}
        size={84}
        weight={500}
        start={6}
        stagger={3}
        exitAt={exit}
      />
    </Center>
  </Stage>
);

const Tile: React.FC<{
  start: number;
  label: string;
  children: React.ReactNode;
  highlight?: boolean;
}> = ({ start, label, children, highlight }) => (
  <GlassCard
    start={start}
    style={{
      width: "100%",
      padding: "44px 56px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: highlight ? theme.accent : theme.card,
      color: highlight ? theme.paper : theme.ink,
    }}
  >
    <div style={{ fontSize: 36, fontWeight: 500, opacity: 0.7 }}>{label}</div>
    <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: "-0.04em" }}>
      {children}
    </div>
  </GlassCard>
);

const Operator: React.FC<{ start: number; children: React.ReactNode }> = ({
  start,
  children,
}) => {
  const frame = useSceneFrame();
  const p = interpolate(frame, [start, start + 10], [0, 1], {
    ...clamp,
    easing: ease.out,
  });
  return (
    <div
      style={{
        fontSize: 72,
        fontWeight: 600,
        color: theme.accent,
        ...entrance(p, { from: 0.6 }),
      }}
    >
      {children}
    </div>
  );
};

export const Example: React.FC<SceneProps> = ({ d }) => {
  const { bonus, multiplier } = d.example;
  return (
    <Stage>
      <Center gap={28}>
        <Eyebrow start={0}>Exempel</Eyebrow>
        <div style={{ height: 20 }} />
        <Tile start={8} label="Bonus">
          <CountUp to={bonus} start={8} duration={20} suffix=" kr" />
        </Tile>
        <Operator start={30}>×</Operator>
        <Tile start={36} label="Omsättningskrav">
          {multiplier}x
        </Tile>
        <Operator start={62}>=</Operator>
        <Tile start={68} label="Att spela för" highlight>
          <CountUp
            to={bonus * multiplier}
            start={72}
            duration={28}
            suffix=" kr"
          />
        </Tile>
        <div style={{ height: 30 }} />
        <BlurWords
          text="innan du kan *ta ut* något."
          size={60}
          weight={500}
          start={112}
          stagger={3}
        />
      </Center>
      <Sfx name="pop" at={8} />
      <Sfx name="pop" at={30} volume={0.3} />
      <Sfx name="pop" at={36} />
      <Sfx name="pop" at={62} volume={0.3} />
      <Sfx name="pop" at={68} />
      <Sfx name="ticks" at={72} volume={0.4} />
      <Sfx name="ding" at={98} volume={0.35} />
    </Stage>
  );
};

export const Tiers: React.FC<SceneProps> = ({ d }) => {
  const frame = useSceneFrame();
  return (
    <Stage>
      <Center gap={36}>
        <BlurWords
          text="Lägre krav = *bättre* villkor"
          size={80}
          start={0}
          stagger={4}
        />
        <div style={{ height: 30 }} />
        {d.tiers.map((t, i) => {
          const s = 20 + i * 10;
          const p = interpolate(frame, [s, s + 30], [0, 1], {
            ...clamp,
            easing: ease.out,
          });
          const color = [
            theme.accentSoft,
            theme.accentSoft,
            theme.accent,
            theme.accentDeep,
          ][i];
          return (
            <GlassCard
              key={t.label}
              start={s - 6}
              style={{ width: "100%", padding: "34px 44px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div
                  style={{
                    fontSize: 60,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {t.label}
                </div>
                <div
                  style={{ fontSize: 34, fontWeight: 500, color: theme.mute }}
                >
                  {t.note}
                </div>
              </div>
              <div
                style={{
                  marginTop: 22,
                  height: 18,
                  borderRadius: 9,
                  background: "rgba(11,11,18,0.07)",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.max(t.level * p * 100, 3)}%`,
                    borderRadius: 9,
                    background: color,
                  }}
                />
              </div>
            </GlassCard>
          );
        })}
      </Center>
      <Sfx name="pop" at={14} volume={0.3} />
      <Sfx name="pop" at={24} volume={0.3} />
      <Sfx name="pop" at={34} volume={0.3} />
      <Sfx name="pop" at={44} volume={0.3} />
    </Stage>
  );
};

export const Contribution: React.FC<SceneProps> = ({ d }) => {
  const frame = useSceneFrame();
  return (
    <Stage>
      <Center gap={40}>
        <Eyebrow start={0}>Alla spel räknas inte lika</Eyebrow>
        <BlurWords
          text="Hur mycket varje insats *räknas*"
          size={80}
          start={6}
          stagger={4}
        />
        <div style={{ height: 20 }} />
        {d.contribution.map((c, i) => {
          const s = 34 + i * 26;
          const target = c.max ?? c.pct;
          const p = interpolate(frame, [s, s + 34], [0, 1], {
            ...clamp,
            easing: ease.out,
          });
          return (
            <GlassCard
              key={c.label}
              start={s - 8}
              style={{ width: "100%", padding: "40px 48px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div style={{ fontSize: 44, fontWeight: 600 }}>{c.label}</div>
                <div
                  style={{
                    fontSize: 76,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: i === 0 ? theme.accent : theme.accentDeep,
                  }}
                >
                  {c.max ? `${c.pct}–` : ""}
                  <CountUp to={target} start={s} duration={34} suffix="%" />
                </div>
              </div>
              <div
                style={{
                  marginTop: 26,
                  height: 22,
                  borderRadius: 11,
                  background: "rgba(11,11,18,0.07)",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${target * p}%`,
                    borderRadius: 11,
                    background: i === 0 ? theme.accent : theme.accentSoft,
                  }}
                />
              </div>
            </GlassCard>
          );
        })}
      </Center>
      <Sfx name="pop" at={26} volume={0.35} />
      <Sfx name="pop" at={52} volume={0.35} />
      <Sfx name="ticks" at={34} volume={0.3} />
    </Stage>
  );
};

export const Tip: React.FC<SceneProps> = ({ d }) => {
  const frame = useSceneFrame();
  const typed = Math.floor(
    interpolate(frame, [24, 64], [0, d.search.length], clamp),
  );
  const caretOn = Math.floor(frame / 8) % 2 === 0;
  const cursor = interpolate(frame, [64, 84], [0, 1], {
    ...clamp,
    easing: ease.inOut,
  });
  const press = interpolate(frame, [86, 90, 96], [1, 0.9, 1], clamp);
  const found = interpolate(frame, [96, 112], [0, 1], {
    ...clamp,
    easing: ease.out,
  });
  return (
    <Stage>
      <Center gap={60}>
        <GlassCard
          start={6}
          style={{
            width: "100%",
            padding: "36px 44px",
            display: "flex",
            alignItems: "center",
            gap: 28,
            borderRadius: 999,
            scale: String(press),
          }}
        >
          <svg
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.mute}
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <div style={{ fontSize: 52, fontWeight: 500 }}>
            {d.search.slice(0, typed)}
            <span
              style={{
                color: theme.accent,
                opacity: caretOn && frame < 90 ? 1 : 0,
              }}
            >
              |
            </span>
          </div>
        </GlassCard>
        <div
          style={{
            position: "absolute",
            left: interpolate(cursor, [0, 1], [940, 860]),
            top: interpolate(cursor, [0, 1], [1250, 800]),
            opacity: cursor > 0 ? 1 : 0,
            scale: String(press),
          }}
        >
          <svg width="64" height="64" viewBox="0 0 24 24">
            <path
              d="M5 3l14 8-6 2-3 6z"
              fill={theme.ink}
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 500,
            color: theme.mute,
            ...entrance(found, { rise: 30 }),
          }}
        >
          Sök i villkoren efter <b style={{ color: theme.ink }}>”wagering”</b>
        </div>
        <BlurWords text={d.tip} size={72} start={110} stagger={3} />
      </Center>
      <Sfx name="pop" at={6} volume={0.35} />
      <Sfx name="typing" at={24} volume={0.6} />
      <Sfx name="click" at={86} volume={0.7} />
    </Stage>
  );
};
