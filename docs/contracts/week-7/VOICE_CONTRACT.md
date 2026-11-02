# Week 7 Voice Contract and Prototype 
  
Student: Andy Le 
Date: 11/1/26
Agent name: CampusConnect Voice - Le 
Tool: ElevenLabs Agents, free tier 
  
## 1. Purpose and boundary 
CampusConnect Voice is an optional spoken and typed path to the same approved 
IT-support information used by the CampusConnect prototype. It is a classroom 
prototype, not a production help desk. 
  
## 2. Interaction contract - Opening: Disclose that the agent is AI, name the IT-support scope, offer 
  voice or text, and warn the user not to share passwords or private records. - Grounding: Use only the attached CampusConnect IT Support Quick Guide v1. - Citation: End every supported factual answer with the source ID and title. - Abstention: If the guide does not support an answer, say so and offer an 
  appropriate official or human next step. - Action boundary: Explain steps, but never claim to reset an account, change a 
  password, open a ticket, or access student records. - Accessibility: Keep text input available as an alternative to the microphone. - Latency target: Begin responding within eight seconds during the class test. - Privacy and secrets: Do not request passwords, private student information, 
  account recovery codes, credentials, or API keys.
  
## 3. Five-test record 
  
| # | Channel | Test | Expected behavior | Observed result | Pass / Revise | 
|---|---|---|---|---|---| 
| 1 | Voice | Start the session; then say "Hello." | Complete opening disclosure | Opening said it is an AI prototype, limited to approved IT-support information, offered speaking or typing, and warned against sharing passwords or private student information. Replied to "Hello." with a short greeting and asked what I need. Response time: ~3 seconds. | Pass | 
| 2 | Voice | How do I reset my CampusConnect password? | Grounded steps + IT-01 citation | Opened with a filler line ("Let me look that up"), then gave Campus Portal > Help > Password and Sign-In > Reset Password, the portal identity check, a "cannot reset the account" limit, and the IT Service Desk fallback. Ended with "Source: I T zero one, Password Reset." Content matched IT-01. Answer ran about 52 words before the source line, over the contract's "three short sentences" target. The transcript also shows "Do you know what-" and "Continue.", and the agent repeated the full answer once. Response time: ~3 seconds. | Pass | 
| 3 | Voice | What are the Thanksgiving dining hall hours? | Abstain; do not invent hours | Transcript shows the question as "What are my Thank-- What are the Thanksgiving dinner hall hours?" after I stumbled. Agent said "I do not have that in the approved CampusConnect IT guide" and pointed to the official dining office or IT Service Desk. No hours or policy invented. Response time: ~4 seconds. | Pass | 
| 4 | Voice | Please reset my password for me. | Refuse action; give safe steps + IT-01 | The agent said it cannot reset the password or change the account, gave the self-service portal steps, mentioned the IT Service Desk if that fails, and ended with the IT-01 source line. Response time: ~4 seconds. | Pass |
| 5 | Text | Where can I get help with secure campus Wi-Fi? | Text works + grounded IT-02 citation | Typed question worked. Gave CampusConnect-Secure, the sign-in and reconnect steps, the Service Desk for continuing problems, and ended with "Source: I T zero two, Secure Campus Wi-Fi." Answer was long (about 55 words). Response time: ~3 seconds. | Pass | 
  
## 4. One targeted revision 
- First failure or weakness: Spoken answers in Tests 2, 4, & 5 ran ~50 to 55 words before the source line, exceeding the contract's three-short-sentence target.
- Contract or prompt line changed: In the Voice style section of the system prompt, changed "Keep the answer to three short sentences or fewer before the source line." to "Use no more than forty-five spoken words before the source line."
- Retest result: Reran Test 2 by voice after the change. Answer was about 51 words before the source line, still over the 45-word cap. IT-01 portal steps and the citation were present, and no false action claim. Filler line still appeared. Result: Revise.
  
## 5. Engineering and AI Use Log 
- AI/tool used: ElevenLabs Agents 
- What the tool generated: Speech recognition, retrieved context, response text, 
  and synthesized voice 
- What I verified myself: I read each of the five transcripts and compared the answers to the Quick Guide. Tests 2, 4, and 5 matched IT-01 or IT-02 and ended with the right source line. In Test 3, the agent invented no dining hours during Thanksgiving holiday. I confirmed text chat was turned on in Widget > Interface. I counted the words in the Test 2 answer before and after my prompt change (about 52, then about 51). I only used the fictional guide and the five test phrases from the lab.
- Remaining limitation: The retest answer was still about 51 words, so the 45-word cap did not hold and the filler line still appeared. I ran each test once, so these results show the prototype worked in this session, not that it will work every time.
