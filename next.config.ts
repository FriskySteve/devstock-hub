import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  /** @type {import('next').NextConfig} */
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.externals.push({
  //       "@prisma/client": "commonjs @prisma/client",
  //     });
  //   }
  //   return config;
  // },
  /* config options here */
  // images: {
  //   domains: ["i.ibb.co", "imgbb.com", "i.postimg.cc"],
  // },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "imgbb.com" },
      { protocol: "https", hostname: "i.postimg.cc" },
    ],
  },
};
export default nextConfig;
