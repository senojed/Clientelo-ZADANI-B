import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Jen pro vývoj: dovolí otevřít dev server z telefonu v síti (jinak Next zablokuje JavaScript a stránka je "mrtvá").
  allowedDevOrigins: ["100.108.50.6"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
