// Everything written on the site lives here, so edits don't mean digging through components.

export const person = {
  first: "John Rey",
  last: "Marquillero",
  short: "JR",
  roles: ["UX Engineer", "UX Writer", "UX Researcher"],
  email: "johnreymarquillero@gmail.com",
  github: "https://github.com/plummz",
  location: "Philippines",
  timezone: "Asia/Manila",
};

export const about = {
  intro:
    "I work in the gap between how a screen looks, what it says, and whether people can actually get through it. Some days that's Figma in the morning and a Java file by lunch. I like interfaces that feel calm, copy that sounds like a person wrote it, and bugs I can reproduce on the first try.",
  roles: [
    {
      title: "UX Engineer",
      tag: "builds it",
      body: "I build what I design, so nothing gets lost in the handoff. HTML, CSS and JavaScript up front, Java and SQL behind it.",
      color: "var(--lime)",
    },
    {
      title: "UX Writer",
      tag: "words it",
      body: "Buttons, empty states, error messages. The tiny words people read when they're already confused are the ones I fuss over most.",
      color: "var(--pink)",
    },
    {
      title: "UX Researcher",
      tag: "asks why",
      body: "Before drawing anything I want to know who's using it and where they give up. Short interviews, scrappy usability tests, too many notes.",
      color: "var(--sky)",
    },
  ],
  stats: [
    { value: 94, suffix: "", label: "commits across the two projects below" },
    { value: 27, suffix: "", label: "kiosk screens, all mapped to Figma" },
    { value: 18, suffix: "", label: "study buddies drawn for one app" },
  ],
};

export type Project = {
  id: string;
  index: string;
  name: string;
  kicker: string;
  year: string;
  role: string;
  summary: string;
  body: string;
  highlights: string[];
  stack: string[];
  live: string;
  repo: string;
  image: string;
  imageAlt: string;
  theme: { bg: string; fg: string; accent: string; muted: string };
};

export const projects: Project[] = [
  {
    id: "study-arena",
    index: "01",
    name: "Study Arena",
    kicker: "Capstone · Western Institute of Technology",
    year: "2026",
    role: "UX, front end, Java backend",
    summary: "A study app that doesn't make you compete with anyone.",
    body: "Most study apps I tried wanted a leaderboard in my face. This one is supposed to feel like a quiet desk. Competition is off by default, there are no random rewards, and levels stay hidden unless you go looking. You get a focus timer, flashcards that come back right before you forget them, quizzes that explain the answer, and a little companion who notices when you finish a session.",
    highlights: [
      "Spaced flashcards with four ratings, plus CSV import",
      "Focus timer and encrypted offline study",
      "18 companions, each with their own voice and walk",
      "A small Godot dungeon for when you've earned a break",
    ],
    stack: ["Java", "JavaScript", "Capacitor", "Godot", "Railway", "GitHub Pages"],
    live: "https://plummz.github.io/Study_Arena/",
    repo: "https://github.com/plummz/Study_Arena",
    image: "/img/sa_desktop.webp",
    imageAlt: "Study Arena home screen reading 'A little progress, every day.'",
    theme: { bg: "#F1EEE4", fg: "#1E3A2F", accent: "#2F5D46", muted: "#5d6f66" },
  },
  {
    id: "bocofi",
    index: "02",
    name: "BOCO-FI",
    kicker: "Bottle Collection & Wi-Fi",
    year: "2026",
    role: "UX, kiosk flow, full front end",
    summary: "Drop in a bottle, get coins or Wi-Fi time back.",
    body: "A reverse vending machine idea for the Philippines. You feed it a plastic bottle or a can and pick your reward: coins, a Wi-Fi voucher, or points saved to your account. I built all three sides of it: the touchscreen on the machine, the phone app recyclers use, and the dashboard the owner checks when a bin is almost full. There's no hardware yet, so the kiosk has a sensor simulator where a button pretends to be a bottle.",
    highlights: [
      "27 kiosk screens, numbered to match the Figma file",
      "Wallet with Wi-Fi countdown and one-time cash-out codes",
      "Owner dashboard with bin levels, alerts and CSV export",
      "Link the kiosk to the app with a 4-letter code",
    ],
    stack: ["HTML", "CSS", "JavaScript", "PWA", "Figma"],
    live: "https://plummz.github.io/BOCOFI/",
    repo: "https://github.com/plummz/BOCOFI",
    image: "/img/bo_kiosk.webp",
    imageAlt: "BOCO-FI kiosk start screen with a big green 'Recycle Today' button",
    theme: { bg: "#3F5523", fg: "#F4F8EC", accent: "#3FADED", muted: "#c9d6b4" },
  },
];

export const toolbox = {
  languages: ["Java", "HTML", "CSS", "JavaScript", "SQL", "MySQL"],
  platforms: [
    "GitHub",
    "Vercel",
    "Railway",
    "Render",
    "Supabase",
    "Cloudflare",
    "phpMyAdmin",
    "Figma",
    "Godot",
    "Blender",
  ],
  ai: ["Claude", "Codex"],
};
