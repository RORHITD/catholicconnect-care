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

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
          // Not X-Frame-Options: Amelia's Agent previews and edits the site
          // inside an iframe from its own origin, and Donorbox needs payment.
          { key: "Content-Security-Policy", value: "frame-ancestors 'self' https://ameliasagent.com https://*.ameliasagent.com" },
        ],
      },
    ];
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
