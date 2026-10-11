import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/assets/strivn_brand_assets_pack/**", search: "?v=20261011" },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  experimental: {
    optimizePackageImports: ["radix-ui"],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
