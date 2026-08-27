/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === '1';

const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Static export hanya untuk GitHub Pages (deploy.yml upload ./out).
  // Di Vercel pakai native Next.js output (.next) supaya routes-manifest.json ada.
  ...(isVercel ? {} : { output: 'export' }),
};

export default nextConfig;
