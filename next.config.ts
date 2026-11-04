import type { NextConfig } from "next";

const canonicalUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ayovira.site"
).replace(/\/+$/, "");

const noIndexHeaders = [
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: [],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ayovira.site" }],
        destination: `${canonicalUrl}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "ayovira.vercel.app" }],
        destination: `${canonicalUrl}/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: noIndexHeaders,
      },
      {
        source: "/dashboard",
        headers: noIndexHeaders,
      },
      {
        source: "/dashboard/:path*",
        headers: noIndexHeaders,
      },
      {
        source: "/login",
        headers: noIndexHeaders,
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
