import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        pathname: '/images/media/meals/**',
      },
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        pathname: '/images/category/**',
      },
    ],
  },
};

export default nextConfig;
