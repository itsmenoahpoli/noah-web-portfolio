import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
