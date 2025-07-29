import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.thecatapi.com',
      },
      {
        protocol: 'https',
        hostname: 'cataas.com',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
