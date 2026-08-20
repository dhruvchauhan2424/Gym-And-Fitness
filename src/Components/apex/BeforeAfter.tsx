import { useCallback, useRef, useState } from "react";

export function BeforeAfter({
  before,
  after,
  beforeLabel = "Week 01",
  afterLabel = "Week 24",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={wrap}
      className="relative aspect-4/5 w-full select-none overflow-hidden bg-surface sm:aspect-16/10 touch-none"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img
        src={after}
        alt="After the Apex transformation programme"
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt="Before the Apex transformation programme"
          loading="lazy"
          className="absolute inset-0 size-full object-cover grayscale"
        />
      </div>

      <span className="eyebrow absolute bottom-5 left-5 z-20 text-foreground/80">
        {beforeLabel}
      </span>
      <span className="eyebrow absolute bottom-5 right-5 z-20 text-primary">
        {afterLabel}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-px bg-primary"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-background/60 text-primary backdrop-blur-md">
          ⇄
        </span>
      </div>

      <label className="sr-only" htmlFor="ba-range">
        Transformation comparison position
      </label>
      <input
        id="ba-range"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute bottom-0 left-0 z-30 h-10 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
