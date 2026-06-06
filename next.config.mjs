/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages hosting
  output: 'export',
  // Disable image optimization server since GitHub Pages is static
  images: {
    unoptimized: true,
  },
  // Set the base path to match the repository name
  basePath: '/Company-website',
};

export default nextConfig;
