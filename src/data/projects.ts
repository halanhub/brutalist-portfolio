import { asset } from "@/lib/asset";

export type Project = {
  slug: string;
  index: string;
  title: string;
  /** One-line category shown above the title. */
  kicker: string;
  /** Role as stated on the CV. Omitted where the CV doesn't specify one. */
  role?: string;
  lede: string;
  points: string[];
  stack: string[];
  url: string;
  linkLabel: string;
  /** Base name of the optimized derivatives in /assets/optimized. */
  image: string;
  /** Original full-resolution file, kept for reference and fallback. */
  original: string;
  alt: string;
  /** Colour sampled from the project's own interface. */
  accent: string;
  /** Background-position (%) of the detail crop shown in the loupe plate. */
  detail: { x: number; y: number; zoom: number };
};

export const projects: Project[] = [
  {
    slug: "georgian-language",
    index: "01",
    title: "Georgian Learn",
    kicker: "Subscription learning platform",
    role: "Founder & full-stack developer",
    lede: "A paid platform for learning Georgian, from a free 33-letter alphabet course to lessons, quizzes and flashcards. I designed it, built it and keep adding to it.",
    points: [
      "Firebase Auth, Firestore, Storage and Hosting",
      "Dodo Payments subscriptions with webhook handling",
      "Routes and lessons gated by subscription status",
      "New lessons, games and tools shipped continuously",
    ],
    stack: ["React", "TypeScript", "Firebase", "Dodo Payments"],
    url: "https://georgianlanguage.online/",
    linkLabel: "georgianlanguage.online",
    image: "georgianlanguage",
    original: "/assets/projects/georgianlanguage.webp",
    alt: "Georgian Learn homepage: 'Learn the Georgian Language' headline, a free alphabet course call to action and course statistics.",
    accent: "#E5262A",
    detail: { x: 50, y: 30, zoom: 2.4 },
  },
  {
    slug: "amindi24",
    index: "02",
    title: "Amindi24",
    kicker: "Real-time weather for Georgia",
    role: "Frontend developer",
    lede: "Localized forecasts for Georgian cities, mountains and coastline, pulled from an external weather API and built to load fast.",
    points: [
      "Structured async data handling and optimized rendering",
      "Caching that cuts redundant API calls",
      "Georgian-first interface with an English toggle",
      "Responsive layout tuned for a quick glance",
    ],
    stack: ["Weather API", "Caching", "Responsive UI"],
    url: "https://amindi24.ge/",
    linkLabel: "amindi24.ge",
    image: "amindi24",
    original: "/assets/projects/amindi24.webp",
    alt: "Amindi24 homepage in Georgian, showing a grid of popular cities with temperatures and weather icons.",
    accent: "#F5A524",
    detail: { x: 30, y: 30, zoom: 2.6 },
  },
  {
    slug: "vault-env",
    index: "03",
    title: "Vault.env",
    kicker: "Zero-knowledge secrets manager",
    role: "Personal project",
    lede: "A home for .env files where encryption happens in the browser. The master password never leaves the client.",
    points: [
      "Client-side AES-256-GCM encryption",
      "PBKDF2 key derivation",
      "Zero-knowledge architecture",
      "Google or email sign-in",
    ],
    stack: ["Client-side crypto", "AES-256-GCM", "PBKDF2"],
    url: "https://github.com/halanhub/Vault.env",
    linkLabel: "View on GitHub",
    image: "vault-env",
    original: "/assets/projects/vault-env.webp",
    alt: "Vault.env sign-in page: 'Your secrets, encrypted. Your keys, protected.' beside a login card on a green panel.",
    accent: "#3FA35A",
    detail: { x: 24, y: 44, zoom: 2.2 },
  },
  {
    slug: "young-scientists",
    index: "04",
    title: "Young Scientists",
    kicker: "Academic council portal",
    role: "Frontend developer",
    lede: "The platform for the Council of Young Scientists at the Georgian National Academy of Sciences: council members, publications and events, organized for reading.",
    points: [
      "Content-first layouts built for readability",
      "Accessibility and responsive design across devices",
      "Content architecture ready to grow",
      "Multilingual interface",
    ],
    stack: ["Information architecture", "Accessibility", "Responsive UI"],
    url: "https://youngscientists.ge/",
    linkLabel: "youngscientists.ge",
    image: "young-scientists",
    original: "/assets/projects/Young-scientists.webp",
    alt: "Young Scientists homepage with a Georgian headline in gold over a photograph of the Academy of Sciences building in Tbilisi.",
    accent: "#D4A12A",
    detail: { x: 30, y: 52, zoom: 2.2 },
  },
  {
    slug: "nordic-el",
    index: "05",
    title: "Nordic EL",
    kicker: "Electrical contractor, Sweden",
    role: "Frontend developer",
    lede: "A website for a Swedish electrical installation company. Built by someone who used to do the same job.",
    points: [
      "Semantic HTML, CSS and JavaScript",
      "SEO-conscious, responsive interface",
      "Structured contact form for inquiries and leads",
      "Deployed and maintained on Netlify",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Netlify"],
    url: "https://nordic-el.se/",
    linkLabel: "nordic-el.se",
    image: "nordic-el",
    original: "/assets/projects/nordic-el.webp",
    alt: "Nordic EL homepage in Swedish: 'Din elektriker i Sverige' next to a photo of an electrical distribution board.",
    accent: "#2A9A8F",
    detail: { x: 66, y: 40, zoom: 2.1 },
  },
  {
    slug: "opus-edu",
    index: "06",
    title: "Opus EDU",
    kicker: "Language school website",
    lede: "A bilingual Georgian and English site for a language school, with courses, CEFR levels and teacher profiles.",
    points: ["Georgian and English versions", "Course and CEFR level pages", "Teacher profiles with background and approach"],
    stack: ["Bilingual GE / EN", "Content site"],
    url: "https://opusedu.ge/",
    linkLabel: "opusedu.ge",
    image: "opusedu",
    original: "/assets/projects/opusedu.webp",
    alt: "Opus EDU teachers page with two teacher profile cards and a dark green footer.",
    accent: "#E3A23B",
    detail: { x: 34, y: 42, zoom: 2.2 },
  },
];

export const srcSet = (image: string, widths = [800, 1400, 2200]) =>
  widths.map((w) => `${asset(`/assets/optimized/${image}-${w}.webp`)} ${w}w`).join(", ");
