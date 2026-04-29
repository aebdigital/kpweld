import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  consent?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asText(value: unknown, maxLength = 2000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const name = asText(payload.name, 120);
    const email = asText(payload.email, 180);
    const phone = asText(payload.phone, 80);
    const message = asText(payload.message, 5000);
    const consent = payload.consent === true;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vyplňte prosím meno, email a správu." },
        { status: 400 },
      );
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Zadajte platnú emailovú adresu." }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json(
        { error: "Pred odoslaním je potrebný súhlas so spracovaním údajov." },
        { status: 400 },
      );
    }

    const apiKey = process.env.SMTP2GO_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Kontaktný formulár nie je nakonfigurovaný. Kontaktujte nás prosím telefonicky na +421 908 383 815.",
        },
        { status: 500 },
      );
    }

    const sentAt = new Date().toLocaleString("sk-SK", { timeZone: "Europe/Bratislava" });
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        to: [process.env.CONTACT_FORM_RECIPIENT || process.env.BUSINESS_EMAIL || "kpweldsro@gmail.com"],
        sender: process.env.SMTP2GO_SENDER || process.env.SMTP2GO_FROM_EMAIL || "noreply@kpweld.sk",
        subject: `Nový kontakt z webu KP-WELD - ${name}`,
        html_body: `
          <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #f6f3ee; padding: 24px;">
            <div style="background: #171717; color: #ffffff; padding: 20px;">
              <h1 style="margin: 0; font-size: 24px;">KP-WELD</h1>
              <p style="margin: 6px 0 0;">Nový kontakt z webovej stránky</p>
            </div>
            <div style="background: #ffffff; padding: 24px;">
              <p><strong>Meno:</strong> ${safeName}</p>
              <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
              ${safePhone ? `<p><strong>Telefón:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>` : ""}
              <p><strong>Správa:</strong></p>
              <p style="line-height: 1.6;">${safeMessage}</p>
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;">
              <p style="font-size: 12px; color: #666666;">Odoslané z kpweld.sk, ${sentAt}</p>
            </div>
          </div>
        `,
        text_body: `
Nový kontakt z webu KP-WELD

Meno: ${name}
Email: ${email}
${phone ? `Telefón: ${phone}` : ""}

Správa:
${message}

Odoslané z kpweld.sk, ${sentAt}
        `.trim(),
      }),
    });

    const result = (await response.json()) as { data?: { succeeded?: number }; error?: unknown };

    if (!response.ok || !result.data || Number(result.data.succeeded || 0) < 1) {
      return NextResponse.json(
        {
          error:
            "Nastala chyba pri odosielaní emailu. Skúste to znovu alebo nás kontaktujte telefonicky.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message: "Správa bola odoslaná. Ďakujeme, ozveme sa vám čo najskôr.",
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Nastala chyba pri odosielaní. Skúste to znovu alebo nás kontaktujte priamo na telefóne +421 908 383 815.",
      },
      { status: 500 },
    );
  }
}
