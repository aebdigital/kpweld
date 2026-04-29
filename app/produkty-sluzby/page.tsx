import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeInUp } from "@/components/FadeInUp";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RollText } from "@/components/RollText";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Produkty a služby",
  description:
    "Kompletná ponuka oceľových konštrukcií, brán, oplotení, schodov, zábradlí, prístreškov a zámočníckych služieb KP-WELD.",
  alternates: {
    canonical: "/produkty-sluzby",
  },
  openGraph: {
    title: "Produkty a služby | KP-WELD",
    description:
      "Kompletné oceľové riešenia na mieru od prvého návrhu po montáž.",
    url: "/produkty-sluzby",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Naše služby"
        eyebrow="Produkty a služby"
        description="Kompletné oceľové riešenia na mieru od prvého návrhu po montáž."
        image="/sources/brany/steel-construction-1.jpg"
      />

      <section className="relative z-10 bg-[#f6f3ee] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInUp>
            <SectionHeading
              eyebrow="Ponuka"
              title="Vyberte typ realizácie"
              description="Každá služba má vlastnú galériu, jasné zameranie a fotografie z pôvodných referencií."
            />
          </FadeInUp>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <FadeInUp key={service.slug} delay={index * 60}>
                <ServiceCard service={service} />
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInUp className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Realizácia"
              title="Od ponuky po hotový projekt"
              description="Proces je nastavený tak, aby ste mali jasné informácie o cene, návrhu, výrobe aj montáži."
            />
            <Link
              href="/kontakt"
              className="group inline-flex min-h-11 items-center justify-center rounded-md bg-neutral-950 px-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-neutral-800"
            >
              <RollText>
                Kontaktovať
                <ArrowRight size={17} aria-hidden="true" />
              </RollText>
            </Link>
          </FadeInUp>
          <FadeInUp delay={120}>
            <ProcessSteps />
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
