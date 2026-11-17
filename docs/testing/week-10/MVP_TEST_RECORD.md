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
  
Performance score: <FILL IN> 
Accessibility score: <FILL IN> 
One important Lighthouse finding or "none listed": <FILL IN> 
Keyboard plus muted-video result: <FILL IN> 
  
## 3. Defect decision and retest 
  
Highest-severity finding: <FILL IN OR NONE> 
Severity: <FILL IN - BLOCKER, SEVERE, MAJOR, MINOR, or NONE> 
Smallest repair made: <FILL IN OR "No repair required"> 
Focused retest result: <FILL IN> 
  
## 4. Release gate 
  
Release decision: <FILL IN - GO or NO-GO> 
Decision reason: <FILL IN> 
GitHub Actions run: <PASTE RUN URL> 
Release tag if GO: v0.9.0-rc1 
  
## 5. Engineering and AI Use Log 
  
What I tested myself: <FILL IN> 
What remained human-reviewed rather than automated: <FILL IN> 
Known limitation carried into Week 11 Red Teaming: <FILL IN>
