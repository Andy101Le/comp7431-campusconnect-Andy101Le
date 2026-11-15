import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VIDEO_TRANSCRIPT } from "@/lib/campus-guide";
import { focusTextQuestion } from "./TextHelp";

const EMBED_URL = "https://app.heygen.com/embeds/e9a5f8172987472da7316899212d14a6";

export function VideoCard() {
  const [loaded, setLoaded] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  const openTranscript = () => {
    setTranscriptOpen(true);
    requestAnimationFrame(() => {
      const el = document.getElementById("video-transcript");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      el?.focus({ preventScroll: true });
    });
  };

  return (
    <section aria-labelledby="video-title" className="panel">
      <h2 id="video-title" className="section-title">
        Watch the orientation
      </h2>
      <p className="mt-2 text-muted-foreground">A one-minute introduction to CampusConnect.</p>

      <div className="video-frame mt-5">
        {loaded ? (
          <iframe
            src={EMBED_URL}
            title="CampusConnect orientation video (AI-generated presenter)"
            allow="encrypted-media; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button type="button" className="video-poster" onClick={() => setLoaded(true)}>
            <span className="play-badge" aria-hidden="true">
              ▶
            </span>
            <span className="font-semibold">Load orientation video</span>
            <span className="text-sm opacity-80">Video won't play until you press play.</span>
          </button>
        )}
      </div>
      <p className="disclaimer mt-3">AI-generated presenter — not a live staff member.</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button variant="outline" size="lg" onClick={focusTextQuestion}>
          Use text instead
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={openTranscript}
          aria-controls="video-transcript"
          aria-expanded={transcriptOpen}
        >
          Read video transcript
        </Button>
      </div>

      {transcriptOpen && (
        <div id="video-transcript" tabIndex={-1} className="answer mt-5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold">Video transcript</h3>
            <Button variant="ghost" size="sm" onClick={() => setTranscriptOpen(false)}>
              Hide
            </Button>
          </div>
          {VIDEO_TRANSCRIPT.map((line) => (
            <p key={line.time} className="mt-3 leading-relaxed">
              <span className="mr-2 font-mono text-sm text-muted-foreground">{line.time}</span>
              {line.text}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
