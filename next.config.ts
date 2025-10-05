import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  /** @type {import('next').NextConfig} */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "imgbb.com" },
      { protocol: "https", hostname: "i.postimg.cc" },
    ],
  },
};
export default nextConfig;
