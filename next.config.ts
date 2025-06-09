/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['api.maptiler.com','103.189.172.145'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
