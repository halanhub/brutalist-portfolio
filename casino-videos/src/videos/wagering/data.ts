// Content for the wagering explainer, taken from
// https://mga-casino-utan-svensk-licens.se/casino-utan-svensk-licens-bonus/utan-omsattningskrav/
export const wageringData = {
  site: "mga-casino-utan-svensk-licens.se",
  hook: "Vad är *omsättningskrav?*",
  definition: "Hur många gånger en bonus måste spelas igenom innan du kan göra ett uttag.",
  example: { bonus: 200, multiplier: 35 },
  tiers: [
    { label: "0x", note: "Kan tas ut direkt", level: 0.04 },
    { label: "1x–5x", note: "Lågt", level: 0.12 },
    { label: "12x–25x", note: "Medel", level: 0.55 },
    { label: "30x–45x", note: "Högt", level: 1 },
  ],
  contribution: [
    { label: "Slots", pct: 100 },
    { label: "Live casino & bordsspel", pct: 12, max: 30 },
  ],
  tip: "Läs alltid bonusvillkoren innan du sätter in pengar.",
  search: "omsättningskrav",
  // Narration per scene. Numbers are written out so every TTS voice reads them the same way.
  voice: {
    hook: "Vad är egentligen omsättningskrav?",
    definition: "Det är hur många gånger en bonus måste spelas igenom, innan du kan ta ut pengar.",
    example:
      "Säg att du får tvåhundra kronor i bonus, med trettiofem x i omsättning. Då måste du spela för sju tusen kronor innan uttag.",
    tiers: "Ju lägre krav, desto bättre. Noll x kan tas ut direkt. Trettio x eller mer är högt.",
    contribution:
      "Alla spel räknas inte lika. Slots räknas oftast fullt ut, live casino och bordsspel bara tolv till trettio procent.",
    tip: "Så läs alltid bonusvillkoren, och sök efter ordet wagering, innan du sätter in pengar.",
    end: "Spela ansvarsfullt. Behöver du stöd, kontakta Stödlinjen.",
  },
};

export type WageringData = typeof wageringData;
