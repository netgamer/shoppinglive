import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/shoppinglive",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
