import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthFrame } from "@/components/AuthFrame";
import { SignupForm } from "@/components/SignupForm";
import { getCurrentCustomer } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Join the community",
  description:
    "Create your free Ayovira account and hear first about wellness camps and services in Faridabad.",
  alternates: { canonical: "/signup" },
};

export default async function SignupPage() {
  const customer = await getCurrentCustomer();
  if (customer) redirect("/dashboard");

  return (
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
  );
}
