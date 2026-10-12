import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Jen pro vývoj: dovolí otevřít dev server z telefonu v síti (jinak Next zablokuje JavaScript a stránka je "mrtvá").
  allowedDevOrigins: process.env.DEV_ORIGIN ? [process.env.DEV_ORIGIN] : [],
  // Základní bezpečnostní hlavičky: stránku nejde vložit do cizího rámu, prohlížeč nehádá typ souboru, neposílá celé adresy dál.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
        ],
      },
    ];
  },
  // PDF přehledu (web/private) se musí přibalit k funkci, která ho vydává po ověření tokenu.
  outputFileTracingIncludes: { "/prehled/pdf": ["./private/**"] },
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
