import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/chat",
  assetPrefix: "/chat-static",
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
