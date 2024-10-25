// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config) => {
  //   config.resolve.alias["@"] = path.resolve(__dirname, "src");
  //   return config;
  // },
  // output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME,
      },
    ],
  },
};

export default nextConfig;
