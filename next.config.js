/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  swcMinify: true,
  // images: {
  //   loader: "custom",
  // },

  // Add other redirects needed?
  // https://github.com/vercel/next.js/discussions/15344
  // https://nextjs.org/docs/api-reference/next.config.js/redirects
  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap_index.xml",
        permanent: true,
      },
      {
        source: "/sitemaps.xml",
        destination: "/sitemap_index.xml",
        permanent: true,
      },
    ];
  },

  productionBrowserSourceMaps: true,
  reactStrictMode: true,

  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  webpack(config) {
    // Find the rule that handles SVGs
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('svg')
    );

    // Exclude SVGs from file loader
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Add SVGR loader for handling SVGs
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
