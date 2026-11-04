import type { MetadataRoute } from "next";

import {
  CONTENT_UPDATED,
  OG_IMAGE_PATH,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl(OG_IMAGE_PATH)],
    },
    {
      url: `${SITE_URL}/signup`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
