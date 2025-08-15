const path = require('path');
const SubresourceIntegrityPlugin = require('webpack-subresource-integrity');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com']
  },
  webpack: (config, { dev, isServer }) => {
    // Map Vite's aliasing (@ -> src) to Next.js
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@'] = path.join(__dirname, 'src');

    // Enable Subresource Integrity similar to Vite's manifestSRI plugin
    if (!isServer) {
      config.output.crossOriginLoading = 'anonymous';
    }
    config.plugins.push(
      new SubresourceIntegrityPlugin({
        hashFuncNames: ['sha384'],
        enabled: !dev,
      })
    );

    return config;
  },
};

module.exports = nextConfig;
