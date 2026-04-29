"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

type FormState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState({ status: "loading", message: "Odosielame správu..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          consent: formData.get("consent") === "on",
        }),
      });

      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Správu sa nepodarilo odoslať.");
      }

      form.reset();
      setState({
        status: "success",
        message: result.message || "Správa bola odoslaná. Ozveme sa vám čo najskôr.",
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Nastala chyba pri odosielaní. Skúste nás kontaktovať telefonicky.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-neutral-800">
          Vaše meno
          <input
            required
            name="name"
            minLength={2}
            className="min-h-12 rounded-md border border-neutral-300 bg-white px-4 text-base font-medium outline-none transition focus:border-neutral-950 focus:ring-4 focus:ring-amber-200"
            autoComplete="name"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-neutral-800">
          Email
          <input
            required
            name="email"
            type="email"
            className="min-h-12 rounded-md border border-neutral-300 bg-white px-4 text-base font-medium outline-none transition focus:border-neutral-950 focus:ring-4 focus:ring-amber-200"
            autoComplete="email"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-bold text-neutral-800">
        Telefón
        <input
          name="phone"
          type="tel"
          className="min-h-12 rounded-md border border-neutral-300 bg-white px-4 text-base font-medium outline-none transition focus:border-neutral-950 focus:ring-4 focus:ring-amber-200"
          autoComplete="tel"
        />
      </label>

      <label className="mt-4 grid gap-2 text-sm font-bold text-neutral-800">
        Správa
        <textarea
          required
          name="message"
          minLength={10}
          rows={6}
          className="rounded-md border border-neutral-300 bg-white px-4 py-3 text-base font-medium outline-none transition focus:border-neutral-950 focus:ring-4 focus:ring-amber-200"
        />
      </label>

      <label className="mt-4 flex gap-3 text-sm leading-6 text-neutral-600">
        <input
          required
          type="checkbox"
          name="consent"
          className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-300 text-amber-500 focus:ring-amber-300"
        />
        Súhlasím so spracovaním údajov za účelom odpovede na moju správu.
      </label>

      <button
        type="submit"
        disabled={state.status === "loading"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-neutral-800 disabled:cursor-wait disabled:bg-neutral-500 sm:w-auto"
      >
        <Send size={17} aria-hidden="true" />
        {state.status === "loading" ? "Odosiela sa" : "Odoslať správu"}
      </button>

      {state.message ? (
        <p
          className={`mt-4 rounded-md px-4 py-3 text-sm font-semibold ${
            state.status === "success"
              ? "bg-emerald-50 text-emerald-800"
              : state.status === "error"
                ? "bg-red-50 text-red-800"
                : "bg-neutral-100 text-neutral-700"
          }`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
