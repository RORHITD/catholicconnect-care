import type { NextConfig } from "next";
import path from "node:path";
import { ALL_REDIRECTS } from "./data/redirects";

const nextConfig: NextConfig = {
  // The live WordPress site serves every URL with a trailing slash
  // (/donate/, /catholic-biblical-quotes/). Without this, Next emits /donate
  // and all 46 indexed URLs change shape on launch. Keep parity.
  trailingSlash: true,

  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "catholicconnect.care" },
      { protocol: "https", hostname: "www.catholicconnect.care" },
    ],
  },

  async redirects() {
    // Sourced from data/redirects.ts so every rule carries a written reason.
    return ALL_REDIRECTS.map(({ source, destination, permanent }) => ({
      source,
      destination,
      permanent,
    }));
  },
};

export default nextConfig;
