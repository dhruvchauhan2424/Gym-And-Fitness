import { useEffect, useRef, type ReactNode } from "react";

import { ensureGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Fade + rise on scroll. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          delay,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={cn("will-change-[opacity,transform]", className)}>
      {children}
    </div>
  );
}

/** Word-by-word masked reveal for headlines. */
export function SplitText({
  text,
  className,
  lineClassName,
}: {
  text: string;
  className?: string;
  lineClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      const words = el.querySelectorAll("[data-word]");
      gsap.set(words, { yPercent: 120, autoAlpha: 0 });
      gsap.to(words, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.05,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [text]);

  return (
    <div
      ref={ref}
      className={cn("flex max-w-full flex-wrap overflow-hidden", className)}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={cn(
            "overflow-hidden pb-[0.06em] pr-[0.22em]",
            lineClassName,
          )}
        >
          <span
            data-word
            className="inline-block opacity-0 will-change-[opacity,transform]"
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Clip-path image reveal with subtle parallax. */
export function ClipImage({
  src,
  alt,
  className,
  imgClassName,
  parallax = 12,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  parallax?: number;
  width?: number;
  height?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    const img = el.querySelector("img");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
      if (img && parallax) {
        gsap.fromTo(
          img,
          { yPercent: -parallax / 2 },
          {
            yPercent: parallax / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }
    }, el);
    return () => ctx.revert();
  }, [parallax]);

  return (
    <div
      ref={wrap}
      className={cn("relative overflow-hidden bg-surface", className)}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={cn("size-full scale-110 object-cover", imgClassName)}
      />
    </div>
  );
}
