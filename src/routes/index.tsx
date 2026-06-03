import { createFileRoute } from "@tanstack/react-router";
import Section from "~/components/layouts/Section";
import Logo from "~/components/brand/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Genius Brand Kit" },
      {
        name: "description",
        content:
          "A Lovable-ready starter template with Genius Sports' brand foundations built in.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <Section
      background={{ background_color: "navy" }}
      padding_top="huge"
      padding_bottom="huge"
      has_container
      inner_spacing="medium"
    >
      <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <Logo variant="vertical" color="white" className="h-28 w-auto mb-12" />
        <h1 className="text-h1 text-white mb-6">Genius Brand Kit</h1>
        <p className="font-body text-[18px] text-white/70 max-w-xl mb-16">
          A Lovable-ready starter template with Genius Sports' brand foundations built in.
        </p>
        <p className="font-body text-[14px] text-white/40">
          Start building — every component, token, and font is ready to use.
        </p>
      </div>
    </Section>
  );
}
