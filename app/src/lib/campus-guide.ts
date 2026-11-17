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
    title: "campusconnect password help.txt",
    keywords: ["password", "reset", "forgot", "locked", "lockout", "login"],
    answer:
      "For password reset help visit the CampusConnect IT Help Desk. Bring your university ID. Staff will never ask for your current password or recovery code. When requesting help include your device type the exact error message and the time the problem occurred.",
  },
  {
    id: "wifi",
    title: "campusconnect wifi help.txt",
    keywords: ["wifi", "wireless", "network", "connect", "secure"],
    answer:
      "Select CampusConnect Secure from the available networks. Use your university username. If setup fails forget the network and reconnect. When contacting IT Support include the device type the exact error message and the time the problem occurred.",
  },
];

export const REFERRAL_MESSAGE =
  "CampusConnect only answers campus IT questions about password help and Wi-Fi. I can't answer that. Please contact the right campus office or a staff member.";

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

const MIN_SCORE = 2;

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
