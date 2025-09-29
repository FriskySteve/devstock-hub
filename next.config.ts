import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push({
      "@prisma/client": "commonjs @prisma/client",
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  /** @type {import('next').NextConfig} */
  /* config options here */
  images: {
    domains: ["i.ibb.co", "imgbb.com", "i.postimg.cc"],
  },
};
export default nextConfig;
