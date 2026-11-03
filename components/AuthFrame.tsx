import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { HeroIllustration } from "./HeroIllustration";
import { Logo } from "./Logo";

type AuthFrameProps = {
  children: ReactNode;
  asideTitle: string;
  asideText: string;
};

export function AuthFrame({ children, asideTitle, asideText }: AuthFrameProps) {
  return (
    <>
      <div className="container auth-top">
        <Link href="/" aria-label="Ayovira home">
          <Logo />
        </Link>
        <Link className="auth-top-link" href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to home
        </Link>
      </div>

      <div className="auth-page">
        <aside className="auth-aside">
          <div>
            <h2>{asideTitle}</h2>
            <p>{asideText}</p>
          </div>
          <div className="auth-aside-art">
            <HeroIllustration />
          </div>
        </aside>

        <div className="auth-main">
          <div className="auth-card auth-card--wide">{children}</div>
        </div>
      </div>
    </>
  );
}
