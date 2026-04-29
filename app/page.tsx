import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, Mail, Phone, Star } from "lucide-react";
import { FadeInUp } from "@/components/FadeInUp";
import { HeroParallax } from "@/components/HeroParallax";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RollText } from "@/components/RollText";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { Metadata } from "next";
import {
  company,
  contactHighlights,
  homeGallery,
  services,
  stats,
  testimonials,
  valueProps,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "KP-WELD - Výroba a montáž oceľových konštrukcií",
  description:
    "Profesionálna kovovýroba v Šamoríne. Oceľové konštrukcie, brány, ploty, schody a zámočnícke práce na mieru.",
  alternates: {
    canonical: "/",
  },
};


export default function HomePage() {
  return (
    <>
      <HeroParallax
        image="/sources/brany/steel-construction-1.jpg"
        alt="KP-WELD oceľová konštrukcia"
        className="min-h-[88svh] pt-28"
      >
        <div className="mx-auto grid min-h-[calc(88svh-7rem)] max-w-7xl items-end gap-10 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
          <FadeInUp className="max-w-4xl">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-amber-300">
              Výroba a montáž oceľových riešení
            </p>
            <h1 className="max-w-3xl text-5xl font-black tracking-normal sm:text-7xl lg:text-8xl">
              KP-WELD
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-100 sm:text-xl">
              Profesionálna kovovýroba, oceľové konštrukcie, brány, oplotenia, schody,
              zábradlia a zámočnícke práce pre Šamorín a okolie.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/referencie"
                className="group inline-flex min-h-12 items-center justify-center rounded-md bg-amber-400 px-5 text-sm font-black uppercase tracking-[0.12em] text-neutral-950 transition hover:bg-amber-300"
              >
                <RollText>
                  Projekty
                  <ArrowRight size={18} aria-hidden="true" />
                </RollText>
              </Link>
              <Link
                href="/produkty-sluzby"
                className="group inline-flex min-h-12 items-center justify-center rounded-md border border-white/35 px-5 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-neutral-950"
              >
                <RollText>
                  Služby
                  <ArrowRight size={18} aria-hidden="true" />
                </RollText>
              </Link>
            </div>
          </FadeInUp>

          <FadeInUp delay={150} className="grid gap-3 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur-md">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                <span className="text-4xl font-black text-amber-300">{stat.value}</span>
                <span className="max-w-40 text-right text-sm font-semibold leading-6 text-neutral-100">{stat.label}</span>
              </div>
            ))}
          </FadeInUp>
        </div>
      </HeroParallax>

      <section className="relative z-10 border-y border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:px-6 md:grid-cols-3 lg:px-8">
          {contactHighlights.map((item) => {
            const Icon = item.icon;
            const content = (
              <span className="flex items-center gap-3 text-sm font-bold text-neutral-800">
                <Icon size={18} className="text-amber-600" aria-hidden="true" />
                {item.label}
              </span>
            );

            return item.href ? (
              <a key={item.label} href={item.href} className="rounded-md px-2 py-2 transition hover:bg-neutral-100">
                {content}
              </a>
            ) : (
              <div key={item.label} className="rounded-md px-2 py-2">
                {content}
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 bg-[#f6f3ee] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInUp className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Služby"
              title="6 špecializovaných služieb pre oceľové riešenia na mieru"
            />
            <Link
              href="/produkty-sluzby"
              className="group inline-flex min-h-11 items-center justify-center rounded-md bg-neutral-950 px-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-neutral-800"
            >
              <RollText>
                Všetky služby
                <ArrowRight size={17} aria-hidden="true" />
              </RollText>
            </Link>
          </FadeInUp>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <FadeInUp key={service.slug} delay={index * 60}>
                <ServiceCard service={service} />
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FadeInUp className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/sources/brany/welding-work-1.jpg"
                alt="KP-WELD zámočnícke práce"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-neutral-950 p-4 text-white">
                <p className="text-3xl font-black">500+</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-neutral-300">
                  realizácií
                </p>
              </div>
              <div className="rounded-md bg-amber-400 p-4 text-neutral-950">
                <p className="text-3xl font-black">10+</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em]">rokov praxe</p>
              </div>
            </div>
          </FadeInUp>
          <FadeInUp delay={120}>
            <SectionHeading
              eyebrow="O nás"
              title="Kvalita, presnosť a prístup na mieru"
              description="Zaoberáme sa výrobou a montážou oceľových konštrukcií, brán, oplotení, schodov, zábradlí a zámočníckymi prácami. Každý projekt riešime prakticky, s dôrazom na detail a spoľahlivú montáž."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {valueProps.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="rounded-lg border border-neutral-200 bg-[#f6f3ee] p-4">
                    <Icon size={24} className="text-amber-600" aria-hidden="true" />
                    <h3 className="mt-4 font-black text-neutral-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/o-nas"
                className="group inline-flex min-h-12 items-center justify-center rounded-md bg-neutral-950 px-5 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-neutral-800"
              >
                <RollText>
                  O firme
                  <ArrowRight size={17} aria-hidden="true" />
                </RollText>
              </Link>
              <a
                href={company.phoneHref}
                className="group inline-flex min-h-12 items-center justify-center rounded-md border border-neutral-300 px-5 text-sm font-black uppercase tracking-[0.12em] text-neutral-950 transition hover:bg-neutral-100"
              >
                <RollText>
                  <Phone size={17} aria-hidden="true" />
                  Zavolať
                </RollText>
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="relative z-10 bg-neutral-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInUp className="mb-10">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-amber-300">Proces</p>
            <h2 className="text-3xl font-black tracking-normal sm:text-4xl">Ako prebieha realizácia</h2>
          </FadeInUp>
          <FadeInUp delay={120}>
            <ProcessSteps variant="dark" />
          </FadeInUp>
        </div>
      </section>

      <section className="relative z-10 bg-[#f6f3ee] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInUp className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Galéria"
              title="Výber realizovaných projektov"
              description="Fotografie zachytávajú brány, konštrukcie, prístrešky, schody aj zábradlia z pôvodnej galérie."
            />
            <Link
              href="/referencie"
              className="group inline-flex min-h-11 items-center justify-center rounded-md bg-neutral-950 px-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-neutral-800"
            >
              <RollText>
                Referencie
                <ExternalLink size={17} aria-hidden="true" />
              </RollText>
            </Link>
          </FadeInUp>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeGallery.map((image, index) => (
              <FadeInUp key={image} delay={index * 50}>
                <Link
                  href="/referencie"
                  className={`group block overflow-hidden rounded-lg bg-neutral-200 shadow-sm ${
                    index === 0 || index === 5 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={image}
                      alt="KP-WELD realizácia"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInUp className="mb-8 flex justify-center gap-1 text-amber-500">
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
          </FadeInUp>
          <FadeInUp>
            <SectionHeading
              eyebrow="Referencie"
              title="Spokojní zákazníci sú najlepší dôkaz"
              description="Pôvodné hodnotenia ostávajú súčasťou webu, len v čistejšej a lepšie čitateľnej podobe."
              align="center"
            />
          </FadeInUp>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {testimonials.map((testimonial, index) => (
              <FadeInUp key={testimonial.author} delay={index * 60}>
                <figure className="rounded-lg border border-neutral-200 bg-[#f6f3ee] p-5">
                  <div className="mb-4 flex gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <CheckCircle2 key={i} size={16} aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-7 text-neutral-700">“{testimonial.quote}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-neutral-950 text-xs font-black text-white">
                      {testimonial.initials}
                    </span>
                    <span className="text-sm font-black text-neutral-950">{testimonial.author}</span>
                  </figcaption>
                </figure>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-amber-400 px-4 py-12 text-neutral-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <FadeInUp>
            <h2 className="text-3xl font-black tracking-normal">Máte projekt z ocele?</h2>
            <p className="mt-2 max-w-2xl text-base font-semibold">
              Pošlite nám zadanie alebo zavolajte. Pripravíme konzultáciu a nezáväznú ponuku.
            </p>
          </FadeInUp>
          <FadeInUp delay={120} className="flex flex-col gap-3 sm:flex-row">
            <a
              href={company.phoneHref}
              className="group inline-flex min-h-12 items-center justify-center rounded-md bg-neutral-950 px-5 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-neutral-800"
            >
              <RollText>
                <Phone size={17} aria-hidden="true" />
                {company.phone}
              </RollText>
            </a>
            <a
              href={company.emailHref}
              className="group inline-flex min-h-12 items-center justify-center rounded-md border border-neutral-950 px-5 text-sm font-black uppercase tracking-[0.12em] text-neutral-950 transition hover:bg-white"
            >
              <RollText>
                <Mail size={17} aria-hidden="true" />
                Email
              </RollText>
            </a>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
