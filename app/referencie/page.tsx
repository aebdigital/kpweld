import type { Metadata } from "next";
import { FadeInUp } from "@/components/FadeInUp";
import { PageHero } from "@/components/PageHero";
import { ReferencesGallery } from "@/components/ReferencesGallery";
import { SectionHeading } from "@/components/SectionHeading";
import { getPortfolioImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Referencie",
  description:
    "Fotogaléria realizovaných projektov KP-WELD: oceľové konštrukcie, brány, ploty, schody, zábradlia a prístrešky.",
  alternates: {
    canonical: "/referencie",
  },
};

export default function ReferencesPage() {
  const images = getPortfolioImages();

  return (
    <>
      <PageHero
        title="Referencie"
        eyebrow="Realizované projekty"
        description="Prehľad fotografií z výroby a montáže oceľových riešení KP-WELD."
        image="/sources/pristresky/481287880_1160721735593635_8163028699974947865_n.jpg"
      />

      <section className="relative z-10 bg-[#f6f3ee] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInUp>
            <SectionHeading
              eyebrow="Galéria"
              title="Fotografie podľa typu realizácie"
              description={`${images.length} fotografií z pôvodnej galérie je dostupných v novej filtrovateľnej referenčnej stránke.`}
            />
          </FadeInUp>
          <div className="mt-10">
            <ReferencesGallery images={images} />
          </div>
        </div>
      </section>

    </>
  );
}
