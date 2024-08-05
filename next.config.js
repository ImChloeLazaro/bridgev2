/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "bridgebucket150517-dev.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')()

module.exports = process.env.ANALYZE === true ? withBundleAnalyzer(nextConfig) : nextConfig;
