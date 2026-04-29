import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RollText } from "@/components/RollText";
import type { Service } from "@/lib/site-data";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Link
      href={`/produkty-sluzby/${service.slug}`}
      className="group block overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
        <Image
          src={service.cover}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,10,10,0.70),rgba(10,10,10,0.05))]" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-300">{service.eyebrow}</p>
            <h3 className="mt-1 text-2xl font-black">{service.title}</h3>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-amber-400 text-neutral-950">
            <Icon size={20} aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="min-h-14 text-sm leading-7 text-neutral-600">{service.shortDescription}</p>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-neutral-200 pt-4 text-sm font-black text-neutral-950">
          <RollText>Detail služby</RollText>
          <ArrowUpRight size={18} aria-hidden="true" className="text-amber-600" />
        </div>
      </div>
    </Link>
  );
}
