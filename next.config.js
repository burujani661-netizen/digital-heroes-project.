/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Allow builds to succeed even if ESLint reports errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow builds to succeed even if TypeScript reports errors
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
