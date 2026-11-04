import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthFrame } from "@/components/AuthFrame";
import { JsonLd } from "@/components/JsonLd";
import { SignupForm } from "@/components/SignupForm";
import { getCurrentCustomer } from "@/lib/auth";
import {
  OG_IMAGE_ALT,
  OG_IMAGE_PATH,
  breadcrumbSchema,
  jsonLdGraph,
  webPageSchema,
} from "@/lib/seo";

const description =
  "Create your free Ayovira account and hear first about wellness camps and services in Faridabad.";

export const metadata: Metadata = {
  title: "Join the community",
  description,
  alternates: { canonical: "/signup" },
  openGraph: {
    title: "Join the Ayovira community",
    description,
    url: "/signup",
    type: "website",
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
    title: "Join the Ayovira community",
    description,
    images: [OG_IMAGE_PATH],
  },
};

const pageJsonLd = jsonLdGraph([
  webPageSchema({
    path: "/signup",
    name: "Join the Ayovira community",
    description,
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Join the community", path: "/signup" },
  ]),
]);

export default async function SignupPage() {
  const customer = await getCurrentCustomer();
  if (customer) redirect("/dashboard");

  return (
    <>
      <AuthFrame
        asideTitle="Your wellness journey starts with hello."
        asideText="Create a free account to hear about camps, wellness tips and new services near you. You choose what we send, and you can leave anytime."
      >
        <div className="auth-head">
          <h1>Join the community</h1>
          <p>It takes less than a minute. Free to join, no spam.</p>
        </div>

        <SignupForm variant="page" />
      </AuthFrame>
      <JsonLd data={pageJsonLd} />
    </>
  );
}
