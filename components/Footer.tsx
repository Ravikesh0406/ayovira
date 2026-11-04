import Link from "next/link";

import { Logo } from "./Logo";

const FOOTER_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#services", label: "What you'll find" },
  { href: "/#camps", label: "Free camps" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#join", label: "Join" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="Ayovira home">
              <Logo cream />
            </Link>
            <p>Wellness Within Everyone&apos;s Reach.</p>
          </div>

          <div>
            <h2 className="footer-heading">Explore</h2>
            <ul className="footer-links">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Contact</h2>
            <address className="footer-contact">
              Ravikesh Kumar, Founder
              <br />
              <a href="mailto:theayovira@gmail.com">theayovira@gmail.com</a>
              <br />
              <a href="tel:+918582048456">8582048456</a>
              <br />
              Faridabad, Haryana, India
            </address>
          </div>
        </div>

        <div className="footer-legal">
          <span>&copy; {year} Ayovira. All rights reserved.</span>
          <Link href="/privacy">Privacy notice</Link>
        </div>
        <p className="footer-disclaimer">
          Ayovira is not a hospital or clinic. Clinical services are provided only
          by qualified, authorised professionals.
        </p>
      </div>
    </footer>
  );
}
