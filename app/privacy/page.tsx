import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How Ayovira collects, uses and protects the details you share when you join the community.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="section">
        <div className="container prose">
          <h1>Privacy notice</h1>
          <p className="updated">Last updated: 2 November 2026</p>

          <p>
            Ayovira is a wellness community starting in Faridabad, Haryana. This
            notice explains, in plain language, what we collect when you create an
            account and how we use it.
          </p>

          <h2>Who we are</h2>
          <p>
            Ayovira, Faridabad, Haryana, India. You can reach us at{" "}
            <a className="link" href="mailto:theayovira@gmail.com">
              theayovira@gmail.com
            </a>{" "}
            or on{" "}
            <a className="link" href="tel:+918582048456">
              8582048456
            </a>
            .
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>Your name, mobile number and area or city.</li>
            <li>Your email address, if you choose to give it.</li>
            <li>What kind of member you are, such as parent or student.</li>
            <li>The wellness interests you select.</li>
            <li>Which contact options you ticked, and when.</li>
            <li>Basic campaign details, such as a UTM source from a link you used.</li>
          </ul>

          <h2>Why we use it</h2>
          <p>
            To contact you about Ayovira camps, wellness tips and services, only in
            the ways you have chosen. To understand which outreach is useful so we
            can improve it. We do not sell your data.
          </p>

          <h2>What we do not collect</h2>
          <p>
            This account form does not ask for health information such as medical
            conditions, weight or medicines. If a future service needs health
            details, we will ask separately with a clear explanation and consent
            step.
          </p>

          <h2>Sharing</h2>
          <p>
            We share details only with service providers needed to run this site and
            our messaging, such as hosting and email tools. We do not share your
            health details publicly. Clinical services, when offered, are delivered
            by qualified, authorised professionals and partners.
          </p>

          <h2>Your choices</h2>
          <p>
            You can update your interests and contact choices in your account
            settings at any time. You can download a copy of your data from
            settings. To ask us to stop messaging you or delete your details, email{" "}
            <a className="link" href="mailto:theayovira@gmail.com">
              theayovira@gmail.com
            </a>
            . We will act promptly.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep your details while you are part of the community and for as long
            as we need them for the purposes above. Our formal retention period is
            still being confirmed. You can ask us to delete your account at any
            time.
          </p>

          <h2>Children</h2>
          <p>
            This account form is for adults. A parent or guardian can sign up on
            behalf of a child where relevant.
          </p>

          <h2>Your agreement</h2>
          <p>
            By creating an account, you confirm that the details you gave are yours
            and that you agree to this notice. India&apos;s Digital Personal Data
            Protection Act, 2023 applies to how we handle personal data. This notice
            will be reviewed as Ayovira grows.
          </p>

          <p style={{ marginTop: 28 }}>
            <Link className="btn btn-secondary btn-sm" href="/">
              Back to home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
