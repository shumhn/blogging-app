/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zalient.me',
      },
    ],
  },
};

export default nextConfig;
