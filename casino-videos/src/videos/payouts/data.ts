// Content for "Snabba uttag – casino utan svensk licens", taken from
// https://mga-casino-utan-svensk-licens.se/betalningsmetoder/
// Deliberately left out: "avoid Swedish banks" and other ways around bank
// blocks, "no Spelpaus" as a selling point, and named casino brands.
export const payoutsData = {
  site: "mga-casino-utan-svensk-licens.se",
  hook: ["Snabba", "uttag"],
  hookSub: "Casino utan svensk licens – så funkar det",
  pending: {
    title: "Varför tar uttag olika lång tid?",
    swedish: { label: "Svensk licens", wait: "24–72 h", note: "Pending-period" },
    foreign: { label: "Utländskt casino", wait: "Direkt", note: "Ingen pending-period" },
  },
  methods: [
    { label: "Krypto", time: "10–30 min", minutes: 30 },
    { label: "E-plånbok", time: "30–60 min", minutes: 60 },
    { label: "Kort", time: "1–5 dagar", minutes: 5 * 24 * 60 },
    { label: "Banköverföring", time: "2–5 dagar", minutes: 5 * 24 * 60 * 1.15 },
  ],
  methodsNote: "Typiska tider – varierar mellan casinon",
  kyc: { docs: ["ID-kort eller pass", "Adressbevis"], stamp: "Verifierat" },
  limits: [
    { label: "Minsta uttag", value: "100–500 kr" },
    { label: "Dagsgräns", value: "10 000–100 000 kr" },
  ],
  tips: ["Verifiera tidigt", "Välj en snabb metod", "Kolla licens och gränser"],
  // Narration per scene. Numbers are written out so every TTS voice reads them the same way.
  voice: {
    hook: "Snabba uttag på casino utan svensk licens. Så funkar det.",
    pending:
      "Casinon med svensk licens har ofta en väntetid på tjugofyra till sjuttiotvå timmar. Utländska casinon behandlar ofta uttaget direkt.",
    methods:
      "Metoden avgör hastigheten. Krypto och e-plånböcker tar minuter, medan kort och banköverföring kan ta flera dagar.",
    kyc: "Det som oftast bromsar är första uttaget. Verifiera kontot direkt, med ID och adressbevis.",
    limits: "Kolla också uttagsgränserna, både minsta uttag och dagsgräns.",
    tips: "Så: verifiera tidigt, välj en snabb metod, och kolla licens och gränser innan du spelar.",
    end: "Spela ansvarsfullt. Behöver du stöd, kontakta Stödlinjen.",
  },
};

export type PayoutsData = typeof payoutsData;
