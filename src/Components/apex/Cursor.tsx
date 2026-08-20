import { useEffect, useRef } from "react";

import { useDesktop } from "@/hooks/use-desktop";

export function Cursor() {
  const isDesktop = useDesktop();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDesktop) return;
    document.documentElement.classList.add("no-cursor");

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let tx = rx;
    let ty = ry;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const el = e.target as HTMLElement | null;
      targetScale = el?.closest("a,button,[data-cursor-hover]") ? 2.1 : 1;
    };

    const loop = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      scale += (targetScale - scale) * 0.14;
      if (dot.current)
        dot.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("no-cursor");
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden lg:block">
      <div
        ref={ring}
        className="absolute size-9 rounded-full border border-primary/70 mix-blend-difference"
      />
      <div ref={dot} className="absolute size-1.5 rounded-full bg-primary" />
    </div>
  );
}
