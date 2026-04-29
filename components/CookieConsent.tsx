"use client";

import { useCallback, useEffect, useState } from "react";
import { Cookie, Settings2, X } from "lucide-react";
import { RollText } from "./RollText";

type Prefs = { necessary: true; analytics: boolean; marketing: boolean };

const STORAGE_KEY = "kpweld-cookie-consent-v1";
const OPEN_SETTINGS_EVENT = "kpweld:open-cookie-settings";

const DEFAULTS: Prefs = { necessary: true, analytics: false, marketing: false };

function readPrefs(): Prefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    return { necessary: true, analytics: !!parsed.analytics, marketing: !!parsed.marketing };
  } catch {
    return null;
  }
}

function writePrefs(prefs: Prefs) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {}
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);

  useEffect(() => {
    const stored = readPrefs();
    if (stored) {
      setPrefs(stored);
    } else {
      setShowBanner(true);
    }
    const handler = () => {
      const current = readPrefs() ?? DEFAULTS;
      setPrefs(current);
      setShowSettings(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, handler);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!showSettings) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSettings(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showSettings]);

  const acceptAll = useCallback(() => {
    const next: Prefs = { necessary: true, analytics: true, marketing: true };
    writePrefs(next);
    setPrefs(next);
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const rejectAll = useCallback(() => {
    const next: Prefs = { necessary: true, analytics: false, marketing: false };
    writePrefs(next);
    setPrefs(next);
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const saveSettings = useCallback(() => {
    writePrefs(prefs);
    setShowBanner(false);
    setShowSettings(false);
  }, [prefs]);

  return (
    <>
      {showBanner ? (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Súbory cookies"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-lg border border-neutral-200 bg-white p-5 shadow-2xl sm:inset-x-6 sm:bottom-6"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-amber-400 text-neutral-950">
              <Cookie size={18} aria-hidden="true" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-black text-neutral-950">Používame cookies</p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Používame nevyhnutné cookies pre fungovanie webu. S vaším súhlasom
                môžeme používať aj analytické a marketingové cookies.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="group inline-flex min-h-11 items-center justify-center rounded-md bg-neutral-950 px-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-neutral-800"
                >
                  <RollText>Prijať všetky</RollText>
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="group inline-flex min-h-11 items-center justify-center rounded-md border border-neutral-300 px-4 text-sm font-black uppercase tracking-[0.12em] text-neutral-950 transition hover:bg-neutral-100"
                >
                  <RollText>Iba nevyhnutné</RollText>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSettings(true)}
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-2 text-sm font-bold uppercase tracking-[0.12em] text-neutral-700 transition hover:text-neutral-950"
                >
                  <Settings2 size={15} aria-hidden="true" />
                  <RollText>Nastavenia</RollText>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showSettings ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Nastavenia cookies"
          className="fixed inset-0 z-[70] grid place-items-end bg-neutral-950/60 p-3 sm:place-items-center sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSettings(false);
          }}
        >
          <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-neutral-950">Nastavenia cookies</h2>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                aria-label="Zavrieť"
                className="grid h-9 w-9 place-items-center rounded-md border border-neutral-200 text-neutral-700 transition hover:bg-neutral-100"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>
            <p className="mb-5 text-sm leading-6 text-neutral-600">
              Vyberte si, ktoré kategórie cookies chcete povoliť. Nevyhnutné sú
              potrebné pre fungovanie webu a nemožno ich vypnúť.
            </p>

            <div className="grid gap-3">
              <ToggleRow
                title="Nevyhnutné"
                description="Potrebné pre základné fungovanie stránky."
                checked
                disabled
              />
              <ToggleRow
                title="Analytické"
                description="Pomáhajú nám porozumieť, ako návštevníci používajú stránku."
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
              <ToggleRow
                title="Marketingové"
                description="Používajú sa na zobrazovanie relevantnej reklamy."
                checked={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="group inline-flex min-h-11 items-center justify-center rounded-md border border-neutral-300 px-4 text-sm font-black uppercase tracking-[0.12em] text-neutral-950 transition hover:bg-neutral-100"
              >
                <RollText>Iba nevyhnutné</RollText>
              </button>
              <button
                type="button"
                onClick={saveSettings}
                className="group inline-flex min-h-11 items-center justify-center rounded-md border border-neutral-300 px-4 text-sm font-black uppercase tracking-[0.12em] text-neutral-950 transition hover:bg-neutral-100"
              >
                <RollText>Uložiť výber</RollText>
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="group inline-flex min-h-11 items-center justify-center rounded-md bg-amber-400 px-4 text-sm font-black uppercase tracking-[0.12em] text-neutral-950 transition hover:bg-amber-300"
              >
                <RollText>Prijať všetky</RollText>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label
      className={`flex items-start justify-between gap-4 rounded-md border border-neutral-200 bg-[#f6f3ee] p-4 ${
        disabled ? "opacity-90" : "cursor-pointer hover:border-neutral-300"
      }`}
    >
      <span>
        <span className="block text-sm font-black text-neutral-950">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-neutral-600">{description}</span>
      </span>
      <span className="relative mt-1 inline-block h-6 w-11 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none disabled:cursor-not-allowed"
        />
        <span
          aria-hidden="true"
          className="block h-6 w-11 rounded-full bg-neutral-300 transition peer-checked:bg-amber-400 peer-disabled:bg-neutral-300"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5"
        />
      </span>
    </label>
  );
}
