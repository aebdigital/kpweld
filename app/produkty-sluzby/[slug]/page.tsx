import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeInUp } from "@/components/FadeInUp";
import { PageHero } from "@/components/PageHero";
import { RollText } from "@/components/RollText";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { serviceMap, services, siteUrl, type ServiceSlug } from "@/lib/site-data";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceMap.get(slug as ServiceSlug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `/produkty-sluzby/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} - KP-WELD`,
      description: service.description,
      url: `${siteUrl}/produkty-sluzby/${service.slug}`,
      images: [service.cover],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = serviceMap.get(slug as ServiceSlug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;
  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        title={service.title}
        eyebrow={service.eyebrow}
        description={service.shortDescription}
        image={service.hero}
      />

      <section className="relative z-10 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.4fr]">
          <FadeInUp as="div" className="lg:sticky lg:top-28 lg:self-start">
            <Link
              href="/produkty-sluzby"
              className="group mb-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-neutral-600 hover:text-neutral-950"
            >
              <ArrowLeft size={17} aria-hidden="true" />
              <RollText>Späť na služby</RollText>
            </Link>
            <div className="rounded-lg border border-neutral-200 bg-[#f6f3ee] p-5">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-md bg-amber-400 text-neutral-950">
                <Icon size={24} aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-black text-neutral-950">{service.title}</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{service.description}</p>
              <div className="mt-6 grid gap-3">
                {service.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3 text-sm font-bold text-neutral-800">
                    <CheckCircle2 size={18} className="text-amber-600" aria-hidden="true" />
                    {highlight}
                  </div>
                ))}
              </div>
              <Link
                href="/kontakt"
                className="group mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-neutral-950 px-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-neutral-800"
              >
                <RollText>
                  Cenová ponuka
                  <ArrowRight size={17} aria-hidden="true" />
                </RollText>
              </Link>
            </div>
          </FadeInUp>

          <div className="grid gap-12">
            {service.gallery.map((group, gIndex) => (
              <FadeInUp key={group.title} delay={gIndex * 80}>
                <section>
                  <h2 className="mb-5 text-2xl font-black text-neutral-950">{group.title}</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {group.images.map((image) => (
                      <a
                        key={image}
                        href={image}
                        className="group block overflow-hidden rounded-lg bg-neutral-200 shadow-sm"
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={image}
                            alt={`${service.title} KP-WELD`}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#f6f3ee] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInUp>
            <SectionHeading
              eyebrow="Ďalšie služby"
              title="Súvisiace oceľové riešenia"
              description="Pozrite si aj ďalšie typy výrobkov a montáží, ktoré vieme pripraviť na mieru."
            />
          </FadeInUp>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {relatedServices.map((item, index) => (
              <FadeInUp key={item.slug} delay={index * 80}>
                <ServiceCard service={item} />
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
