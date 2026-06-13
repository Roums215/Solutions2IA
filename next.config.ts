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
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
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
