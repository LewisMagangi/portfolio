/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Import only the icons used, not the whole set (cuts thousands of modules from dev compiles)
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Old blog addresses: the Django post's slug now holds the co-founding article; the voice post is retired.
  async redirects() {
    return [
      { source: '/blog/django-to-nextjs-journey', destination: '/blog/co-founding-a-tech-company', permanent: true },
      { source: '/blog/building-accessible-voice-interfaces', destination: '/blog', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

export default nextConfig
