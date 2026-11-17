# Week 10 MVP Test, CI, and Freeze 
  
Student: Andy Le 
Date: 11/16/2026 
Branch: release/week-10-rc1 
Local URL: https://id-preview--26986fc8-20a6-4bf0-8b10-3bd5cc9f5c3f.lovable.app (Week 9 Lovable MVP; nothing was running at http://127.0.0.1:7860 and the repo has no app.py)
Environment: Chrome on Windows 11; Lovable preview (keyword retrieval from app/src/lib/campus-guide.ts, no LM Studio)

## 1. Six-test MVP record

| # | Quality area | Action and expected result | Observed evidence | Result |
|---|---|---|---|---|
| 1 | Supported retrieval | Ask: "How do I reset my CampusConnect password?" The answer uses the approved password-reset passage. | The answer is the approved passage from campusconnect password help.txt, word for word: "For password reset help visit the CampusConnect IT Help Desk. Bring your university ID. Staff will never ask for your current password or recovery code. When requesting help include your device type the exact error message and the time the problem occurred." Nothing outside that passage was added. | PASS |
| 2 | Citation support | Open the displayed source from Test 1. At least one important answer claim is directly supported by the source passage. | The answer shows "Source: campusconnect password help.txt". Clicking "View source" (also reachable with Tab and Enter) expands the full approved passage with its file name, and it directly supports the claim to visit the CampusConnect IT Help Desk with a university ID. | PASS |
| 3 | Unsupported query | Ask: "What are the Thanksgiving dining hall hours?" The system states its IT-support limit and does not invent hours, a source, phone number, or office. | The app replied: "CampusConnect only answers campus IT questions about password help and Wi-Fi. I can't answer that. Please contact the right campus office or a staff member." No hours, phone number, office, or source were shown. | PASS |
| 4 | Voice and text fallback | Use the supported answer. If voice works, its meaning matches the visible grounded answer. If voice is unavailable, the text, source, and a clear Continue in text or retry path remain. | Turned on the voice assistant, started a call and asked the password question; the spoken answer matched the meaning of the visible text answer (IT Help Desk, bring university ID), confirmed by listening. The text answer, source line and "Use text instead" stayed visible with the widget on. | PASS |
| 5 | Video accessibility | Mute the tab and skip the video. AI disclosure and transcript remain visible, and the chatbot is reachable by keyboard. | Video was skipped and never loaded (no video or audio element on the page), so no sound played; the tab was not muted from Chrome's menu. One Tab from the page reached the question box, typing plus Enter returned the answer, and Tab then Enter opened "View source". "AI-generated presenter, not a live staff member." stayed visible, and "Read video transcript" opened the transcript with Enter. | PASS |
| 6 | Latency and recovery | Time one supported question. Class target: grounded text in 5 seconds or less. If slower, the question is preserved and progress, retry, or text fallback is clear. | 1.0 second (984 ms measured in the browser from pressing Enter to the answer and source appearing). The question stayed in the box after the answer appeared. | PASS |

## 2. Lighthouse and manual accessibility evidence

Performance score: 85 (Chrome DevTools Lighthouse, Navigation mode, Desktop, Lovable preview page)

Accessibility score: 100

One important Lighthouse finding or "none listed": Speed Index was 4.6 s (flagged red) even though First Contentful Paint was 1.2 s, Largest Contentful Paint 1.3 s, Total Blocking Time 0 ms and Cumulative Layout Shift 0. Top insights were document request latency (est. 680 ms savings) and reduce unused JavaScript (est. 838 KiB), with "Minify JavaScript" also listed, which suggests the Lovable preview serves a development build; a published build may score differently. The 100 accessibility score does not prove the page is accessible, so the manual keyboard check below is still required.

Keyboard plus muted-video result: PASS. The video was never loaded and no audio played. One Tab reached the question box, typing plus Enter returned the answer, Tab then Enter opened "View source", and "Read video transcript" opened the transcript with Enter. "AI-generated presenter — not a live staff member." stayed visible throughout.

## 3. Defect decision and retest

Highest-severity finding: The text Q&A answered from a short guide that Lovable wrote itself, labeled "approved guide", instead of the approved CampusConnect documents. The password answer (self-service reset page) did not match the approved passage (IT Help Desk with a university ID), the source could not be opened, and the Thanksgiving dining hall question matched the keyword "hours" and got an IT Service Desk answer with a source attached instead of a refusal. Tests 1-3 failed on the first run.

Severity: SEVERE

Smallest repair made: Commit dc3ed7a "fix: correct source mapping and tighten abstention" (app/src/lib/campus-guide.ts, app/src/lib/campus-guide.test.ts, app/src/components/campus/TextHelp.tsx). The guide now holds only the two approved passages, word for word, titled campusconnect password help.txt and campusconnect wifi help.txt; each answer shows its file name and a keyboard-accessible "View source" button; generic keywords were removed and 2 keyword matches are required; anything else gets an IT-only refusal with no source. Commit 1e0c0c9 first added the Week 9 app files to this branch, since the Week 9 pull request was not merged into main.

Focused retest result: Reran Tests 1-3 on the Lovable preview after the fix; all PASS. The password question returns the approved passage with "Source: campusconnect password help.txt", "View source" shows the supporting passage, and the Thanksgiving question gets "CampusConnect only answers campus IT questions about password help and Wi-Fi. I can't answer that. Please contact the right campus office or a staff member." with no source. The Wi-Fi question still answers with its approved passage, and Lovable reported its unit tests pass.

## 4. Release gate

Release decision: GO

Decision reason: The only SEVERE finding was repaired and Tests 1-3 pass on retest, so all six MVP tests pass and no blocker or severe defect remains. The remaining Lighthouse finding (Speed Index 4.6 s on the development preview) is a performance issue for the backlog, not a blocker.

GitHub Actions run: https://github.com/Andy101Le/comp7431-campusconnect-Andy101Le/actions/runs/43990697256 (Week 10 Release Check #1, green on commit e5f4300; all steps passed: "Syntax OK: 7 files", record present, no tracked .env, no unfilled evidence markers, Release decision: GO). The compile step was adapted from the lab template because the MVP is a Lovable TypeScript app with no app.py or requirements.txt: it syntax-checks every .ts/.tsx file in app/src with the TypeScript compiler instead of py_compile. The evidence and secret-hygiene step is unchanged.

Release tag if GO: v0.9.0-rc1

## 5. Engineering and AI Use Log

What I tested myself: I listened to the voice answer for Test 4 before and after the fix, ran the Lighthouse audit in Chrome DevTools, and chose the SEVERE rating. I ran Tests 1, 2, 3, 5 and 6, timed latency in the browser, sent the repair prompt to Lovable, and drafted this record; I reviewed the results.

What remained human-reviewed rather than automated: Whether the spoken answer matches the text (Test 4), the severity rating and GO decision, and whether the guide passages match the instructor's approved Week 4 documents.

Known limitation carried into Week 11 Red Teaming: Answers come from simple keyword matching over two approved passages, not the LM Studio RAG pipeline, so new phrasings may be refused or mismatched. The voice agent's knowledge is separate from the text guide and could drift from it. app/ holds only the Week 9 files, not the full Lovable project, so it does not build on its own. Lighthouse Speed Index was 4.6 s on the development preview.
