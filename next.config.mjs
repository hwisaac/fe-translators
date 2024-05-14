/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_PROTOCOL,
        // hostname: '127.0.0.1',
        hostname: process.env.NEXT_PUBLIC_HOSTNAME,
        port: process.env.NEXT_PUBLIC_PORT,
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
