import Link from "next/link";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import { CookiesFooterLink } from "@/components/CookiesFooterLink";
import { company, navLinks, services } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_0.8fr_0.9fr] lg:px-8">
        <div>
          <div className="mb-5">
            <p className="text-xl font-black tracking-[0.08em]">KP-WELD</p>
            <p className="text-sm text-neutral-400">Výroba a montáž oceľových konštrukcií</p>
          </div>
          <p className="max-w-md text-sm leading-7 text-neutral-300">
            Profesionálna kovovýroba, brány, oplotenia, schody, zábradlia a zámočnícke práce
            pre Šamorín a okolie.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href={company.facebook}
              className="grid h-10 w-10 place-items-center rounded-md border border-white/15 text-neutral-200 transition hover:bg-white hover:text-neutral-950"
              aria-label="Facebook KP-WELD"
            >
              <Facebook size={18} aria-hidden="true" />
            </a>
            <a
              href={company.emailHref}
              className="grid h-10 w-10 place-items-center rounded-md border border-white/15 text-neutral-200 transition hover:bg-white hover:text-neutral-950"
              aria-label="Email KP-WELD"
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-amber-300">Navigácia</h2>
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-neutral-300 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-amber-300">Kontakt</h2>
          <div className="grid gap-3 text-sm text-neutral-300">
            <a href={company.phoneHref} className="flex gap-3 hover:text-white">
              <Phone className="mt-0.5 shrink-0 text-amber-300" size={17} aria-hidden="true" />
              {company.phone}
            </a>
            <a href={company.emailHref} className="flex gap-3 hover:text-white">
              <Mail className="mt-0.5 shrink-0 text-amber-300" size={17} aria-hidden="true" />
              {company.email}
            </a>
            <p className="flex gap-3">
              <MapPin className="mt-0.5 shrink-0 text-amber-300" size={17} aria-hidden="true" />
              {company.address}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.legalName}. Všetky práva vyhradené.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a 
              href="https://aebdigital.sk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              tvorba webu - AEB Digital
            </a>
            <CookiesFooterLink />
          </div>
        </div>
      </div>
    </footer>
  );
}
