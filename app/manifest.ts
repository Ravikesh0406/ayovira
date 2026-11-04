import type { MetadataRoute } from "next";

import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Ayovira — Wellness in Faridabad",
    short_name: SITE_NAME,
    description:
      "Ayovira connects you with wellness services and free community camps in Faridabad.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#F7F3EA",
    theme_color: "#0F3B30",
    lang: "en-IN",
    dir: "ltr",
    categories: ["health", "fitness", "lifestyle"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Join the Ayovira community",
        short_name: "Join",
        description: "Create a free Ayovira account",
        url: "/#join",
      },
      {
        name: "Free wellness camps",
        short_name: "Camps",
        description: "Request a free wellness camp",
        url: "/#camps",
      },
    ],
  };
}
