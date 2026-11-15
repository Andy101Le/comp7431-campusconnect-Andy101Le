/**
 * CampusConnect approved IT guide + answer logic.
 * Answers are only ever returned verbatim from this guide (retrieval, no generation).
 * Anything the guide cannot support is referred to a human.
 */

export type GuideEntry = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
};

export const APPROVED_GUIDE: GuideEntry[] = [
  {
    id: "password-reset",
    title: "Resetting your campus password",
    keywords: ["password", "reset", "forgot", "locked", "lockout", "login", "sign", "account", "change"],
    answer:
      "Use the official campus self-service password reset page from the campus IT website. You will verify your identity with your registered recovery method, then choose a new password. If you are locked out or cannot verify, contact the IT Service Desk. Never share your password or recovery codes with anyone, including staff.",
  },
  {
    id: "wifi",
    title: "Connecting to secure campus Wi-Fi",
    keywords: ["wifi", "wi-fi", "wireless", "internet", "network", "connect", "eduroam", "secure", "laptop", "phone"],
    answer:
      "Connect to the secure campus Wi-Fi network (not the open guest network) and sign in with your campus username and password. If your device asks to trust a certificate, only accept it on the official campus network. If you still cannot connect, forget the network, reconnect, and then contact the IT Service Desk.",
  },
  {
    id: "service-desk",
    title: "Contacting the IT Service Desk",
    keywords: ["service", "desk", "help", "helpdesk", "support", "contact", "ticket", "hours", "staff", "human", "person"],
    answer:
      "The IT Service Desk handles anything this guide does not cover. Use the contact options listed on the campus IT website to open a ticket or speak with a staff member. Describe the problem, but do not include passwords, recovery codes, or student records.",
  },
];

export type HelpResult =
  | { status: "answered"; entry: GuideEntry }
  | { status: "sensitive" }
  | { status: "referred" }
  | { status: "empty" };

const SENSITIVE_PATTERNS = [
  /\bmy\s+password\s+is\b/i,
  /\bpassword\s*[:=]/i,
  /\b(recovery|backup|verification|mfa|2fa)\s+codes?\s*(is|are|[:=])/i,
  /\b(student|social security|ssn)\s+(id|number)\s*(is|[:=])/i,
  /\b\d{3}-\d{2}-\d{4}\b/,
];

const MIN_SCORE = 1;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/wi-fi/g, "wifi")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

export function answerQuestion(question: string, guide: GuideEntry[] = APPROVED_GUIDE): HelpResult {
  const trimmed = question.trim();
  if (!trimmed) return { status: "empty" };
  if (SENSITIVE_PATTERNS.some((p) => p.test(trimmed))) return { status: "sensitive" };

  const tokens = new Set(tokenize(trimmed));
  let best: { entry: GuideEntry; score: number } | null = null;
  for (const entry of guide) {
    const score = entry.keywords.reduce(
      (sum, kw) => sum + (tokens.has(kw.replace(/wi-fi/g, "wifi")) ? 1 : 0),
      0,
    );
    if (score >= MIN_SCORE && (!best || score > best.score)) best = { entry, score };
  }
  return best ? { status: "answered", entry: best.entry } : { status: "referred" };
}

export const VIDEO_TRANSCRIPT = [
  {
    time: "0:00",
    text: "Hello. I am an AI-generated CampusConnect presenter, not a live staff member. You can use CampusConnect for approved campus IT help. Ask about password resets, secure campus Wi-Fi, or the IT Service Desk. Please do not share passwords, recovery codes, student records, or other private information. If the chatbot cannot support an answer from its approved guide, it will direct you to a human. This video is a prerecorded introduction. You can read the same script in our GitHub project.",
  },
];
