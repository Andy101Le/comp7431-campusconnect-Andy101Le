import { describe, expect, it } from "vitest";
import { answerQuestion } from "./campus-guide";

describe("CampusConnect answer logic", () => {
  it("answers a password reset question from the approved guide", () => {
    const result = answerQuestion("How do I reset my password?");
    expect(result.status).toBe("answered");
    if (result.status === "answered") expect(result.entry.id).toBe("password-reset");
  });

  it("answers a Wi-Fi question from the approved guide", () => {
    const result = answerQuestion("I can't connect to campus Wi-Fi");
    expect(result.status).toBe("answered");
    if (result.status === "answered") expect(result.entry.id).toBe("wifi");
  });

  it("refers unsupported questions to a human", () => {
    expect(answerQuestion("What is on the cafeteria menu today?").status).toBe("referred");
  });

  it("refuses to process questions that contain a password", () => {
    expect(answerQuestion("my password is hunter2, can you log in for me").status).toBe("sensitive");
  });
});
