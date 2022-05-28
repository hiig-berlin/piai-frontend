/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: process.env.NODE_ENV === "development",
  // images: {
  //   loader: "custom",
  // },
  
  // TODO: other redirects needed?
  // https://github.com/vercel/next.js/discussions/15344
  // https://nextjs.org/docs/api-reference/next.config.js/redirects
  async redirects() {
    return [
      // {
      //   source: '/blog/category/:slug',
      //   destination: '/news/catgory/:slug',
      //   permanent: true
      // },
      // {
      //   source: '/blog/page/:slug(\\d{1,})',
      //   destination: '/news/:slug',
      //   permanent: true
      // },
      // {
      //   source: '/blog/:year(\\d{1,})/:month(\\d{1,})/:day(\\d{1,})/:slug',
      //   destination: '/news/view/:slug',
      //   permanent: true
      // },
      // {
      //   source: '/events/category/:slug',
      //   destination: '/whats-on/catgory/:slug',
      //   permanent: true
      // },
      // {
      //   source: '/venuehire',
      //   destination: '/support/venue-hire',
      //   permanent: true
      // },
      {
        source: '/sitemap.xml',
        destination: '/sitemap_index.xml',
        permanent: true
      },
      {
        source: '/sitemaps.xml',
        destination: '/sitemap_index.xml',
        permanent: true
      },
    ]
  },

  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  
  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
