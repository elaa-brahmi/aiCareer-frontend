/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  allowedDevOrigins: [
    'http://localhost:3000',
    'https://900497a53cf7.ngrok-free.app'
  ],
};

module.exports = nextConfig;
