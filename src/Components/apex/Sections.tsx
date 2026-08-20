import { Link } from "@tanstack/react-router";

import { CountUp } from "./CountUp";
import { MagneticLink } from "./MagneticButton";
import { Reveal, SplitText } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { stats, testimonials, tiers } from "@/data/site";
import { cn } from "@/lib/utils";

export function StatsBand() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px bg-border md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            className="bg-background px-6 py-14 md:px-10 md:py-20"
            delay={i * 0.08}
          >
            <p className="font-stats text-5xl text-foreground md:text-7xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground font-nav">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function MembershipGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden bg-border lg:grid-cols-3",
        compact && "",
      )}
    >
      {tiers.map((tier, i) => (
        <Reveal key={tier.name} delay={i * 0.1} className="bg-transparent">
          <TiltCard max={5}>
            <div
              className={cn(
                "flex h-full flex-col bg-background p-8 md:p-10",
                tier.featured && "bg-card ring-1 ring-primary/40",
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="display-md text-foreground">{tier.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tier.tagline}
                  </p>
                </div>
                {tier.featured && (
                  <span className="border border-primary/50 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-primary">
                    Most chosen
                  </span>
                )}
              </div>

              <p className="mt-10 font-stats text-6xl text-foreground md:text-7xl">
                <span className="align-super text-2xl text-muted-foreground">
                  £
                </span>
                {tier.price}
                <span className="ml-2 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  / month
                </span>
              </p>

              <ul className="mt-10 flex-1 space-y-3.5 border-t border-border pt-8">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span
                      className={cn(
                        "mt-2 size-1 shrink-0",
                        tier.featured ? "bg-primary" : "bg-foreground/40",
                      )}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <MagneticLink
                  to="/contact"
                  variant={tier.featured ? "solid" : "outline"}
                >
                  Join {tier.name}
                </MagneticLink>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="overflow-hidden border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <p className="eyebrow">Member voices</p>
        <SplitText
          text="Said on the floor"
          className="display-lg mt-5 text-foreground"
        />
      </div>

      <div
        className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden"
        data-cursor-hover
      >
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="glass-panel flex min-w-[85vw] snap-start flex-col justify-between p-8 md:min-w-[42vw] md:p-12 lg:min-w-[32vw]"
          >
            <blockquote className="text-lg leading-relaxed text-foreground md:text-xl">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-10 border-t border-border pt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                {t.name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t.role}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mx-auto mt-4 max-w-[1600px] px-6 text-xs uppercase tracking-[0.2em] text-muted-foreground md:px-10">
        Drag to read more
      </p>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="grain relative overflow-hidden border-t border-border py-32 md:py-52">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: "oklch(0.75 0.22 100)" }}
      />
      <div className="relative mx-auto max-w-[1600px] overflow-hidden px-6 text-center md:px-10">
        <p className="eyebrow">The last easy decision you'll make</p>
        <SplitText
          text="Ready to become unstoppable?"
          className="display-xl mt-8 justify-center text-center text-foreground"
        />
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <MagneticLink to="/membership">Start training</MagneticLink>
          <MagneticLink to="/contact" variant="outline">
            Book a tour
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}

export function CrossLink({
  to,
  label,
  title,
}: {
  to: string;
  label: string;
  title: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-end justify-between gap-6 border-t border-border py-10 transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface"
    >
      <div>
        <p className="eyebrow">{label}</p>
        <p className="display-md mt-3 text-foreground transition-colors duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-primary">
          {title}
        </p>
      </div>
      <span className="font-display text-3xl text-muted-foreground transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-primary">
        →
      </span>
    </Link>
  );
}
