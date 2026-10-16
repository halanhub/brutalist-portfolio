import { asset } from "@/lib/asset";

export const profile = {
  name: "Hampus Lang",
  role: "Frontend developer",
  email: "me@hampuslang.com",
  cv: asset("/assets/Hampus-lang-CV.pdf"),
  portrait: asset("/assets/profilewebp.webp"),
  location: "Tbilisi, Georgia",
  coords: "41.7151° N, 44.8271° E",
  timeZone: "Asia/Tbilisi",
  socials: [
    { label: "GitHub", href: "https://github.com/halanhub" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hampus-lang/" },
  ],
};

export const timeline = [
  { years: "2015 — 16", title: "Service technician", place: "Avent, Kalmar" },
  { years: "2016 — 17", title: "Support technician", place: "Webhelp Nordic, Kalmar" },
  { years: "2017 — 19", title: "Account manager", place: "Eniro, Växjö" },
  { years: "2019 — 21", title: "Customer success", place: "Visma SPCS, Växjö" },
  { years: "2021 — 25", title: "High-voltage electrician", place: "Kraftringen, Hässleholm" },
  { years: "2025 — now", title: "Full-stack developer", place: "Georgian Language Online, Tbilisi", current: true },
  { years: "2026 — now", title: "iGaming & SEO developer", place: "Freelance, remote", current: true },
];

// Grouped from the skills section of the CV.
export const toolkit = [
  { group: "Frontend", items: ["React", "TypeScript", "JavaScript", "Vite", "HTML & CSS", "Tailwind"] },
  { group: "WordPress", items: ["Custom themes", "Gutenberg", "ACF", "Custom post types", "Migrations"] },
  { group: "Data & APIs", items: ["Firebase", "REST APIs", "Affiliate tracking", "Async data", "Postman"] },
  { group: "SEO", items: ["Technical SEO", "Rank Math", "Search Console", "PageSpeed"] },
  { group: "Ship & test", items: ["Git & GitHub", "Vercel", "Netlify", "Vitest", "Playwright"] },
  { group: "Visual", items: ["Photoshop", "After Effects"] },
];

export const languages = [
  { name: "Swedish", level: "Native" },
  { name: "English", level: "C1" },
  { name: "Georgian", level: "A1, learning" },
];

export const officeDog = "Loui";
