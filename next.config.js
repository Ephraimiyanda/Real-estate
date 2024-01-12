/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "*",
        pathname: "*",
      },
    ],
  },
};

module.exports = nextConfig
