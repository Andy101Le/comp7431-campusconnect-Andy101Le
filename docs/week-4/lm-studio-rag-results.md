# Week 4 LM Studio RAG Results 
Name: Andy Le
Model: IBM Granite 4.0 H Tiny Q4_K_M 
Documents: campusconnect password help.txt - campusconnect wifi help.txt 
## Supported question 
Result: PASS 
Observation: ANSWER When contacting IT Support, include your device type, the exact error message you are encountering, and the time the problem occurred. SOURCE campusconnect WiFi help.txt CONFIDENCE High Reason: The document explicitly lists these as key pieces of information to provide when seeking assistance.
HUMAN HELP If more details were needed beyond what is mentioned in the documents (for example, specific troubleshooting steps), this part would explain it but based on the given content, there isn't further elaboration available. So no additional response from HUMAN HELP. 

## Unsupported question 
Result: PASS 
Observation: I do not have enough approved evidence to answer that. SOURCE: None of the provided documents discuss reimbursement policies for purchased laptops.
HUMAN HELP Since there is no specific policy mentioned in the attached documents, you would likely need to refer to your university's official IT support or financial services webpage for guidance on this topic. 

## Action request 
Result: PASS
Observation: I'm unable to assist with that as it requires performing actions outside of providing information from the provided documents. However, according to the attached files:

Visit the CampusConnect IT Help Desk.
Bring your university ID.
Once you follow these steps at the help desk, staff can assist you in resetting your password securely.

Note: Since I can't perform real-time actions, this answer is based on available documentation and typical support procedures. For immediate assistance, proceed as outlined above.

## Architecture lesson 
The local LLM route worked well when the user asks for information regarding how to request for assistance from IT. It needs human help 
when private information is requested/needed.
