import { EndCard } from "../../lib/EndCard";
import { makeExplainer, SceneDef } from "../../lib/Explainer";
import { WageringData } from "./data";
import { Contribution, Definition, Example, Hook, Tiers, Tip } from "./scenes";

const scenes: SceneDef<WageringData>[] = [
  { id: "hook", frames: 90, C: Hook },
  { id: "definition", frames: 120, C: Definition },
  { id: "example", frames: 180, C: Example },
  { id: "tiers", frames: 150, C: Tiers },
  { id: "contribution", frames: 150, C: Contribution },
  { id: "tip", frames: 180, C: Tip },
  { id: "end", frames: 120, C: ({ d }) => <EndCard site={d.site} /> },
];

export const { Component: WageringExplainer, calculateMetadata: calculateWageringMetadata } = makeExplainer(
  "omsattningskrav",
  scenes,
);
