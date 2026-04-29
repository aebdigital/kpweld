"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { services, type ServiceSlug } from "@/lib/site-data";
import type { PortfolioImage } from "@/lib/gallery";

type ReferencesGalleryProps = {
  images: PortfolioImage[];
};

type Filter = "all" | ServiceSlug;

export function ReferencesGallery({ images }: ReferencesGalleryProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredImages = useMemo(
    () => (filter === "all" ? images : images.filter((image) => image.category === filter)),
    [filter, images],
  );

  const activeImage = activeIndex === null ? null : filteredImages[activeIndex];

  const move = (direction: 1 | -1) => {
    setActiveIndex((index) => {
      if (index === null) {
        return null;
      }

      return (index + direction + filteredImages.length) % filteredImages.length;
    });
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setFilter("all");
            setActiveIndex(null);
          }}
          className={`rounded-md px-4 py-2 text-sm font-black transition ${
            filter === "all" ? "bg-neutral-950 text-white" : "bg-white text-neutral-700 hover:bg-neutral-100"
          }`}
        >
          Všetky
        </button>
        {services.map((service) => (
          <button
            key={service.slug}
            type="button"
            onClick={() => {
              setFilter(service.slug);
              setActiveIndex(null);
            }}
            className={`rounded-md px-4 py-2 text-sm font-black transition ${
              filter === service.slug
                ? "bg-neutral-950 text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            {service.title}
          </button>
        ))}
      </div>

      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredImages.map((image, index) => (
            <button
              key={`${image.category}-${image.src}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group block overflow-hidden rounded-lg bg-neutral-200 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-neutral-200 py-20 text-center">
          <p className="font-bold text-neutral-500">Nenašli sa žiadne fotografie pre túto kategóriu.</p>
        </div>
      )}


      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-neutral-950/95 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-6 top-6 z-[110] grid h-12 w-12 place-items-center rounded-full bg-white text-neutral-950 shadow-xl transition hover:scale-110 active:scale-95"
              aria-label="Zavrieť galériu"
            >
              <X size={24} aria-hidden="true" />
            </motion.button>

            {filteredImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => move(-1)}
                  className="absolute left-6 top-1/2 z-[110] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-neutral-950"
                  aria-label="Predchádzajúca fotografia"
                >
                  <ChevronLeft size={28} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  className="absolute right-6 top-1/2 z-[110] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-neutral-950"
                  aria-label="Ďalšia fotografia"
                >
                  <ChevronRight size={28} aria-hidden="true" />
                </button>
              </>
            )}

            <div className="relative h-full w-full max-w-6xl py-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.05, x: -20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="flex h-full items-center justify-center"
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    width={1600}
                    height={1200}
                    priority
                    sizes="100vw"
                    className="max-h-[85vh] w-auto rounded-lg object-contain shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

