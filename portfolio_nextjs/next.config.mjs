/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      config.optimization.minimize = true
      config.optimization.splitChunks = {
        chunks: 'all',
      }
    }
    return config
  },
  images: {
    remotePatterns: [
      {
          protocol: 'https',
          hostname: 'www.neredeoku.com',
          port: '',
          pathname: '**',
      },
      {
          protocol: 'https',
          hostname: 'img.notionusercontent.com',
          port: '',
          pathname: '**',
      },
      {
          protocol: 'https',
          hostname: 'purring-comma-24b.notion.site',
          port: '',
          pathname: '**',
      },
      {
          protocol: 'https',
          hostname: 'miro.medium.com',
          port: '',
          pathname: '**',
      },
  ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
