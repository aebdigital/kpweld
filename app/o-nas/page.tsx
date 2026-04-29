import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeInUp } from "@/components/FadeInUp";
import { PageHero } from "@/components/PageHero";
import { RollText } from "@/components/RollText";
import { SectionHeading } from "@/components/SectionHeading";
import { company, stats, valueProps } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "O nás",
  description:
    "KP-WELD s.r.o. je spoločnosť zo Šamorína zameraná na výrobu a montáž oceľových konštrukcií, brán, oplotení, schodov a zábradlí.",
  alternates: {
    canonical: "/o-nas",
  },
  openGraph: {
    title: "O nás | KP-WELD",
    description:
      "Partner pre oceľové konštrukcie, brány, oplotenia, schody a zábradlia.",
    url: "/o-nas",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="O nás"
        eyebrow="KP-WELD s.r.o."
        description="Partner pre oceľové konštrukcie, brány, oplotenia, schody a zábradlia."
        image="/sources/ocelove-konstrukcie/steel-construction-2.jpg"
      />

      <section className="relative z-10 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <FadeInUp>
            <SectionHeading
              eyebrow="Profil firmy"
              title="Váš partner pre precíznu kovovýrobu"
              description="Sme spoločnosť špecializujúca sa na výrobu a montáž oceľových konštrukcií s dlhoročnými skúsenosťami v odbore. Sídlime v Šamoríne a realizujeme profesionálne služby v oblasti zváračstva, výroby brán, oplotení, schodov, zábradlí a komplexných oceľových konštrukcií."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <FadeInUp key={stat.label} delay={index * 80}>
                  <div className="rounded-lg border border-neutral-200 bg-[#f6f3ee] p-5">
                    <p className="text-4xl font-black text-neutral-950">{stat.value}</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-neutral-600">{stat.label}</p>
                  </div>
                </FadeInUp>
              ))}
            </div>
            <Link
              href="/kontakt"
              className="group mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-neutral-950 px-5 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-neutral-800"
            >
              <RollText>
                Kontaktovať KP-WELD
                <ArrowRight size={17} aria-hidden="true" />
              </RollText>
            </Link>
          </FadeInUp>
          <FadeInUp delay={120}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/sources/brany/welding-work-1.jpg"
                alt="KP-WELD práca s oceľou"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="relative z-10 bg-[#f6f3ee] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInUp>
            <SectionHeading
              eyebrow="Prístup"
              title="Na čom stojí naša práca"
              description="Kvalita a spokojnosť zákazníkov sú pre nás prvoradé. Každý projekt realizujeme s maximálnou starostlivosťou a pozornosťou k detailom."
              align="center"
            />
          </FadeInUp>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {valueProps.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeInUp key={item.title} delay={index * 80}>
                  <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                    <Icon size={28} className="text-amber-600" aria-hidden="true" />
                    <h2 className="mt-5 text-xl font-black text-neutral-950">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-neutral-600">{item.description}</p>
                  </div>
                </FadeInUp>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-neutral-950 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FadeInUp>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-300">Sídlo</p>
            <h2 className="mt-2 text-3xl font-black">{company.address}</h2>
          </FadeInUp>
          <FadeInUp delay={100}>
            <a
              href={company.googleReviews}
              className="group inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 text-sm font-black uppercase tracking-[0.12em] text-neutral-950 transition hover:bg-amber-300"
            >
              <RollText>
                Google profil
                <ArrowRight size={17} aria-hidden="true" />
              </RollText>
            </a>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
