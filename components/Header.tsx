"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { company, navLinks } from "@/lib/site-data";

import { AnimatePresence, motion } from "framer-motion";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-neutral-950/88 text-white backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <div>
              <p className="text-xl font-black tracking-[0.08em]">KP-WELD</p>
              <p className="text-sm text-neutral-400">Výroba a montáž oceľových konštrukcií</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  isActive(link.href)
                    ? "bg-white text-neutral-950"
                    : "text-neutral-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 rounded-md bg-amber-400 px-4 py-2 text-sm font-black text-neutral-950 transition hover:bg-amber-300"
            >
              <Phone size={17} aria-hidden="true" />
              {company.phone}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="relative z-[70] grid h-11 w-11 place-items-center rounded-md border border-white/15 text-white lg:hidden"
            aria-label={isOpen ? "Zavrieť menu" : "Otvoriť menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="absolute inset-x-0 bottom-0 flex h-[70svh] flex-col rounded-t-[3rem] border-t border-white/10 bg-black text-white shadow-[0_-20px_60px_rgba(0,0,0,0.8)]"
            >
              <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-white/20" />
              <div className="flex-1 overflow-y-auto px-6 py-10">
                <nav className="flex flex-col gap-3">
                  <p className="mb-4 px-4 text-xs font-black uppercase tracking-[0.25em] text-neutral-500">
                    Menu
                  </p>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between rounded-2xl px-5 py-5 text-3xl font-black transition-all ${
                        isActive(link.href)
                          ? "bg-amber-400 text-neutral-950"
                          : "text-white hover:bg-white/5 active:scale-[0.98]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  <div className="mt-10 border-t border-white/10 pt-10">
                    <p className="mb-6 px-4 text-xs font-black uppercase tracking-[0.25em] text-neutral-500">
                      Rýchly kontakt
                    </p>
                    <a
                      href={company.phoneHref}
                      className="flex items-center gap-5 rounded-2xl bg-white/5 px-5 py-6 text-2xl font-black text-white active:bg-white/10"
                    >
                      <div className="grid h-14 w-14 place-items-center rounded-xl bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20">
                        <Phone size={28} aria-hidden="true" />
                      </div>
                      {company.phone}
                    </a>
                  </div>
                </nav>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
