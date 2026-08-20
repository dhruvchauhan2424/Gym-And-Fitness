import { Link } from "@tanstack/react-router";

import { navLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background font-sans">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl text-foreground">
              APEX<span className="text-primary">FITNESS</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A private performance facility for people who treat training as a
              discipline, not a hobby.
            </p>
          </div>

          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Visit</p>
            <address className="mt-5 space-y-2.5 text-sm not-italic text-muted-foreground">
              <p>18 Foundry Lane</p>
              <p>Shoreditch, London E2</p>
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
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} Apex Fitness
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Forge your limits
          </p>
        </div>
      </div>
    </footer>
  );
}
