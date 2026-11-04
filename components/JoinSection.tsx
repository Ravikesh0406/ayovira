import Image from "next/image";
import { Check } from "lucide-react";

import { SignupForm } from "./SignupForm";

export function JoinSection() {
  return (
    <section className="section section-sand" id="join">
      <div className="container join-grid">
        <div className="join-copy">
          <h2>Join the Ayovira community</h2>
          <p>
            Be the first to hear about free camps, wellness tips and new services
            near you.
          </p>
          <ul className="check-list">
            <li>
              <Check size={18} strokeWidth={2.4} aria-hidden="true" />
              Free to join
            </li>
            <li>
              <Check size={18} strokeWidth={2.4} aria-hidden="true" />
              We only message you with your permission
            </li>
            <li>
              <Check size={18} strokeWidth={2.4} aria-hidden="true" />
              Leave anytime
            </li>
          </ul>
          <p className="small-note">
            Your account lets you update your interests and contact choices
            whenever you like.
          </p>

          {/* Adapted from unDraw's free "A day at the park" illustration. */}
          <div className="join-art">
            <Image
              src="/images/community-park.svg"
              alt="Illustration of people walking, resting and spending time together in a sunny park"
              width={1117}
              height={824}
              unoptimized
            />
          </div>
        </div>

        <SignupForm variant="landing" />
      </div>
    </section>
  );
}
