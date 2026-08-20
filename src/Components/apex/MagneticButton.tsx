import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

import { useDesktop } from "@/hooks/use-desktop";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden px-6 py-3 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-500 font-[Manrope]";

const variants: Record<Variant, string> = {
  solid: "bg-primary text-primary-foreground hover:text-primary-foreground",
  outline: "border border-border text-foreground hover:text-primary-foreground",
  ghost: "text-foreground hover:text-primary",
};

const fills: Record<Variant, string> = {
  solid: "bg-foreground",
  outline: "bg-primary",
  ghost: "bg-transparent",
};

function useMagnet(strength = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useDesktop();

  useEffect(() => {
    const el = ref.current;

    if (!el || !isDesktop) return;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();

      const x = (e.clientX - (r.left + r.width / 2)) * strength;

      const y = (e.clientY - (r.top + r.height / 2)) * strength;

      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const reset = () => {
      el.style.transform = "translate3d(0,0,0)";
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);

    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [isDesktop, strength]);

  return ref;
}

function Inner({
  children,
  variant,
}: {
  children: ReactNode;
  variant: Variant;
}) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0",
          "transition-transform duration-500",
          "ease-[cubic-bezier(0.16,1,0.3,1)]",
          "group-hover:scale-y-100",
          fills[variant],
        )}
      />

      <span
        className="
          relative z-10
          transition-colors duration-500
          ease-[cubic-bezier(0.16,1,0.3,1)]
        "
      >
        {children}
      </span>

      <span
        aria-hidden
        className="
          relative z-10
          inline-block
          text-xs
          transition-transform duration-500
          ease-[cubic-bezier(0.16,1,0.3,1)]
          group-hover:translate-x-1
        "
      >
        →
      </span>
    </>
  );
}

export function MagneticLink({
  to,
  children,
  variant = "solid",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const ref = useMagnet();

  return (
    <div
      ref={ref}
      className="
        inline-block
        p-3
        -m-3
        transition-transform duration-500
        ease-[cubic-bezier(0.16,1,0.3,1)]
        will-change-transform
      "
    >
      <Link to={to} className={cn(base, variants[variant], className)}>
        <Inner variant={variant}>{children}</Inner>
      </Link>
    </div>
  );
}

export function MagneticButton({
  children,
  variant = "solid",
  className,
  type = "button",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
}) {
  const ref = useMagnet();

  return (
    <div
      ref={ref}
      className="
        inline-block
        p-3
        -m-3
        transition-transform duration-500
        ease-[cubic-bezier(0.16,1,0.3,1)]
        will-change-transform
      "
    >
      <button type={type} className={cn(base, variants[variant], className)}>
        <Inner variant={variant}>{children}</Inner>
      </button>
    </div>
  );
}
