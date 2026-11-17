import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { focusTextQuestion } from "./TextHelp";

// Public agent ID from the ElevenLabs embed code (not a secret).
const AGENT_ID = "agent_6001m6chc3ktf4prsjv720py0ffj";
const WIDGET_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed";

export function VoiceCard() {
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  // Load the widget only after the user opts in, so nothing plays or connects on page load.
  useEffect(() => {
    if (!enabled || !hostRef.current) return;
    const host = hostRef.current;
    const widget = document.createElement("elevenlabs-convai");
    widget.setAttribute("agent-id", AGENT_ID);
    host.appendChild(widget);

    if (!document.querySelector(`script[src="${WIDGET_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = WIDGET_SRC;
      script.async = true;
      script.type = "text/javascript";
      script.onerror = () => setFailed(true);
      document.body.appendChild(script);
    }
    return () => {
      widget.remove();
    };
  }, [enabled]);

  return (
    <section aria-labelledby="voice-title" className="panel">
      <h2 id="voice-title" className="section-title">
        Ask by voice
      </h2>
      <p className="mt-2 text-muted-foreground">
        Talk to the CampusConnect voice assistant. It uses your microphone only after you start a
        call.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!enabled ? (
          <Button size="lg" onClick={() => setEnabled(true)}>
            Turn on voice assistant
          </Button>
        ) : (
          <p className="text-sm" role="status">
            {failed
              ? "The voice assistant couldn't load. Please type your question instead."
              : "Voice assistant is ready — press “Start a call” in the bottom-right corner."}
          </p>
        )}
        <Button variant="outline" size="lg" onClick={focusTextQuestion}>
          Use text instead
        </Button>
      </div>

      <div ref={hostRef} className="voice-host mt-4" />
    </section>
  );
}
