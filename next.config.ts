/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dpmhivjrfzhhikgnqclw.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
};

module.exports = nextConfig;
