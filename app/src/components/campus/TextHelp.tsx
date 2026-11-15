import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { answerQuestion, type HelpResult } from "@/lib/campus-guide";

export const QUESTION_INPUT_ID = "campus-question";

const SUGGESTIONS = [
  "How do I reset my password?",
  "How do I connect to secure campus Wi-Fi?",
  "How do I contact the IT Service Desk?",
];

export function focusTextQuestion() {
  const el = document.getElementById(QUESTION_INPUT_ID);
  el?.scrollIntoView({ behavior: "smooth", block: "center" });
  el?.focus({ preventScroll: true });
}

export function TextHelp() {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");
  const [result, setResult] = useState<HelpResult | null>(null);

  const ask = (q: string) => {
    setAsked(q.trim());
    setResult(answerQuestion(q));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(question);
  };

  return (
    <section aria-labelledby="text-help-title" className="panel panel-primary">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="text-help-title" className="section-title">
          Ask a question
        </h2>
        <span className="tag">Recommended</span>
      </div>
      <p className="mt-2 text-muted-foreground">
        Answers come only from the approved campus IT guide.
      </p>

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3">
        <label htmlFor={QUESTION_INPUT_ID} className="text-sm font-semibold">
          Your question
        </label>
        <textarea
          id={QUESTION_INPUT_ID}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              ask(question);
            }
          }}
          rows={3}
          placeholder="e.g. How do I reset my password?"
          aria-describedby="question-hint"
          className="field"
        />
        <p id="question-hint" className="text-sm text-muted-foreground">
          Don't include passwords, recovery codes, or student records.
        </p>
        <div>
          <Button type="submit" size="lg" disabled={!question.trim()}>
            Ask
          </Button>
        </div>
      </form>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="Example questions">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            className="chip"
            onClick={() => {
              setQuestion(s);
              ask(s);
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-6">
        {result && result.status !== "empty" && (
          <div className="answer">
            <p className="text-sm text-muted-foreground">
              You asked: <span className="text-foreground">{asked}</span>
            </p>
            {result.status === "answered" && (
              <>
                <p className="mt-3 leading-relaxed">{result.entry.answer}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Source: approved guide — {result.entry.title}
                </p>
              </>
            )}
            {result.status === "referred" && (
              <p className="mt-3 leading-relaxed">
                The approved guide doesn't cover this, so I can't answer it. Please contact the IT
                Service Desk and a staff member will help you.
              </p>
            )}
            {result.status === "sensitive" && (
              <p className="mt-3 leading-relaxed">
                Your question looks like it contains a password, code, or private record. Please
                remove it and ask again — no one at CampusConnect needs it.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
