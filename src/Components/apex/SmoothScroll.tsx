import Lenis from "lenis";
import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

import { ensureGsap } from "@/lib/gsap";

let lenisRef: Lenis | null = null;

export function scrollToTop(immediate = true) {
  lenisRef?.scrollTo(0, { immediate });
}

export function SmoothScroll() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      window.clearTimeout(refreshId);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef = null;
    };
  }, []);

  useEffect(() => {
    lenisRef?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const { ScrollTrigger } = ensureGsap();
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 260);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
