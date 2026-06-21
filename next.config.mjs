/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Phase 0: don't fail Vercel builds on lint; TS type-checking still runs.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // Supabase Storage public objects (project URL set via env at deploy time).
      { protocol: "https", hostname: "*.supabase.co" },
      // Seed sample photos.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
