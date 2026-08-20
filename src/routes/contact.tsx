import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { MagneticButton } from "@/components/apex/MagneticButton";
import { PageHeader } from "@/components/apex/PageHeader";
import { Reveal } from "@/components/apex/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book a Tour — Apex Fitness London" },
      {
        name: "description",
        content:
          "Book a private tour of Apex Fitness in Shoreditch, London. Talk to a coach about programming, testing and membership.",
      },
      {
        property: "og:title",
        content: "Contact & Book a Tour — Apex Fitness London",
      },
      {
        property: "og:description",
        content:
          "Book a private tour of our Shoreditch facility and talk to a coach.",
      },
    ],
  }),
  component: ContactPage,
});

const fieldClass =
  "w-full border-b border-border bg-transparent py-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary";

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Shoreditch, London"
        title="Come and see the floor"
        intro="Tours run every weekday at 07:00, 12:30 and 18:00. You will meet a coach, walk the building and leave with an honest answer about whether this is the right room for you."
      />

      <section className="mx-auto grid max-w-[1600px] gap-16 px-6 pb-24 md:grid-cols-[1.2fr_1fr] md:px-10 md:pb-36">
        <Reveal>
          {sent ? (
            <div className="glass-panel p-10">
              <h2 className="display-md text-primary">Request received</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A coach will be in touch within one working day to confirm your
                tour slot.
              </p>
            </div>
          ) : (
            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="eyebrow">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="goal" className="eyebrow">
                  Primary goal
                </label>
                <select
                  id="goal"
                  name="goal"
                  className={fieldClass}
                  defaultValue="strength"
                >
                  <option value="strength">Build strength</option>
                  <option value="engine">Improve conditioning</option>
                  <option value="combat">Learn to box</option>
                  <option value="recomp">Body recomposition</option>
                  <option value="rehab">Return from injury</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="eyebrow">
                  Anything we should know
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Training history, injuries, schedule…"
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <MagneticButton type="submit">Request a tour</MagneticButton>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.1} className="space-y-10">
          <div>
            <p className="eyebrow">Address</p>
            <address className="mt-4 text-lg not-italic leading-relaxed text-foreground">
              18 Foundry Lane
              <br />
              Shoreditch, London E2
            </address>
          </div>
          <div>
            <p className="eyebrow">Direct</p>
            <div className="mt-4 space-y-2 text-lg text-foreground">
              <a
                href="mailto:train@apexfitness.com"
                className="block transition-colors hover:text-primary"
              >
                train@apexfitness.com
              </a>
              <a
                href="tel:+442071234567"
                className="block transition-colors hover:text-primary"
              >
                +44 20 7123 4567
              </a>
            </div>
          </div>
          <div>
            <p className="eyebrow">Hours</p>
            <dl className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between border-b border-border pb-2">
                <dt>Monday — Friday</dt>
                <dd className="text-foreground">05:00 — 23:00</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt>Saturday</dt>
                <dd className="text-foreground">07:00 — 20:00</dd>
              </div>
              <div className="flex justify-between">
                <dt>Sunday</dt>
                <dd className="text-foreground">08:00 — 18:00</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </section>
    </>
  );
}
