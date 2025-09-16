import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    'http://localhost:3000', 
    'https://900497a53cf7.ngrok-free.app' //  ngrok URL
  ],
};


export default nextConfig;
