// Content for "Nya Pay N Play casino", taken from
// https://mga-casino-utan-svensk-licens.se/betalningsmetoder/pay-n-play/
// Deliberately left out: "no Spelpaus check" as a selling point, ways around
// Swedish bank blocks, and named casino brands.
export const payNPlayData = {
  site: "mga-casino-utan-svensk-licens.se",
  hook: ["Nya", "Pay N Play", "casino"],
  hookSub: "Så funkar det – på under en minut",
  merge: { left: "Insättning", right: "Registrering", result: "Ett steg med BankID" },
  amount: "500",
  steps: ["Välj belopp", "Bekräfta med BankID", "Kontot skapas", "Spela direkt"],
  race: {
    classic: { label: "Vanligt casino", steps: ["Formulär", "E-post", "Dokument"], time: "10–20 min" },
    payNPlay: { label: "Pay N Play", time: "< 1 min" },
    note: "Inget lösenord. Ingen dokumentuppladdning.",
  },
  checklist: {
    title: "Innan du väljer ett nytt Pay N Play casino",
    items: [
      { label: "Licens", note: "T.ex. MGA – kontrollera att den är giltig" },
      { label: "Uttagstider", note: "Hur snabbt får du dina pengar?" },
      { label: "Bonusvillkor", note: "Omsättningskrav och maxuttag" },
    ],
  },
  respect: ["Har du Spelpaus?", "Respektera din avstängning."],
  // Narration per scene. Numbers are written out so every TTS voice reads them the same way.
  voice: {
    hook: "Nya Pay N Play casino. Så funkar det, på under en minut.",
    merge: "Pay N Play slår ihop insättning och registrering, till ett enda steg med BankID.",
    phone: "Du väljer belopp och bekräftar med BankID. Kontot skapas automatiskt, och du kan spela direkt.",
    race: "På ett vanligt casino tar det tio till tjugo minuter att komma igång. Med Pay N Play, under en minut. Utan lösenord.",
    checklist:
      "Men innan du väljer ett nytt Pay N Play casino: kolla licensen, uttagstiderna och bonusvillkoren.",
    respect: "Och har du stängt av dig via Spelpaus, respektera din avstängning.",
    end: "Spela ansvarsfullt. Behöver du stöd, kontakta Stödlinjen.",
  },
};

export type PayNPlayData = typeof payNPlayData;
