import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-1505142468610-359e7d316be0",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        pathname: "/screenshots/**",
        search: "",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
