import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { globalNotFound: true },
  async rewrites() {
    const backend = process.env.BACKEND_URL || "http://127.0.0.1:8001";
    return {
      beforeFiles: [
        { source: "/login", destination: `${backend}/login` },
        { source: "/app/:path*", destination: `${backend}/app/:path*` },
        { source: "/static/:path*", destination: `${backend}/static/:path*` },
        { source: "/api/:path*", destination: `${backend}/api/:path*` },
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};
export default config;
