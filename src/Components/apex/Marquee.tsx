import { cn } from "@/lib/utils";

export function Marquee({
  items,
  speed = 34,
  className,
  reverse = false,
}: {
  items: string[];
  speed?: number;
  className?: string;
  reverse?: boolean;
}) {
  const row = [...items, ...items, ...items, ...items];

  return (
    <div className={cn("relative w-full overflow-hidden py-6", className)}>
      <div
        className="flex w-max will-change-transform"
        style={{
          animation: `marquee-x ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span className="display-md whitespace-nowrap px-8 text-foreground">
                  {item}
                </span>
                <span className="size-1.5 rotate-45 bg-primary" aria-hidden />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
