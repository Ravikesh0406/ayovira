import { Check } from "lucide-react";

import { HeroIllustration } from "./HeroIllustration";

function Swoosh() {
  return (
    <svg
      className="swoosh"
      viewBox="0 0 140 16"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 11.5c20-8 39-9 60-4 20 4 38 5 57-1 6-2 12-5 17-8"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="hero-title">
            Your wellness,
            <br />
            all in one place.
          </h1>
          <Swoosh />
          <p className="hero-sub">
            Find and connect with yoga, fitness, nutrition, meditation and health
            check-ups near you.
          </p>
          <p className="visually-hidden">
            Ayovira is a wellness platform in Faridabad, Haryana, India.
          </p>

          <div className="hero-actions">
            <a
              className="btn btn-primary"
              href="#join"
              data-analytics="hero-join"
            >
              Join the community
            </a>
            <a
              className="btn btn-secondary"
              href="#how-it-works"
              data-analytics="hero-how"
            >
              See how it works
            </a>
          </div>

          <ul className="reassurance">
            <li>
              <Check size={15} strokeWidth={2.4} aria-hidden="true" />
              Free to join
            </li>
            <li>
              <Check size={15} strokeWidth={2.4} aria-hidden="true" />
              No spam
            </li>
            <li>
              <Check size={15} strokeWidth={2.4} aria-hidden="true" />
              Leave anytime
            </li>
          </ul>
        </div>

        <div className="hero-art">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
