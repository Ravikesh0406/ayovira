import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Montserrat } from "next/font/google";

import { JsonLd } from "@/components/JsonLd";
import {
  OG_IMAGE_ALT,
  OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  jsonLdGraph,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";
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

const homeTitle = "Ayovira | Yoga, Fitness & Wellness Camps in Faridabad";

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: homeTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  category: "health",
  alternates: { canonical: `${SITE_URL}/` },
  keywords: [
    "wellness platform Faridabad",
    "wellness community Faridabad",
    "yoga services Faridabad",
    "fitness services Faridabad",
    "nutrition services Faridabad",
    "meditation services Faridabad",
    "health check-up services Faridabad",
    "free wellness camps Faridabad",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    title: homeTitle,
    description: SITE_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "IN-HR",
    "geo.placename": "Faridabad",
    "content-language": SITE_LANGUAGE,
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F3EA",
};

const siteJsonLd = jsonLdGraph([organizationSchema(), websiteSchema()]);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={SITE_LANGUAGE}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fraunces.variable} ${montserrat.variable}`}
    >
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <JsonLd data={siteJsonLd} />
      </body>
    </html>
  );
}
