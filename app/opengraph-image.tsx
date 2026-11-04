import { ImageResponse } from "next/og";

import { OG_IMAGE_ALT } from "@/lib/seo";

export const alt = OG_IMAGE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F3EA",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              color: "#0F3B30",
              fontFamily: "Georgia, serif",
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: "-3px",
            }}
          >
            ayovira
            <span style={{ color: "#C0664A", marginLeft: 8, fontSize: 60 }}>~</span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              borderRadius: 999,
              background: "#DCE7DF",
              color: "#0F3B30",
              fontSize: 24,
            }}
          >
            Faridabad, Haryana
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#0F3B30",
              fontFamily: "Georgia, serif",
              fontSize: 76,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Your wellness, all in one place.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              color: "#5A6762",
              fontSize: 30,
              maxWidth: 820,
            }}
          >
            Yoga, fitness, nutrition, meditation and health check-ups near you.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#5A6762",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>Wellness Within Everyone&apos;s Reach.</div>
          <div style={{ display: "flex", color: "#A64B2E", fontWeight: 600 }}>
            Join the community — free
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "#DCE7DF",
          }}
        />
      </div>
    ),
    size,
  );
}
