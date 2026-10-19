import { EndCard } from "../../lib/EndCard";
import { makeExplainer, SceneDef } from "../../lib/Explainer";
import { PayNPlayUtanLicensData } from "./data";
import { Compare, Flags, Hook, News, Respect, Steps } from "./scenes";

const scenes: SceneDef<PayNPlayUtanLicensData>[] = [
  { id: "hook", frames: 100, C: Hook },
  { id: "steps", frames: 180, C: Steps },
  { id: "compare", frames: 170, C: Compare },
  { id: "news", frames: 120, C: News },
  { id: "flags", frames: 150, C: Flags },
  { id: "respect", frames: 90, C: Respect },
  { id: "end", frames: 120, C: ({ d }) => <EndCard site={d.site} /> },
];

export const {
  Component: PayNPlayUtanLicensExplainer,
  calculateMetadata: calculatePayNPlayUtanLicensMetadata,
} = makeExplainer("nya-pay-n-play-utan-svensk-licens", scenes);
