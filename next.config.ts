import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "external-content.duckduckgo.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "placeimg.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "imgcdn.loverepublic.ru",
        port: "",
      },
      {
        protocol: "https",
        hostname: "sitechecker.pro",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "proza.ru",
        port: "",
      },
    ],
  },
};

export default nextConfig;
