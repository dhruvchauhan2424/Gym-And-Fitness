import { useRef, type ReactNode } from "react";

import { useDesktop } from "@/hooks/use-desktop";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useDesktop();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;

    if (!el || !isDesktop) return;

    const r = el.getBoundingClientRect();

    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;

    el.style.transform = `
      perspective(1200px)
      rotateX(${-py * max}deg)
      rotateY(${px * max}deg)
      translateZ(4px)
    `;

    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };

  const reset = () => {
    const el = ref.current;

    if (!el) return;

    el.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0)
    `;
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "group/tilt relative overflow-hidden",
        "transition-transform duration-700",
        "ease-[cubic-bezier(0.16,1,0.3,1)]",
        "will-change-transform",
        className,
      )}
    >
      {children}

      <span
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          opacity-0
          transition-opacity duration-700
          ease-[cubic-bezier(0.16,1,0.3,1)]
          group-hover/tilt:opacity-100
        "
        style={{
          background:
            "radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), oklch(0.75 0.22 100 / 0.10), transparent 65%)",
        }}
      />
    </div>
  );
}
