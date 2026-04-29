import { HeroParallax } from "@/components/HeroParallax";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  image: string;
};

export function PageHero({ title, eyebrow, description, image }: PageHeroProps) {
  return (
    <HeroParallax
      image={image}
      alt=""
      overlayClassName="bg-[linear-gradient(90deg,rgba(10,10,10,0.86),rgba(10,10,10,0.48),rgba(10,10,10,0.32))]"
      className="min-h-[420px] pt-28"
    >
      <div className="mx-auto flex min-h-[320px] max-w-7xl items-end px-4 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-amber-300">{eyebrow}</p>
          ) : null}
          <h1 className="text-4xl font-black tracking-normal sm:text-6xl">{title}</h1>
          {description ? <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-100">{description}</p> : null}
        </div>
      </div>
    </HeroParallax>
  );
}
