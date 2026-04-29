type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-amber-600">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-black tracking-normal text-neutral-950 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-neutral-600">{description}</p> : null}
    </div>
  );
}
