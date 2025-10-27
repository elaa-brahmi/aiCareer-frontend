/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,

  allowedDevOrigins: [
    'http://localhost:3000',
  ],
}
module.exports = nextConfig;


