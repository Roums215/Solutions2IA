import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Remotion vit dans /remotion (compositions + studio) — exclu du build Next.
  // Three.js / Pixi / Lottie ne sont chargés que via dynamic(import, { ssr: false }).
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: [
      "motion",
      "@react-three/drei",
      "@tsparticles/react",
      "@tsparticles/slim",
      "chroma-js",
      "culori",
    ],
  },
};

export default nextConfig;
