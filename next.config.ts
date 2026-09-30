import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  typedRoutes: true,
  experimental: {
    agentFeedback: true,
  },
}

export default nextConfig
