import { useEffect, useRef, useState } from "react";

import { ensureGsap } from "@/lib/gsap";

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    const state = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(state, {
        v: to,
        duration: 2.2,
        ease: "power3.out",
        onUpdate: () => setValue(state.v),
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });
    return () => ctx.revert();
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
