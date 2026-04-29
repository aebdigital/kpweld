"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface HeroParallaxProps {
  image: string;
  alt?: string;
  priority?: boolean;
  overlayClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export function HeroParallax({
  image,
  alt = "",
  priority = true,
  overlayClassName = "bg-[linear-gradient(90deg,rgba(10,10,10,0.90),rgba(10,10,10,0.55),rgba(10,10,10,0.20))]",
  className = "",
  children,
}: HeroParallaxProps) {
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const y = window.scrollY * 0.4;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={`relative isolate overflow-hidden bg-neutral-950 text-white ${className}`}>
      <div ref={bgRef} className="absolute inset-0 -z-20 will-change-transform">
        <Image src={image} alt={alt} fill priority={priority} sizes="100vw" className="object-cover" />
      </div>
      <div className={`absolute inset-0 -z-10 ${overlayClassName}`} />
      {children}
    </section>
  );
}
