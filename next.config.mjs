/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: '127.0.0.1',
        hostname: process.env.NEXT_PUBLIC_HOSTNAME,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
