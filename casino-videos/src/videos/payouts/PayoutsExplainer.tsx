import { EndCard } from "../../lib/EndCard";
import { makeExplainer, SceneDef } from "../../lib/Explainer";
import { PayoutsData } from "./data";
import { Hook, Kyc, Limits, Methods, Pending, Tips } from "./scenes";

const scenes: SceneDef<PayoutsData>[] = [
  { id: "hook", frames: 90, C: Hook },
  { id: "pending", frames: 160, C: Pending },
  { id: "methods", frames: 150, C: Methods },
  { id: "kyc", frames: 130, C: Kyc },
  { id: "limits", frames: 110, C: Limits },
  { id: "tips", frames: 130, C: Tips },
  { id: "end", frames: 120, C: ({ d }) => <EndCard site={d.site} /> },
];

export const { Component: PayoutsExplainer, calculateMetadata: calculatePayoutsMetadata } = makeExplainer(
  "snabba-uttag",
  scenes,
);
