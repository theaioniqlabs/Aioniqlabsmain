/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    unoptimized: process.env.NODE_ENV === 'development', // Workaround for corrupted sharp
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['motion-dom'],
  },
  // Disable source maps in production to avoid path issues
  productionBrowserSourceMaps: false,
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig

