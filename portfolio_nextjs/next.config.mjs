/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config, { dev, isServer }) {
      if (!dev && !isServer) {
        config.optimization.minimize = true;
        config.optimization.splitChunks = {
          chunks: 'all',
        };
      }
      return config;
    },
  };
  
  export default nextConfig;
  