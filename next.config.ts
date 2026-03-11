import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // image pattern
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
