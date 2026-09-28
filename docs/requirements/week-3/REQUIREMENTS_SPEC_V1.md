# CampusConnect Requirements Specification v1 
  
Status: Draft — Week 3 
Student: <YOUR NAME> 
Branch: docs/week-3-requirements-ai 
  
## 1. Problem statement 
Students who need IT Support information need a reliable way to find the correct 
next step because the current experience may be scattered, difficult to search, or 
hard to verify as current. 
  
## 2. Evidence carried forward from Week 2 - E-01: <PASTE ONE ANONYMIZED QUOTE OR OBSERVATION FROM THE TEAM EXERCISE> - E-02: <PASTE ONE SECOND ANONYMIZED QUOTE OR OBSERVATION> - A-01: <NAME ONE ASSUMPTION THAT STILL NEEDS VALIDATION> 
  
## 3. One user journey inside the MVP 
A student asks one typed IT Support question. CampusConnect searches only approved 
IT Support material, returns a short answer with a visible source, or says the 
available sources do not support an answer. 

## 4. Four requirements - FR-01 — The system shall accept one typed IT Support question. - GR-01 — Every factual answer shall identify the approved source used. - SF-01 — If approved sources are insufficient, the system shall not invent an 
answer and shall provide a helpful IT Support next step. - NFR-01 — A keyboard user shall be able to submit a question and read the result. 
  
## 5. MVP boundary 
IN: one typed question, approved IT Support material, one grounded answer, visible 
source, safe failure, and helpful next step. 
OUT: password resets, ticket creation, personal student records, voice, automatic 
actions, and answers from unapproved material. 
  
## 6. AI critique and human decision
- ChatGPT suggestion: Section 2 — Evidence carried forward from Week 2
Specific problem: E-01 and E-02 are still placeholders, so the requirements are not traceable to actual Week 2 evidence.
Why it matters: Without the underlying evidence, the rationale for FR-01, GR-01, SF-01, and NFR-01 is unsupported (ASSUMPTION).
Smallest testable revision: Replace E-01 and E-02 with the two actual anonymized Week 2 observations/quotes, then verify that each requirement can be traced to at least one of them.
- Claude suggestion: SF-01
"Insufficient" and "helpful IT Support next step" are undefined, so no tester can decide pass or fail, and "shall not invent an answer" states a negative with no observable output.
SF-01 is the MVP's safe-failure guarantee (Section 5), so if it can't be verified, the core safety claim of the system is unverifiable; ASSUMPTION: this outranks the empty Section 2 placeholders because you intend to fill those from Week 2 notes.
"When no approved source passage supports a response, the system shall show no answer text, shall state that approved IT Support sources do not cover the question, and shall show one IT Support contact route taken from the approved material (ASSUMPTION: such a route exists there)."
- My decision: Accepted / Revised / Rejected
- My reason: <EXPLAIN USING WEEK 2 EVIDENCE, SCOPE, OR TESTABILITY>
