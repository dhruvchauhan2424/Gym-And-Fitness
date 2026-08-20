import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { CrossLink } from "@/components/apex/Sections";
import { PageHeader } from "@/components/apex/PageHeader";
import { ensureGsap } from "@/lib/gsap";
import { facilities } from "@/data/site";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities — Apex Fitness London" },
      {
        name: "description",
        content:
          "Tour the Apex Fitness facility: 24 calibrated platforms, a black-box striking studio, a full recovery wing and an on-site performance lab.",
      },
      { property: "og:title", content: "Facilities — Apex Fitness London" },
      {
        property: "og:description",
        content:
          "Iron floor, black-box studio, recovery wing and performance lab across 1,400 square metres.",
      },
    ],
  }),
  component: FacilitiesPage,
});

/** GSAP-driven horizontal scroll gallery, pinned on desktop. */
export function FacilityScroller() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;

    const { gsap } = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const distance = () => tr.scrollWidth - window.innerWidth;
      gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={section} className="relative isolate overflow-hidden md:h-screen">
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:h-full md:w-max md:snap-none md:items-center md:overflow-hidden md:px-16 md:pb-0"
      >
        {facilities.map((f, i) => (
          <figure
            key={f.name}
            className="group relative min-w-[84vw] snap-start overflow-hidden bg-surface md:min-w-[46vw] md:max-w-[46vw]"
          >
            <div className="aspect-4/5 overflow-hidden md:aspect-16/10">
              <img
                src={f.image}
                alt={f.name}
                width={1200}
                height={900}
                loading="lazy"
                className="size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-8 md:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <p className="eyebrow">
                  {String(i + 1).padStart(2, "0")} — {f.meta}
                </p>
              </div>
              <h2 className="display-md mt-3 text-foreground">{f.name}</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {f.copy}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function FacilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="1,400 m² — Shoreditch"
        title="A building designed around the work"
        intro="Four rooms, each built for one job and nothing else. No multi-purpose compromises, no equipment chosen because it photographs well."
      />

      <FacilityScroller />

      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-36">
        <CrossLink to="/membership" label="Next" title="Access & membership" />
        <CrossLink to="/contact" label="Next" title="Book a tour" />
      </section>
    </>
  );
}
