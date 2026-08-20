import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CrossLink } from "@/components/apex/Sections";
import { MagneticLink } from "@/components/apex/MagneticButton";
import { PageHeader } from "@/components/apex/PageHeader";
import { Reveal } from "@/components/apex/Reveal";
import { programs } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      {
        title: "Training Programs — Apex Fitness",
      },

      {
        name: "description",
        content:
          "Hypertrophy, Engine, Combat and Restore: four periodised Apex Fitness programmes built from lab data and coached on the floor.",
      },

      {
        property: "og:title",
        content: "Training Programs — Apex Fitness",
      },

      {
        property: "og:description",
        content:
          "Four periodised programmes: strength, conditioning, combat and recovery.",
      },
    ],
  }),

  component: ProgramsPage,
});

export function ProgramList() {
  const [open, setOpen] = useState<string>(programs[0]?.id ?? "");

  return (
    <div className="border-t border-border">
      {programs.map((p) => {
        const isOpen = open === p.id;

        return (
          <Reveal key={p.id}>
            <article className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? "" : p.id)}
                aria-expanded={isOpen}
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-5
                  py-6
                  text-left
                  md:gap-8
                  md:py-7
                "
              >
                {/* Number */}
                <span
                  className="
                    shrink-0
                    font-[Manrope]
                    text-[11px]
                    font-medium
                    tracking-[0.08em]
                    text-primary
                  "
                >
                  {p.id}
                </span>

                {/* Program name */}
                <span
                  className={cn(
                    `
                      flex-1
                      font-[Manrope]
                      text-[28px]
                      font-medium
                      leading-[1.1]
                      tracking-[-0.035em]
                      transition-colors
                      duration-500
                      md:text-[32px]
                    `,
                    isOpen
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {p.title}
                </span>

                {/* Tag */}
                <span
                  className="
                    hidden
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.16em]
                    text-muted-foreground
                    md:block
                  "
                >
                  {p.tag}
                </span>

                {/* Plus */}
                <span
                  className={cn(
                    `
                      shrink-0
                      font-[Manrope]
                      text-xl
                      font-light
                      leading-none
                      text-primary
                      transition-transform
                      duration-500
                    `,
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>

              {/* Expandable content */}
              <div
                className="
                  grid
                  transition-[grid-template-rows]
                  duration-700
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                "
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                }}
              >
                <div className="overflow-hidden">
                  <div
                    className="
                      grid
                      gap-8
                      pb-10
                      md:grid-cols-2
                      md:gap-10
                      md:pb-12
                    "
                  >
                    {/* Image */}
                    <div
                      className="
                        group/img
                        relative
                        aspect-4/3
                        overflow-hidden
                        bg-surface
                        md:aspect-16/11
                      "
                    >
                      <img
                        src={p.image}
                        alt={`${p.title} training at Apex Fitness`}
                        width={1200}
                        height={1500}
                        loading="lazy"
                        className="
                          size-full
                          object-cover
                          transition-transform
                          duration-[1200ms]
                          ease-[cubic-bezier(0.16,1,0.3,1)]
                          group-hover/img:scale-105
                        "
                      />
                    </div>

                    {/* Details */}
                    <div
                      className="
                        flex
                        flex-col
                        justify-between
                        gap-7
                      "
                    >
                      {/* Description */}
                      <p
                        className="
                          max-w-md
                          text-[14px]
                          leading-[1.8]
                          text-muted-foreground
                          md:text-[15px]
                        "
                      >
                        {p.copy}
                      </p>

                      {/* Duration / Frequency */}
                      <dl
                        className="
                          grid
                          grid-cols-2
                          gap-px
                          bg-border
                        "
                      >
                        <div
                          className="
                            bg-background
                            py-4
                            pr-4
                          "
                        >
                          <dt
                            className="
                              text-[10px]
                              font-medium
                              uppercase
                              tracking-[0.16em]
                              text-muted-foreground
                            "
                          >
                            Duration
                          </dt>

                          <dd
                            className="
                              mt-2
                              text-[13px]
                              text-foreground
                            "
                          >
                            {p.duration}
                          </dd>
                        </div>

                        <div
                          className="
                            bg-background
                            py-4
                            pl-4
                          "
                        >
                          <dt
                            className="
                              text-[10px]
                              font-medium
                              uppercase
                              tracking-[0.16em]
                              text-muted-foreground
                            "
                          >
                            Frequency
                          </dt>

                          <dd
                            className="
                              mt-2
                              text-[13px]
                              text-foreground
                            "
                          >
                            {p.sessions}
                          </dd>
                        </div>
                      </dl>

                      {/* Includes */}
                      <ul className="space-y-2.5">
                        {p.includes.map((item) => (
                          <li
                            key={item}
                            className="
                              flex
                              gap-3
                              text-[13px]
                              leading-relaxed
                              text-muted-foreground
                            "
                          >
                            <span
                              className="
                                mt-[7px]
                                size-1
                                shrink-0
                                bg-primary
                              "
                            />

                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div>
                        <MagneticLink to="/contact" variant="outline">
                          Enquire
                        </MagneticLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Four disciplines"
        title="Programmes written from your numbers"
        intro="Every Apex programme begins in the lab and ends with a retest. Between those two points sits twelve weeks of prescription that adjusts to what your body actually did last week."
      />

      <section
        className="
          mx-auto
          max-w-[1600px]
          px-6
          pb-24
          md:px-10
          md:pb-32
        "
      >
        <ProgramList />

        <div className="mt-20 md:mt-24">
          <CrossLink to="/trainers" label="Next" title="Meet your coach" />

          <CrossLink to="/membership" label="Next" title="Membership tiers" />
        </div>
      </section>
    </>
  );
}
