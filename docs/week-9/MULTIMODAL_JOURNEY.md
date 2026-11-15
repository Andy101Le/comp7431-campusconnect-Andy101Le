# Lab09 Multimodal Journey Evidence

Branch: feature/week-9-multimodal-integration
Tested on: 2026-11-15, Lovable preview of "CampusConnect Multimodal Help"

## Journey A - Supported
- Input method used: text
- Question used: How do I reset my CampusConnect password?
- RAG answer observed: "Use the official campus self-service password reset page from the campus IT website. You will verify your identity with your registered recovery method, then choose a new password. If you are locked out or cannot verify, contact the IT Service Desk. Never share your password or recovery codes with anyone, including staff."
- Citation or source observed: "Source: approved guide — Resetting your campus password"
- Voice behavior: not exercised in this run. On page load no voice widget or microphone prompt appeared; the "Ask by voice" card only shows a "Turn on voice assistant" button.
- Video remained optional: yes. The video stayed unloaded ("Load orientation video", "Video won't play until you press play.") and the text answer appeared without interruption.

## Journey B - Unsupported
- Question used: What are the Thanksgiving dining hall hours?
- Abstention or human next step observed: "The IT Service Desk handles anything this guide does not cover. Use the contact options listed on the campus IT website to open a ticket or speak with a staff member. Describe the problem, but do not include passwords, recovery codes, or student records." Source shown: "approved guide — Contacting the IT Service Desk"
- Text fallback worked with video muted/skipped: yes. Video was never loaded; the text path answered normally.
- Earlier check (voice): "What's the weather like?" -> "I don't have access to live weather data, so I can't tell you what it's like right now."

## Traceability
- Requirement: one optional multimodal CampusConnect journey
- Files changed (copied from the Lovable project into app/):
  - app/src/routes/index.tsx
  - app/src/routes/__root.tsx
  - app/src/styles.css
  - app/src/lib/campus-guide.ts (new)
  - app/src/lib/campus-guide.test.ts (new)
  - app/src/components/campus/TextHelp.tsx (new)
  - app/src/components/campus/VoiceCard.tsx (new)
  - app/src/components/campus/VideoCard.tsx (new)
  - app/AGENTS.md
- Known limitation:
  - Lovable reported the project had no existing text Q&A area, so it created one that answers only from a short IT guide it wrote (src/lib/campus-guide.ts). That guide is not yet the approved CampusConnect RAG knowledge source and must be replaced.
  - The unsupported question is routed to the IT Service Desk entry rather than an explicit "I can't answer that" plus the right office (dining services).
  - app/ holds only the files changed in Week 9, not the full Lovable project, so it does not build on its own.
  - The voice journey was not run end to end in this check.

## Review and submission
- Pull request: https://github.com/Andy101Le/comp7431-campusconnect-Andy101Le/pull/5
- Reviewer: no partner review; author self-check posted on the PR instead
- Review decision: REQUEST CHANGES (check 1, RAG answer and citation: REVISE; checks 2-6: PASS)
- Correction made: none yet. Requested change: point the text answer path at the approved CampusConnect RAG source instead of the Lovable-written guide, then rerun Journey A.
- Pull request left open (not merged).
