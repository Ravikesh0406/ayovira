import type { Metadata } from "next";
import Link from "next/link";
import {
  Apple,
  CalendarDays,
  Download,
  Flower2,
  HeartHandshake,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { getCurrentCustomer } from "@/lib/auth";
import { formatDate, firstName } from "@/lib/format";
import { interestLabel, roleLabel } from "@/lib/types";

export const metadata: Metadata = {
  title: "Your dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const customer = await getCurrentCustomer();
  if (!customer) return null;

  return (
    <>
      <div className="dash-welcome">
        <div>
          <h1>Namaste, {firstName(customer.fullName)}.</h1>
          <p>
            Welcome to your Ayovira space. Here&apos;s what we know, and what comes
            next.
          </p>
        </div>
        <Link className="btn btn-secondary btn-sm" href="/dashboard/profile">
          Edit your details
        </Link>
      </div>

      <div className="dash-grid">
        <div className="dash-stack">
          <section className="card" aria-labelledby="profile-heading">
            <div className="card-head">
              <div>
                <h2 id="profile-heading">Your profile</h2>
                <p className="card-sub">The details you shared with us.</p>
              </div>
              <Link className="link" href="/dashboard/profile">
                Edit
              </Link>
            </div>

            <dl className="profile-list">
              <div>
                <dt>Full name</dt>
                <dd>{customer.fullName}</dd>
              </div>
              <div>
                <dt>Mobile</dt>
                <dd>+91 {customer.mobile}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{customer.email ?? "Not added"}</dd>
              </div>
              <div>
                <dt>Area</dt>
                <dd>{customer.area}</dd>
              </div>
              <div>
                <dt>I am a</dt>
                <dd>{roleLabel(customer.role) ?? "Not specified"}</dd>
              </div>
              <div>
                <dt>Member since</dt>
                <dd>{formatDate(customer.createdAt)}</dd>
              </div>
            </dl>

            <div style={{ marginTop: 22 }}>
              <p className="card-sub" style={{ marginBottom: 8 }}>
                Interested in
              </p>
              <div className="tag-row">
                {customer.interests.length > 0 ? (
                  customer.interests.map((interest) => (
                    <span className="tag" key={interest}>
                      {interestLabel(interest)}
                    </span>
                  ))
                ) : (
                  <span className="tag muted">No interests selected yet</span>
                )}
              </div>
            </div>
          </section>

          <section className="card" aria-labelledby="updates-heading">
            <div className="card-head">
              <div>
                <h2 id="updates-heading">Community updates</h2>
                <p className="card-sub">News from Ayovira will appear here.</p>
              </div>
            </div>

            <div className="empty-state">
              <h3>You&apos;re on the list.</h3>
              <p>
                There are no updates yet. When our first free camp in Faridabad is
                ready, we&apos;ll contact you the way you chose. No fixed date to
                promise just yet.
              </p>
            </div>

            <div className="tag-row" style={{ marginTop: 16 }}>
              {customer.consentUpdates ? (
                <span className="tag">
                  <Mail size={13} aria-hidden="true" />
                  Tips and updates
                </span>
              ) : null}
              {customer.consentContact ? (
                <span className="tag">
                  <HeartHandshake size={13} aria-hidden="true" />
                  Camps and services
                </span>
              ) : null}
            </div>
          </section>
        </div>

        <div className="dash-stack">
          <section className="card" aria-labelledby="next-heading">
            <div className="card-head">
              <h2 id="next-heading">What&apos;s next</h2>
            </div>
            <ul className="coming-list">
              <li className="coming-item">
                <span>
                  <CalendarDays size={18} aria-hidden="true" />
                  Free wellness camps
                </span>
                <span className="pill-tag">Coming soon</span>
              </li>
              <li className="coming-item">
                <span>
                  <Flower2 size={18} aria-hidden="true" />
                  Yoga and movement
                </span>
                <span className="pill-tag">Being built</span>
              </li>
              <li className="coming-item">
                <span>
                  <Apple size={18} aria-hidden="true" />
                  Nutrition guidance
                </span>
                <span className="pill-tag">Being built</span>
              </li>
              <li className="coming-item">
                <span>
                  <HeartHandshake size={18} aria-hidden="true" />
                  Health check-ups
                </span>
                <span className="pill-tag">Planned</span>
              </li>
            </ul>
            <p className="small-note">
              Ayovira is new and being built. We&apos;ll only tell you a service is
              available when it is.
            </p>
          </section>

          <section className="card" aria-labelledby="details-heading">
            <div className="card-head">
              <h2 id="details-heading">Your details are yours</h2>
            </div>
            <p className="card-sub" style={{ marginBottom: 16 }}>
              Download a copy of what we hold, or ask us to delete it. You can also
              change what we send you at any time.
            </p>
            <div className="dash-actions" style={{ marginTop: 0 }}>
              <a className="btn btn-secondary btn-sm" href="/api/customer" download>
                <Download size={16} aria-hidden="true" />
                My data
              </a>
              <Link className="btn btn-secondary btn-sm" href="/dashboard/settings">
                <ShieldCheck size={16} aria-hidden="true" />
                Settings
              </Link>
            </div>
            <p className="small-note">
              <MapPin size={13} aria-hidden="true" style={{ display: "inline", verticalAlign: "-2px" }} />{" "}
              Based in Faridabad, Haryana.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
