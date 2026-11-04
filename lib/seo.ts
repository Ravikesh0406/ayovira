import { WHATSAPP_COMMUNITY_URL } from "./constants";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ayovira.site";

export const SITE_URL = configuredSiteUrl.replace(/\/+$/, "");
export const SITE_NAME = "Ayovira";
export const SITE_TAGLINE = "Wellness Within Everyone's Reach.";
export const SITE_DESCRIPTION =
  "Ayovira connects you with yoga, fitness, nutrition, meditation and health check-ups in Faridabad. Join the free wellness community and camps.";
export const SITE_LOCALE = "en_IN";
export const SITE_LANGUAGE = "en-IN";

export const CONTACT_EMAIL = "theayovira@gmail.com";
export const CONTACT_PHONE_DISPLAY = "8582048456";
export const CONTACT_PHONE_E164 = "+918582048456";
export const CITY = "Faridabad";
export const REGION = "Haryana";
export const COUNTRY = "India";

export const OG_IMAGE_PATH = "/opengraph-image";
export const OG_IMAGE_ALT =
  "Ayovira — wellness within everyone's reach. Yoga, fitness, nutrition, meditation and health check-ups in Faridabad.";

// Update this when the public page content changes. Keeping a stable date is
// better than returning the current time on every sitemap request.
export const CONTENT_UPDATED = "2026-11-04";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon.svg"),
    },
    image: absoluteUrl(OG_IMAGE_PATH),
    description:
      "Ayovira is a wellness platform that connects people in Faridabad with yoga, fitness, nutrition, meditation and health check-up services, and free community wellness camps.",
    slogan: SITE_TAGLINE,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_E164,
    founder: {
      "@type": "Person",
      name: "Ravikesh Kumar",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressRegion: REGION,
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: CITY },
      { "@type": "AdministrativeArea", name: REGION },
      { "@type": "Country", name: COUNTRY },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_E164,
      url: WHATSAPP_COMMUNITY_URL,
      areaServed: "IN",
      availableLanguage: "English",
    },
    knowsAbout: [
      "Yoga",
      "Fitness",
      "Nutrition",
      "Meditation",
      "Health check-ups",
      "Community wellness camps",
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LANGUAGE,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function webPageSchema({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: SITE_LANGUAGE,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(OG_IMAGE_PATH),
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(items[items.length - 1]?.path ?? "/")}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function jsonLdGraph(nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
