/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        // hostname: '127.0.0.1',
        hostname: process.env.NEXT_PUBLIC_HOSTNAME,
        port: '80',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
