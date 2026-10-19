import React from "react";
import { Composition } from "remotion";
import { payNPlayData } from "./videos/paynplay/data";
import { payNPlayUtanLicensData } from "./videos/paynplay-utan-licens/data";
import {
  calculatePayNPlayUtanLicensMetadata,
  PayNPlayUtanLicensExplainer,
} from "./videos/paynplay-utan-licens/PayNPlayUtanLicensExplainer";
import { payoutsData } from "./videos/payouts/data";
import { calculatePayoutsMetadata, PayoutsExplainer } from "./videos/payouts/PayoutsExplainer";
import { calculatePayNPlayMetadata, PayNPlayExplainer } from "./videos/paynplay/PayNPlayExplainer";
import { wageringData } from "./videos/wagering/data";
import { calculateWageringMetadata, WageringExplainer } from "./videos/wagering/WageringExplainer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Omsattningskrav-9x16"
        component={WageringExplainer}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ ...wageringData, withVoice: true }}
        calculateMetadata={calculateWageringMetadata}
      />
      <Composition
        id="NyaPayNPlay-9x16"
        component={PayNPlayExplainer}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ ...payNPlayData, withVoice: true }}
        calculateMetadata={calculatePayNPlayMetadata}
      />
      <Composition
        id="SnabbaUttag-9x16"
        component={PayoutsExplainer}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ ...payoutsData, withVoice: true }}
        calculateMetadata={calculatePayoutsMetadata}
      />
      <Composition
        id="NyaPayNPlayUtanLicens-9x16"
        component={PayNPlayUtanLicensExplainer}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ ...payNPlayUtanLicensData, withVoice: true }}
        calculateMetadata={calculatePayNPlayUtanLicensMetadata}
      />
    </>
  );
};
