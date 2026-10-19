import { EndCard } from "../../lib/EndCard";
import { makeExplainer, SceneDef } from "../../lib/Explainer";
import { PayNPlayData } from "./data";
import { Checklist, Hook, Merge, PhoneFlow, Race, Respect } from "./scenes";

const scenes: SceneDef<PayNPlayData>[] = [
  { id: "hook", frames: 100, C: Hook },
  { id: "merge", frames: 120, C: Merge },
  { id: "phone", frames: 240, C: PhoneFlow },
  { id: "race", frames: 170, C: Race },
  { id: "checklist", frames: 150, C: Checklist },
  { id: "respect", frames: 100, C: Respect },
  { id: "end", frames: 120, C: ({ d }) => <EndCard site={d.site} /> },
];

export const { Component: PayNPlayExplainer, calculateMetadata: calculatePayNPlayMetadata } = makeExplainer(
  "nya-pay-n-play",
  scenes,
);
