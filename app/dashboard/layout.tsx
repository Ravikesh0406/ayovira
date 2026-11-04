import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { DashboardNav } from "@/components/DashboardNav";
import { Logo } from "@/components/Logo";
import { LogoutButton } from "@/components/LogoutButton";
import { getCurrentCustomer } from "@/lib/auth";
import { initials } from "@/lib/format";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const customer = await getCurrentCustomer();
  if (!customer) {
    redirect("/login?next=/dashboard");
  }

  return (
    <div className="dash-page">
      <header className="dash-header">
        <div className="container dash-header-inner">
          <Link href="/" aria-label="Ayovira home">
            <Logo small />
          </Link>

          <DashboardNav />

          <div className="dash-user">
            <span className="avatar" aria-hidden="true">
              {initials(customer.fullName)}
            </span>
            <span>
              <span className="dash-user-name">{customer.fullName}</span>
              <br />
              <span className="dash-user-meta">Community member</span>
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="container dash-main" id="main">
        {children}
      </main>
    </div>
  );
}
