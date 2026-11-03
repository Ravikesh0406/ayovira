import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Montserrat } from "next/font/google";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ayovira.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ayovira | Wellness Platform in Faridabad",
    template: "%s | Ayovira",
  },
  description:
    "Ayovira connects you with yoga, fitness, nutrition, meditation and health check-up services in Faridabad. Join the free wellness community.",
  alternates: { canonical: "/" },
  keywords: [
    "wellness platform Faridabad",
    "yoga classes in Faridabad",
    "health check-up in Faridabad",
    "dietitian in Faridabad",
    "free wellness camp Faridabad",
    "meditation classes Faridabad",
  ],
  openGraph: {
    title: "Ayovira | Wellness Platform in Faridabad",
    description:
      "Find and connect with yoga, fitness, nutrition, meditation and health check-ups near you. Join the free Ayovira community.",
    type: "website",
    url: "/",
    siteName: "Ayovira",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayovira | Wellness Platform in Faridabad",
    description:
      "Find and connect with wellness services near you. Join the free Ayovira community.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F3EA",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ayovira",
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  email: "theayovira@gmail.com",
  telephone: "+91-8582048456",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Faridabad",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ayovira",
  url: siteUrl,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${montserrat.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
