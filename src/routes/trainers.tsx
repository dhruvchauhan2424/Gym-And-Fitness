import { createFileRoute } from "@tanstack/react-router";

import { CrossLink } from "@/components/apex/Sections";
import { PageHeader } from "@/components/apex/PageHeader";
import { Reveal } from "@/components/apex/Reveal";
import { TiltCard } from "@/components/apex/TiltCard";
import { trainers } from "@/data/site";

export const Route = createFileRoute("/trainers")({
  head: () => ({
    meta: [
      { title: "Coaches — Apex Fitness London" },
      {
        name: "description",
        content:
          "Meet the Apex Fitness coaching team: strength, conditioning and combat specialists with national-level competitive backgrounds.",
      },
      { property: "og:title", content: "Coaches — Apex Fitness London" },
      {
        property: "og:description",
        content:
          "Strength, conditioning and combat specialists on the floor every hour we are open.",
      },
    ],
  }),
  component: TrainersPage,
});

function TrainersPage() {
  return (
    <>
      <PageHeader
        eyebrow="The coaching floor"
        title="Coaches who watch the bar"
        intro="Seventeen coaches, three disciplines, one standard. Every member is assigned a lead coach who owns their programme from testing through to retest."
      />

      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-px overflow-hidden bg-border lg:grid-cols-3">
          {trainers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className="bg-transparent">
              <TiltCard>
                <article className="group relative h-full bg-background">
                  <div className="relative aspect-3/4 overflow-hidden">
                    <img
                      src={t.image}
                      alt={`${t.name}, ${t.role} at Apex Fitness`}
                      width={900}
                      height={1200}
                      loading="lazy"
                      className="size-full object-cover grayscale transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <span className="absolute right-5 top-5 border border-border bg-background/60 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                      {t.stat}
                    </span>
                  </div>
                  <div className="p-8">
                    <p className="eyebrow">{t.role}</p>
                    <h2 className="display-md mt-3 text-foreground">
                      {t.name}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {t.bio}
                    </p>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24 max-w-2xl text-center">
          <h2 className="display-md text-foreground">
            Plus fourteen more on rotation
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Physiotherapists, sports nutritionists, mobility specialists and a
            resident massage team. Every one of them reads the same member file,
            so nobody has to repeat their history twice.
          </p>
        </Reveal>

        <div className="mt-24">
          <CrossLink to="/programs" label="Next" title="See the programmes" />
          <CrossLink to="/contact" label="Next" title="Book a consultation" />
        </div>
      </section>
    </>
  );
}
