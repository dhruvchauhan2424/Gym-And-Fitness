import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled || open
            ? "border-b border-border bg-background/80 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-6",
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-10">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display text-xl tracking-tight text-foreground md:text-2xl">
              APEX
            </span>
            <span className="font-display text-xl tracking-tight text-primary md:text-2xl">
              FITNESS
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks
              .filter((l) => l.to !== "/" && l.to !== "/contact")
              .map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="group relative text-[clamp(0.75rem, 0.9vw, 0.875rem)] font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-foreground font-nav"
                  activeProps={{ className: "!text-foreground" }}
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-primary transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden bg-primary px-6 py-3 text-[clamp(0.75rem, 0.9vw, 0.875rem)] font-semibold uppercase tracking-[0.08em] text-primary-foreground transition-colors duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] lg:inline-block font-nav"
            >
              Book a tour
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex size-11 flex-col items-center justify-center gap-1.5 border border-border lg:hidden"
            >
              <span
                className={cn(
                  "h-px w-5 bg-foreground transition-transform",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-5 bg-foreground transition-transform",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[85] bg-background transition-[clip-path] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        style={{ clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
      >
        <nav className="flex h-full flex-col justify-center gap-1 px-6">
          {navLinks.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className="display-md py-1 text-muted-foreground transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-primary"
              activeProps={{ className: "!text-foreground" }}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
