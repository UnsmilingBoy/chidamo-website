/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chidamo.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
