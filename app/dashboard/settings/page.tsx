import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ShieldCheck } from "lucide-react";

import { DeleteAccount } from "@/components/DeleteAccount";
import { PasswordForm } from "@/components/PasswordForm";
import { getCurrentCustomer } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const customer = await getCurrentCustomer();
  if (!customer) return null;

  return (
    <>
      <div className="dash-welcome">
        <div>
          <h1>Settings</h1>
          <p>Your account, your password, your data.</p>
        </div>
        <Link className="btn btn-secondary btn-sm" href="/dashboard">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to overview
        </Link>
      </div>

      <div style={{ maxWidth: 760 }} className="dash-stack">
        <section className="card" aria-labelledby="password-heading">
          <div className="card-head">
            <div>
              <h2 id="password-heading">Password</h2>
              <p className="card-sub">
                Use at least 8 characters. Never share it with anyone.
              </p>
            </div>
          </div>
          <PasswordForm />
        </section>

        <section className="card" aria-labelledby="data-heading">
          <div className="card-head">
            <div>
              <h2 id="data-heading">Your data</h2>
              <p className="card-sub">
                Account for +91 {customer.mobile}. You can download a copy of the
                details we hold at any time.
              </p>
            </div>
          </div>
          <div className="dash-actions" style={{ marginTop: 0 }}>
            <a className="btn btn-secondary btn-sm" href="/api/customer" download>
              <Download size={16} aria-hidden="true" />
              Download my data
            </a>
            <Link className="btn btn-ghost btn-sm" href="/privacy">
              <ShieldCheck size={16} aria-hidden="true" />
              Privacy notice
            </Link>
          </div>
        </section>

        <section className="card danger-zone" aria-labelledby="danger-heading">
          <div className="card-head">
            <div>
              <h2 id="danger-heading">Delete account</h2>
              <p className="card-sub">
                This removes your details and signs you out everywhere.
              </p>
            </div>
          </div>
          <p>
            If you would rather change how we contact you, use your{" "}
            <Link className="link" href="/dashboard/profile">
              profile
            </Link>{" "}
            instead.
          </p>
          <DeleteAccount />
        </section>
      </div>
    </>
  );
}
