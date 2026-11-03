"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "ayovira-announcement-dismissed";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setDismissed(true);
    } catch {
      // Session storage can be unavailable in private modes; keep the bar visible.
    }
  }, []);

  if (dismissed) return null;

  function dismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore storage errors.
    }
  }

  return (
    <div className="announcement-wrap">
      <div className="announcement">
        <div className="announcement-inner">
          <span>
            Free wellness camps are coming to Faridabad. Join the community to hear
            first.{" "}
            <a href="#join" data-analytics="announcement-join">
              Join
            </a>
          </span>
          <button
            type="button"
            className="announcement-close"
            onClick={dismiss}
            aria-label="Dismiss announcement"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
