"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#services", label: "What you'll find" },
  { href: "#camps", label: "Free camps" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container header-inner">
        <a href="/#top" aria-label="Ayovira home" data-analytics="header-logo">
          <Logo />
        </a>

        <nav className="nav-desktop" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} className="nav-link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-login" href="/login">
            Log in
          </a>
          <a
            className="btn btn-primary btn-sm"
            href="/#join"
            data-analytics="header-join"
          >
            <span className="join-label-full">Join the community</span>
            <span className="join-label-short">Join</span>
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className="mobile-panel" id="mobile-menu" data-open={open}>
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              className="nav-link"
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mobile-actions">
            <a
              className="btn btn-primary btn-full"
              href="/#join"
              onClick={() => setOpen(false)}
            >
              Join the community
            </a>
            <a
              className="btn btn-secondary btn-full"
              href="/login"
              onClick={() => setOpen(false)}
            >
              Log in
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
