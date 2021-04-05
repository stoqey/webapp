require('dotenv/config');
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
// const isProd = process.env.NODE_ENV === 'production';

const nextConfiguration = {
  webpack: (config) => {
    config.externals = config.externals || {};
    config.externals['styletron-server'] = 'styletron-server';
    return config;
  },
  env: {
    paypalId: process.env.PAYPAL_CLIENT,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/public',
  },
  // assetPrefix: isProd ? 'web/' : '',
};

module.exports = withPlugins(
  [withOptimizedImages, withFonts],
  nextConfiguration
);
