import { SplitText } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="mx-auto max-w-[1600px] overflow-hidden px-6 pb-16 pt-40 md:px-10 md:pb-24 md:pt-56">
      <p className="eyebrow">{eyebrow}</p>
      <SplitText text={title} className="display-xl mt-6 text-foreground" />
      <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
        {intro}
      </p>
    </header>
  );
}
