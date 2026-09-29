// All site copy lives here. Facts about the projects come from their own READMEs and docs;
// if something changes in a project, change it here too.

export const person = {
  name: "John Rey Marquillero",
  email: "johnreymarquillero@gmail.com",
  github: "https://github.com/plummz",
  timezone: "Asia/Manila",
};

export const hero = {
  draft: "nice-looking apps.",
  final: "screens people get through on the first try.",
  lead: "I make",
  intro:
    "I'm a UX engineer, writer and researcher from the Philippines. I find out where people get stuck, fix the words, then build the fix in Java and JavaScript.",
};

// A line of real copy next to the version most apps would ship. The struck one is a common pattern,
// not an earlier draft of John's.
export type CopyPair = { usual: string; shipped: string; why: string };

export type CaseStudy = {
  id: string;
  name: string;
  outcome: string;
  context: string;
  role: string;
  live: string;
  repo: string;
  problem: string;
  decisions: string[];
  copy: CopyPair[];
  build: { summary: string; points: string[] };
  status: { works: string[]; notYet: string[] };
  notes: string[];
};

export const studyArena: CaseStudy = {
  id: "study-arena",
  name: "Study Arena",
  outcome: "A study app for students who don't want a leaderboard.",
  context: "Capstone, Western Institute of Technology, 2026",
  role: "Research, UX writing, front end and Java backend",
  live: "https://plummz.github.io/Study_Arena/",
  repo: "https://github.com/plummz/Study_Arena",
  problem:
    "A lot of study apps turn revising into a race: public ranks, streak guilt, random loot. We asked 15 students what would actually keep them studying, and the answers kept pointing the same way. Study alone first, compare yourself with yourself, and keep competition for the people who want it.",
  decisions: [
    "Solo is the default. Competition stays hidden until a student turns it on in Settings.",
    "Progress means your own mastery and history, never a public rank.",
    "Rewards are fixed and shown up front. No random boxes, no cash.",
    "Levels can be switched off without losing anything you earned.",
    "Calm on purpose: soft colours, restrained motion, reduced-motion support.",
  ],
  copy: [
    {
      usual: "You lost your 5-day streak!",
      shipped: "Your progress is private. Always your pace.",
      why: "No shame messages. A streak rewards coming back; it never punishes a missed day.",
    },
    {
      usual: "Start Pomodoro Session",
      shipped: "Settle in. Pick one thing. Let the rest wait.",
      why: "Say what to do, in the voice of a friend at the next desk.",
    },
    {
      usual: "Climb the ranks and beat your friends",
      shipped: "There's no race here. Just a little room to learn.",
      why: "The home screen repeats the survey result back to the student.",
    },
  ],
  build: {
    summary:
      "A Java 17 API with SQLite, a plain JavaScript client that also runs as an Android app through Capacitor, and a small Godot dungeon for breaks.",
    points: [
      "Offline study is encrypted in the browser (AES-GCM) and synced through a queue that can't double-count",
      "API hosted on Railway, web client on GitHub Pages",
      "Tested with domain tests, integration tests and Playwright end-to-end runs",
      "18 hand-drawn companions, each with their own voice and way of moving",
    ],
  },
  status: {
    works: [
      "68 automated checks passing on 15 September 2026: 14 Java, 9 JavaScript, 26 API and 16 browser tests, plus 3 smoke tests on the installed app",
      "The same API tests pass against the packaged JAR, with no unhandled server errors",
    ],
    notYet: [
      "No real student pilot yet, so none of the pilot targets are proven",
      "No signed Android APK and no test on an actual low-end phone",
    ],
  },
  notes: [
    "15 students is a small sample. It set our priorities; it doesn't prove anything about all students.",
    "Mastery is never shown in red and green alone, so colour-blind students can read it too.",
  ],
};

export const bocofi: CaseStudy = {
  id: "bocofi",
  name: "BOCO-FI",
  outcome: "A reverse vending machine: drop in a bottle, get coins, Wi-Fi time or points.",
  context: "Bottle Collection & Wi-Fi, 2026",
  role: "UX flow, kiosk, recycler app and owner dashboard",
  live: "https://plummz.github.io/BOCOFI/",
  repo: "https://github.com/plummz/BOCOFI",
  problem:
    "The machine has to make sense to someone standing in front of it for the first time with a bottle in their hand, to a regular who wants their points saved, and to the owner who has to empty the bin. Three people, one machine.",
  decisions: [
    "Three surfaces for three people: a touchscreen kiosk, a phone app for recyclers, and a dashboard for the owner.",
    "Guest mode stayed in even though the Figma screens left it out, so nobody needs an account to recycle one bottle.",
    "Every branch of the flowchart is handled: no coins left, no Wi-Fi, a full bin, an unknown item.",
    "Screens are numbered exactly like the Figma frames, 1.0 to 7.1, so design and code never drift apart.",
  ],
  copy: [
    {
      usual: "Error: feature unavailable",
      shipped: "Log in to save",
      why: "A disabled button should say what unlocks it.",
    },
    {
      usual: "Invalid object detected",
      shipped: "Item not recognised. Please take the item from the drawer.",
      why: "Tell people what happened and what to do with the thing in their hand.",
    },
    {
      usual: "Transaction successful",
      shipped: "Item accepted +₱0.05",
      why: "Show the money. That's the reason they're standing there.",
    },
  ],
  build: {
    summary:
      "Plain HTML, CSS and JavaScript with no build step. The kiosk is a state machine keyed by the Figma screen numbers.",
    points: [
      "Kiosk, app and dashboard share one data layer, so a bottle inserted on the kiosk shows up in the app and the owner's view",
      "Link the kiosk to the app by typing a 4-letter code shown on screen",
      "One-time cash-out codes from the app pay out at the kiosk's coin tray",
      "A sensor simulator stands in for the hardware until the machine exists",
    ],
  },
  status: {
    works: [
      "All 27 kiosk screens run in the browser, following the Figma flow from 1.0 to 7.1",
      "Kiosk, app and owner dashboard work together end to end with demo accounts",
    ],
    notYet: [
      "There's no machine yet. The sensors, coin hopper and crusher are simulated",
      "Not tested with recyclers at a real barangay site",
    ],
  },
  notes: [
    "Prices come from real bottle sizes, starting with a Sakto bottle at ₱0.05.",
    "A guest can still recycle, but the Save option says plainly why it's off.",
  ],
};

export const kioskFlow = [
  {
    id: "2.0",
    title: "Access page",
    img: "/img/bo-k20.webp",
    alt: "Kiosk asking how you want to continue: log in or guest",
  },
  {
    id: "4.0",
    title: "Insert item",
    img: "/img/bo-k40.webp",
    alt: "Kiosk asking you to insert a bottle or can, with a sensor simulator",
  },
  {
    id: "4.2",
    title: "Item accepted",
    img: "/img/bo-k42.webp",
    alt: "Kiosk confirming a Sakto bottle was accepted for 5 centavos",
  },
  {
    id: "6.0",
    title: "Reward choice",
    img: "/img/bo-k60.webp",
    alt: "Kiosk offering coins, Wi-Fi or saving to an account",
  },
];

export const toolbox = [
  {
    stage: "Research and design",
    tools: [{ name: "Figma", note: "BOCO-FI's kiosk flow, all 27 frames" }],
  },
  {
    stage: "Build",
    tools: [
      { name: "Java", note: "Study Arena's API" },
      { name: "JavaScript", note: "every front end on this page" },
      { name: "HTML and CSS", note: "" },
      { name: "SQL and MySQL", note: "" },
      { name: "phpMyAdmin", note: "" },
      { name: "Supabase", note: "" },
    ],
  },
  {
    stage: "Ship",
    tools: [
      { name: "GitHub", note: "both live demos run on GitHub Pages" },
      { name: "Railway", note: "hosts the Study Arena API" },
      { name: "Render", note: "backup backend blueprint for Study Arena" },
      { name: "Vercel", note: "this site" },
      { name: "Cloudflare", note: "" },
    ],
  },
  {
    stage: "Play",
    tools: [
      { name: "Godot", note: "the Study Arena break dungeon" },
      { name: "Blender", note: "" },
    ],
  },
  {
    stage: "Pair programming",
    tools: [
      { name: "Claude", note: "" },
      { name: "Codex", note: "" },
    ],
  },
];
