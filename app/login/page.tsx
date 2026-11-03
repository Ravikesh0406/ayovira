import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthFrame } from "@/components/AuthFrame";
import { LoginForm } from "@/components/LoginForm";
import { getCurrentCustomer, safeNextPath } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Ayovira account to manage your interests and contact choices.",
  robots: { index: false, follow: true },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const customer = await getCurrentCustomer();
  if (customer) redirect("/dashboard");

  const params = await searchParams;
  const nextPath = safeNextPath(params.next);

  return (
    <AuthFrame
      asideTitle="Welcome back to your wellness space."
      asideText="Log in to update your interests, choose how we contact you, and keep up with Ayovira camps near you."
    >
      <div className="auth-head">
        <h1>Log in</h1>
        <p>Good to see you again.</p>
      </div>
      <LoginForm nextPath={nextPath} />
      <p className="auth-footer">
        By logging in, you agree to our{" "}
        <Link className="text-link" href="/privacy">
          privacy notice
        </Link>
        .
      </p>
    </AuthFrame>
  );
}
