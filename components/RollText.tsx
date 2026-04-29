import type { ReactNode } from "react";

export function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex items-center overflow-hidden leading-none">
      <span className="inline-flex items-center gap-2 transition-transform duration-300 ease-out group-hover:-translate-y-[120%]">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 inline-flex translate-y-[120%] items-center gap-2 transition-transform duration-300 ease-out group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
