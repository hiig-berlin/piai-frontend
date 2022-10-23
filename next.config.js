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
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack'),
    });
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
