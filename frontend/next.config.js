/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [{ source: '/cv', destination: '/data/Argajit CV 2026.pdf', permanent: false }];
  },
};
module.exports = nextConfig;
