// Content for "Nya Pay N Play casino utan svensk licens", from
// https://mga-casino-utan-svensk-licens.se/betalningsmetoder/pay-n-play/ and the
// licence/tax sections of the home page. A sibling of the "Nya Pay N Play casino"
// video with a different angle (licence comparison and red flags), so the two
// are not duplicate content. Deliberately left out: Spelpaus as a selling point,
// ways around bank blocks, and named casino brands.
export const payNPlayUtanLicensData = {
  site: "mga-casino-utan-svensk-licens.se",
  marquee: "Nya Pay N Play casino",
  hook: ["Utan svensk", "licens"],
  hookSub: "Det här behöver du veta",
  steps: [
    { n: "1", label: "Välj belopp", note: "Insättningen startar allt" },
    { n: "2", label: "Bekräfta med BankID", note: "Identifiering och betalning i ett" },
    { n: "3", label: "Börja spela", note: "Kontot skapas automatiskt" },
  ],
  compare: {
    left: "Svensk licens",
    right: "Utländsk licens",
    rows: [
      { label: "Tillsyn", left: "Spelinspektionen", right: "T.ex. MGA" },
      { label: "Vinstskatt", left: "Skattefritt", right: "Skattefritt bara inom EU/EES" },
      { label: "Spelpaus", left: "Kopplat", right: "Inte kopplat – du ansvarar själv" },
    ],
  },
  news: [
    { icon: "bolt", label: "Snabb registrering" },
    { icon: "phone", label: "Byggda för mobilen" },
    { icon: "timer", label: "Snabbare uttag" },
  ],
  flags: ["Ingen licens som går att kontrollera", "Otydliga bonusvillkor", "Inga verktyg för ansvarsfullt spelande"],
  respect: ["Har du Spelpaus?", "Respektera din avstängning."],
  // Narration per scene. Numbers are written out so every TTS voice reads them the same way.
  voice: {
    hook: "Nya Pay N Play casino utan svensk licens. Här är det du behöver veta.",
    steps: "Det funkar i tre steg. Välj belopp, bekräfta med BankID, och börja spela. Kontot skapas automatiskt.",
    compare:
      "Skillnaden mot svensk licens? Tillsynen sköts av till exempel MGA. Vinster är skattefria bara om licensen är från EU eller EES. Och sajterna är inte kopplade till Spelpaus.",
    news: "Nya sajter bygger ofta på moderna plattformar, med snabb registrering, och snabbare uttag.",
    flags:
      "Men se upp för röda flaggor. Ingen licens som går att kontrollera, otydliga bonusvillkor, eller inga verktyg för ansvarsfullt spelande.",
    respect: "Har du stängt av dig via Spelpaus? Respektera din avstängning.",
    end: "Spela ansvarsfullt. Behöver du stöd, kontakta Stödlinjen.",
  },
};

export type PayNPlayUtanLicensData = typeof payNPlayUtanLicensData;
