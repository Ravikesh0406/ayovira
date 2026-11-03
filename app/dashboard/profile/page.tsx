import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ProfileForm } from "@/components/ProfileForm";
import { getCurrentCustomer } from "@/lib/auth";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Your profile",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const customer = await getCurrentCustomer();
  if (!customer) return null;

  return (
    <>
      <div className="dash-welcome">
        <div>
          <h1>Your profile</h1>
          <p>Keep your details and contact choices up to date.</p>
        </div>
        <Link className="btn btn-secondary btn-sm" href="/dashboard">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to overview
        </Link>
      </div>

      <div style={{ maxWidth: 760 }}>
        <ProfileForm customer={customer} />
        <p className="small-note" style={{ marginTop: 16 }}>
          Member since {formatDate(customer.createdAt)}. Consent version{" "}
          {customer.consentTextVersion}. Mobile number changes need a quick email
          to theayovira@gmail.com so we can keep your account safe.
        </p>
      </div>
    </>
  );
}
