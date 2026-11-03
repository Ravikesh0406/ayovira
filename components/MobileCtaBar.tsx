"use client";

import { useEffect, useState } from "react";

export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);
  const [inJoin, setInJoin] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 560);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const joinSection = document.getElementById("join");
    let observer: IntersectionObserver | undefined;
    if (joinSection) {
      observer = new IntersectionObserver(
        ([entry]) => setInJoin(entry.isIntersecting),
        { rootMargin: "0px 0px -25% 0px" },
      );
      observer.observe(joinSection);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  if (!visible || inJoin) return null;

  return (
    <div className="mobile-cta-bar">
      <a className="btn btn-primary" href="#join" data-analytics="mobile-bar-join">
        Join the community
      </a>
    </div>
  );
}
