import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LenisProvider } from "@/components/LenisProvider";
import { company, siteUrl } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KP-WELD - Výroba a montáž oceľových konštrukcií",
    template: "%s | KP-WELD",
  },
  description:
    "KP-WELD vyrába a montuje oceľové konštrukcie, brány, oplotenia, schody, zábradlia, prístrešky a zámočnícke práce v Šamoríne a okolí.",
  keywords: [
    "KP-WELD",
    "oceľové konštrukcie",
    "brány",
    "oplotenia",
    "schody",
    "zábradlia",
    "zámočnícke práce",
    "Šamorín",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: siteUrl,
    siteName: "KP-WELD",
    title: "KP-WELD - Výroba a montáž oceľových konštrukcií",
    description:
      "Profesionálna kovovýroba, montáž oceľových konštrukcií, brán, oplotení, schodov a zábradlí.",
    images: [
      {
        url: "/sources/brany/steel-construction-1.jpg",
        width: 1200,
        height: 630,
        alt: "KP-WELD oceľové konštrukcie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KP-WELD - Výroba a montáž oceľových konštrukcií",
    description: "Profesionálna kovovýroba a montáž v Šamoríne a okolí.",
    images: ["/sources/brany/steel-construction-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: "/favicon.ico",
  },
  formatDetection: { telephone: true, address: true, email: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#organization`,
  name: company.legalName,
  alternateName: company.name,
  description:
    "Výroba a montáž oceľových konštrukcií, brán, oplotení, schodov, zábradlí, prístreškov a zámočnícke práce.",
  url: siteUrl,
  telephone: company.phone.replace(/\s/g, ""),
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bratislavská 2558",
    addressLocality: "Šamorín",
    postalCode: "93101",
    addressCountry: "SK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: company.coordinates.latitude,
    longitude: company.coordinates.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  image: `${siteUrl}/sources/brany/steel-construction-1.jpg`,
  priceRange: "€€",
  areaServed: { "@type": "AdministrativeArea", name: "Slovensko" },
  sameAs: [company.facebook, company.googleReviews],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "KP-WELD",
  inLanguage: "sk-SK",
  publisher: { "@id": `${siteUrl}/#organization` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk">
      <body>
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
        </LenisProvider>
        <Script
          id="kpweld-local-business"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script
          id="kpweld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
