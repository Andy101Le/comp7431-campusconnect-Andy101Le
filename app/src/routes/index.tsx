import { createFileRoute } from "@tanstack/react-router";
import { TextHelp } from "@/components/campus/TextHelp";
import { VoiceCard } from "@/components/campus/VoiceCard";
import { VideoCard } from "@/components/campus/VideoCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusConnect Multimodal Help" },
      {
        name: "description",
        content: "Get approved campus IT help by text, voice, or a short orientation video.",
      },
      { property: "og:title", content: "CampusConnect Multimodal Help" },
      {
        property: "og:description",
        content: "Get approved campus IT help by text, voice, or a short orientation video.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <header>
        <p className="eyebrow">Campus IT help</p>
        <h1 className="display mt-2">CampusConnect Multimodal Help</h1>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">
          Password resets, secure Wi-Fi, and the IT Service Desk — ask in the way that works for
          you.
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-6">
        <TextHelp />
        <VoiceCard />
        <VideoCard />
        <aside className="fallback" role="note">
          If voice or video is unavailable, type your question. Unsupported questions are referred
          to a human.
        </aside>
      </div>
    </main>
  );
}
