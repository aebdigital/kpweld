"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}

export function FadeInUp({ children, className = "", delay = 0, as: Tag = "div" }: FadeInUpProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stateClasses = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  const Component = Tag as ElementType;

  return (
    <Component
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${stateClasses} ${className}`}
    >
      {children}
    </Component>
  );
}
