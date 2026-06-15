import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Icône iOS (ajout à l'écran d'accueil). Même identité que la favicon.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const markSrc = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/branding/logo-mark.png"),
).toString("base64")}`;

export default function AppleIcon() {
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
        }}
      >
        <img src={markSrc} width={150} height={62} alt="" />
      </div>
    ),
    size,
  );
}
