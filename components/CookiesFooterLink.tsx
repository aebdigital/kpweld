"use client";

import { openCookieSettings } from "@/components/CookieConsent";

export function CookiesFooterLink() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-xs text-neutral-400 transition hover:text-white"
    >
      Cookies
    </button>
  );
}
