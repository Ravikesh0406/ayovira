import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const alt = "Ayovira";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F3B30",
          color: "#F7F3EA",
          fontFamily: "Georgia, serif",
          fontSize: 118,
          fontWeight: 600,
          paddingBottom: 12,
        }}
      >
        a
      </div>
    ),
    size,
  );
}
