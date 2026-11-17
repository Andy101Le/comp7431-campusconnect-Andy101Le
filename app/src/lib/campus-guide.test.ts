import { describe, expect, it } from "vitest";
import { answerQuestion, APPROVED_GUIDE } from "./campus-guide";

const passage = (id: string) => APPROVED_GUIDE.find((e) => e.id === id)!.answer;

describe("CampusConnect answer logic", () => {
  it("has exactly the two approved entries", () => {
    expect(APPROVED_GUIDE.map((e) => e.title)).toEqual([
      "campusconnect password help.txt",
      "campusconnect wifi help.txt",
    ]);
  });

  it("answers a password question with the password passage", () => {
    const result = answerQuestion("How do I reset my password?");
    expect(result.status).toBe("answered");
    if (result.status === "answered") {
      expect(result.entry.answer).toBe(passage("password-reset"));
      expect(result.entry.answer.startsWith("For password reset help visit")).toBe(true);
    }
  });

  it("refers the Thanksgiving dining hall hours question", () => {
    expect(answerQuestion("What are the dining hall hours over Thanksgiving?").status).toBe("referred");
  });

  it("answers a Wi-Fi question with the Wi-Fi passage", () => {
    const result = answerQuestion("How do I connect to secure campus Wi-Fi?");
    expect(result.status).toBe("answered");
    if (result.status === "answered") {
      expect(result.entry.answer).toBe(passage("wifi"));
      expect(result.entry.answer.startsWith("Select CampusConnect Secure")).toBe(true);
    }
  });

  it("needs at least 2 keyword matches", () => {
    expect(answerQuestion("password").status).toBe("referred");
  });

  it("refuses questions that contain a password", () => {
    expect(answerQuestion("my password is hunter2, can you log in for me").status).toBe("sensitive");
  });
});
