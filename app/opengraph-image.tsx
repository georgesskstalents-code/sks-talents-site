import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SKS TALENTS — Executive Search Life Sciences & Santé animale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0f3a3c 0%, #145254 60%, #1d6e6d 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#b3c62e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f3a3c",
              fontWeight: 800,
              fontSize: 22
            }}
          >
            SKS
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.92, display: "flex" }}>
            SKS Talents
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, lineHeight: 1.05, fontWeight: 700, letterSpacing: -1, display: "flex" }}>
            Executive Search Life Sciences & Santé animale.
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.35, opacity: 0.85, maxWidth: 1000, display: "flex" }}>
            Recrutement Série A, Série B, scale-up — biotech, diagnostic, vétérinaire, petfood.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 20, opacity: 0.8 }}>
          <div style={{ display: "flex" }}>www.skstalents.fr</div>
          <div style={{ display: "flex", color: "#b3c62e", fontWeight: 600 }}>Cabinet executive search</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
