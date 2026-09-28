import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // Remotion vit dans /remotion (compositions + studio) — exclu du build Next.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: { exclude: ["error", "warn"] },
  },
  experimental: {
    optimizePackageImports: [
      "motion",
      "lucide-react",
      "radix-ui",
      "@vercel/analytics",
      "@vercel/speed-insights",
    ],
  },
  async redirects() {
    return [
      // Page supprimée (décision 2026-06-12) — son savoir-faire visuel est
      // raconté dans /services et /sites-web.
      {
        source: "/studio-visuel",
        destination: "/services",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      // Production seulement : les fichiers de /_next/static y portent un hash de contenu,
      // « immutable » est donc sans risque. En dev, leurs noms sont fixes
      // (…WebHeroScene_tsx.js) : ce cache d'un an faisait tourner d'anciennes versions
      // des chunks chargés en dynamic(), même après un rechargement forcé.
      ...(process.env.NODE_ENV === "production"
        ? [
            {
              source: "/_next/static/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=31536000, immutable",
                },
              ],
            },
          ]
        : [
            // Dev : purge le cache HTTP du navigateur à chaque chargement de page, pour
            // évacuer les copies « immutable » déjà stockées avant la règle ci-dessus
            // (page.js et layout.js n'ont pas de version dans leur URL). Cookies et
            // stockage intacts. Sans effet en production.
            {
              source: "/:path*",
              has: [{ type: "header" as const, key: "sec-fetch-dest", value: "document" }],
              headers: [{ key: "Clear-Site-Data", value: '"cache"' }],
            },
          ]),
      {
        source: "/branding/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
