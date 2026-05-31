import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/og': ['./public/fonts/**'],
  },
};

export default nextConfig;
