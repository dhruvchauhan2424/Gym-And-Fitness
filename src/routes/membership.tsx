import { createFileRoute } from "@tanstack/react-router";

import {
  CrossLink,
  MembershipGrid,
  Testimonials,
} from "@/components/apex/Sections";
import { PageHeader } from "@/components/apex/PageHeader";
import { Reveal } from "@/components/apex/Reveal";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership — Basic, Pro & Elite | Apex Fitness" },
      {
        name: "description",
        content:
          "Three Apex Fitness memberships from £89 a month: open floor access, coached progression, or fully private programming with lab diagnostics.",
      },
      {
        property: "og:title",
        content: "Membership — Basic, Pro & Elite | Apex Fitness",
      },
      {
        property: "og:description",
        content:
          "Open floor, coached progression or private programming. Three tiers, no contracts.",
      },
    ],
  }),
  component: MembershipPage,
});

const faqs = [
  {
    q: "Is there a joining fee?",
    a: "No. Your first month covers onboarding, baseline testing and your initial programme build.",
  },
  {
    q: "Can I pause?",
    a: "Any membership can be paused twice a year for up to eight weeks, at no cost.",
  },
  {
    q: "Is there a contract?",
    a: "Monthly rolling. Thirty days' notice, given by email, is the whole process.",
  },
  {
    q: "Can I bring a guest?",
    a: "Pro and Elite members receive two guest passes per month.",
  },
];

function MembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Three tiers"
        title="Choose how closely you want to be coached"
        intro="Every membership includes full facility access and app-based programming. What changes is how much of a coach's week belongs to you."
      />

      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10 md:pb-32">
        <MembershipGrid />
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10 md:pb-32">
        <p className="eyebrow">Details</p>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-2">
          {faqs.map((f) => (
            <Reveal key={f.q} className="bg-background p-8 md:p-10">
              <h2 className="text-lg font-semibold uppercase tracking-[0.06em] text-foreground">
                {f.q}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <CrossLink to="/contact" label="Next" title="Book your tour" />
      </section>
    </>
  );
}
