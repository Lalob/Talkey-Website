import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self' https://calendar.app.google",
      "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
      "font-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
      "script-src-attr 'none'",
      "style-src 'self' 'unsafe-inline'",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
      "frame-src 'none'",
      "media-src 'self'",
      "manifest-src 'self'",
      "worker-src 'self' blob:",
      ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
    ].join("; "),
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  distDir: isDevelopment ? ".next-dev" : ".next",
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/manualesbiohertz",
        destination: "/manualesdeuso",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/",
        headers: [{ key: "Content-Language", value: "es-CL" }],
      },
      {
        source: "/es",
        headers: [{ key: "Content-Language", value: "es-CL" }],
      },
      {
        source: "/en",
        headers: [{ key: "Content-Language", value: "en" }],
      },
      {
        source: "/it",
        headers: [{ key: "Content-Language", value: "it" }],
      },
      {
        source: "/manualesdeuso",
        headers: [{ key: "Content-Language", value: "es-CL" }],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
