import { useEffect, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("apex-preloaded") === "1") {
      setGone(true);
      return;
    }
    document.body.style.overflow = "hidden";

    const state = { v: 0 };
    const tl = gsap.timeline();
    tl.to(state, {
      v: 100,
      duration: 1.9,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(state.v)),
    })
      .to(
        ".apex-pre-word",
        { yPercent: -110, duration: 0.7, ease: "power4.inOut", stagger: 0.05 },
        "-=0.25",
      )
      .to(root.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          sessionStorage.setItem("apex-preloaded", "1");
          document.body.style.overflow = "";
          setGone(true);
        },
      });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="grain fixed inset-0 z-[200] flex flex-col justify-between bg-background px-6 py-8 md:px-12"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="overflow-hidden">
        <p className="apex-pre-word eyebrow">Apex Fitness — Est. 2011</p>
      </div>

      <div className="overflow-hidden">
        <h2 className="apex-pre-word display-lg text-foreground">
          Forge<span className="text-primary">.</span>
        </h2>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="h-px flex-1 bg-border">
          <div
            className="h-px bg-primary transition-none"
            style={{ width: `${count}%` }}
          />
        </div>
        <span className="font-display text-4xl tabular-nums text-foreground md:text-6xl">
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
