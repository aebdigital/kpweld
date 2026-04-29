import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { FadeInUp } from "@/components/FadeInUp";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktujte KP-WELD v Šamoríne. Telefón +421 908 383 815, email kpweldsro@gmail.com, adresa Bratislavská 2558.",
  alternates: {
    canonical: "/kontakt",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Kontakt"
        eyebrow="Napíšte nám"
        description="Pošlite nám zadanie, rozmery alebo fotografie priestoru. Ozveme sa vám s ďalším postupom."
        image="/sources/pristresky/481287880_1160721735593635_8163028699974947865_n.jpg"
      />

      <section className="relative z-10 bg-[#f6f3ee] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <FadeInUp>
            <SectionHeading
              eyebrow="Kontaktné údaje"
              title="Máte otázky k projektu?"
              description="Najrýchlejšia cesta je telefonát. Pre podrobnejšie zadanie môžete použiť formulár."
            />
            <div className="mt-8 grid gap-4">
              <a href={company.phoneHref} className="flex gap-4 rounded-lg bg-white p-5 shadow-sm transition hover:shadow-md">
                <Phone className="mt-1 text-amber-600" size={24} aria-hidden="true" />
                <span>
                  <span className="block text-sm font-black uppercase tracking-[0.14em] text-neutral-500">Telefón</span>
                  <span className="mt-1 block text-lg font-black text-neutral-950">{company.phone}</span>
                </span>
              </a>
              <a href={company.emailHref} className="flex gap-4 rounded-lg bg-white p-5 shadow-sm transition hover:shadow-md">
                <Mail className="mt-1 text-amber-600" size={24} aria-hidden="true" />
                <span>
                  <span className="block text-sm font-black uppercase tracking-[0.14em] text-neutral-500">Email</span>
                  <span className="mt-1 block text-lg font-black text-neutral-950">{company.email}</span>
                </span>
              </a>
              <div className="flex gap-4 rounded-lg bg-white p-5 shadow-sm">
                <MapPin className="mt-1 text-amber-600" size={24} aria-hidden="true" />
                <span>
                  <span className="block text-sm font-black uppercase tracking-[0.14em] text-neutral-500">Adresa</span>
                  {company.addressLines.map((line) => (
                    <span key={line} className="mt-1 block text-lg font-black text-neutral-950">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
              <a href={company.facebook} className="flex gap-4 rounded-lg bg-white p-5 shadow-sm transition hover:shadow-md">
                <ExternalLink className="mt-1 text-amber-600" size={24} aria-hidden="true" />
                <span>
                  <span className="block text-sm font-black uppercase tracking-[0.14em] text-neutral-500">Facebook</span>
                  <span className="mt-1 block text-lg font-black text-neutral-950">KP-WELD s.r.o.</span>
                </span>
              </a>
            </div>

            <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-neutral-950">Obchodné údaje</h2>
              <dl className="mt-4 grid gap-3 text-sm text-neutral-700">
                <div className="flex justify-between gap-4">
                  <dt className="font-bold">IČO</dt>
                  <dd>{company.ico}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-bold">DIČ</dt>
                  <dd>{company.dic}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-bold">IČ DPH</dt>
                  <dd>{company.icDph}</dd>
                </div>
              </dl>
            </div>
          </FadeInUp>

          <FadeInUp delay={120}>
            <ContactForm />
          </FadeInUp>
        </div>
      </section>

      <section className="relative z-10 bg-white">
        <iframe
          title="Mapa KP-WELD Šamorín"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2668.528441113575!2d17.3159!3d48.1247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c7f85f57edae3%3A0xf675752e8b56771b!2sKP-WELD%20s.r.o.!5e0!3m2!1ssk!2ssk!4v1714426800000!5m2!1ssk!2ssk"
          className="h-[420px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
