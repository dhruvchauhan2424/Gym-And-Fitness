import { createFileRoute } from "@tanstack/react-router";

import { CrossLink, StatsBand } from "@/components/apex/Sections";
import { ClipImage, Reveal, SplitText } from "@/components/apex/Reveal";
import { PageHeader } from "@/components/apex/PageHeader";
import { images } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Apex Fitness — A Private Performance Facility" },
      {
        name: "description",
        content:
          "Founded in 2011, Apex Fitness is a members-only strength and performance facility in London built on measurement, coaching and discipline.",
      },
      {
        property: "og:title",
        content: "About Apex Fitness — A Private Performance Facility",
      },
      {
        property: "og:description",
        content:
          "Measurement over motivation. The philosophy behind London's most serious training floor.",
      },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    n: "01",
    title: "Measure first",
    copy: "No programme starts without data. Force plates, lactate, DEXA. Opinions are cheap; numbers are not.",
  },
  {
    n: "02",
    title: "Coach the room",
    copy: "A coach is on the floor at every hour we are open. Not selling, not filming. Watching bar paths.",
  },
  {
    n: "03",
    title: "Respect recovery",
    copy: "Training is the stimulus, recovery is the adaptation. We built half our square footage around the second half.",
  },
  {
    n: "04",
    title: "Keep it quiet",
    copy: "No cameras, no leaderboards, no branded shouting. The work is loud enough on its own.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Est. 2011 — London"
        title="Built for the ones who keep showing up"
        intro="Apex began as a single platform in a Shoreditch railway arch. Fifteen years later it is a 1,400 square metre performance facility with a laboratory attached — and the same rule as day one: earn the load."
      />

      <section className="mx-auto max-w-[1600px] px-6 py-24 text-center md:px-10 md:py-36">
        <div className="flex flex-col items-center">
          <SplitText
            text="We are not in the motivation business"
            className="display-lg text-foreground justify-center"
          />
          <div className="mt-8 max-w-2xl space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Motivation is weather. It arrives, it leaves, and building
              anything on it is a mistake. What we sell is structure: a
              prescription written from your numbers, a coach who knows what
              week you are in, and a room that makes turning up the path of
              least resistance.
            </p>
            <p>
              Our members are surgeons, bricklayers, national-level athletes and
              people who could not do a press-up eighteen months ago. What they
              share is a willingness to be told the truth about their training.
            </p>
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-36">
        <p className="eyebrow">Four principles</p>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
          {principles.map((p) => (
            <Reveal key={p.n} className="bg-background p-8 md:p-12">
              <p className="font-display text-sm text-primary">{p.n}</p>
              <h2 className="display-md mt-5 text-foreground">{p.title}</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {p.copy}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10 md:pb-36">
        <CrossLink to="/trainers" label="Next" title="Meet the coaches" />
        <CrossLink to="/membership" label="Next" title="Choose a membership" />
      </section>
    </>
  );
}
