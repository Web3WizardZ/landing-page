/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // everything in your Next app
  // will be served under /app
  basePath: '/app',

  // make sure your static assets (_next/*) also live under /app
  assetPrefix: '/app',
}

module.exports = nextConfig
