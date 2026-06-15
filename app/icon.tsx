import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Favicon de l'onglet navigateur. Wordmark S2iA (recadré serré) centré sur un
// carré sombre arrondi — lisible et reconnaissable dans tous les thèmes.
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Lu au build (runtime Node) → embarqué en data URI dans l'image générée.
const markSrc = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/branding/logo-mark.png"),
).toString("base64")}`;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #11142a 0%, #06070d 100%)",
          borderRadius: 104,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={448} height={184} alt="" />
      </div>
    ),
    size,
  );
}
