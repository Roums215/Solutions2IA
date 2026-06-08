import { ImageResponse } from "next/og";
import { BRAND, SITE_NAME, SITE_TAGLINE } from "@/lib/seo/constants";

export const runtime = "edge";
export const alt = "Solutions 2IA — Applications IA, agents IA, sites web et automatisation sur mesure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: `linear-gradient(135deg, ${BRAND.bg} 0%, #0f1027 50%, #1a0d2b 100%)`,
          position: "relative",
        }}
      >
        {/* Glow blob top right */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "600px",
            height: "600px",
            background: `radial-gradient(closest-side, ${BRAND.primary}55, transparent)`,
            filter: "blur(40px)",
          }}
        />
        {/* Glow blob bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            left: "-160px",
            width: "640px",
            height: "640px",
            background: `radial-gradient(closest-side, ${BRAND.cyan}33, transparent)`,
            filter: "blur(50px)",
          }}
        />
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Header — brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", zIndex: 1 }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.cyan})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: BRAND.text,
              fontSize: "28px",
              fontWeight: 800,
              fontFamily: "system-ui",
            }}
          >
            2i
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: BRAND.text,
                fontFamily: "system-ui",
                letterSpacing: "-0.02em",
              }}
            >
              {SITE_NAME}
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "#8e95af",
                fontFamily: "system-ui",
                marginTop: "4px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Agence digitale française
            </div>
          </div>
        </div>

        {/* Main copy */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", zIndex: 1 }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: BRAND.text,
              fontFamily: "system-ui",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: "900px",
              display: "flex",
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#bcc1d6",
              fontFamily: "system-ui",
              maxWidth: "880px",
              display: "flex",
              lineHeight: 1.5,
            }}
          >
            Apps métier, agents IA souverains (RAG + UE), sites web, automatisation. Audit 30 j dérisqué.
          </div>
        </div>

        {/* Footer chips */}
        <div style={{ display: "flex", gap: "12px", zIndex: 1 }}>
          {["Audit 30 j", "Hébergement UE", "RGPD natif", "Humain dans la boucle"].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 18px",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.04)",
                color: "#9ea6ff",
                fontFamily: "system-ui",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
