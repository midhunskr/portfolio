/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Portrait and future case-study imagery are served locally from /public.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
