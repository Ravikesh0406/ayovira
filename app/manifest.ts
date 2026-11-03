import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ayovira",
    short_name: "Ayovira",
    description:
      "Ayovira connects you with wellness services and free community camps in Faridabad.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3EA",
    theme_color: "#0F3B30",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
