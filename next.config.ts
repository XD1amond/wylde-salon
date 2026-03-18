import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "feb16f6c1af04f371f59-e326581eb23dccb5ba4725805de14ab5.ssl.cf2.rackcdn.com",
      },
    ],
  },
};

export default nextConfig;
