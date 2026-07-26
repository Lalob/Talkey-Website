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
      "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
      "font-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://*.googletagmanager.com`,
      "script-src-attr 'none'",
      "style-src 'self' 'unsafe-inline'",
      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
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
        source: "/davaterm/",
        destination: "/davaterm",
        permanent: true,
      },
      {
        source: "/soporte-tecnico",
        destination: "/soporte",
        permanent: true,
      },
      {
        source: "/manualesdeuso",
        destination: "/manuales",
        permanent: true,
      },
      {
        source: "/manualesbiohertz",
        destination: "/manuales",
        permanent: true,
      },
      {
        source: "/IA",
        destination: "/soporte",
        permanent: true,
      },
      {
        source: "/es",
        destination: "/soporte",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/davaterm",
        destination: "/davaterm.html",
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
        source: "/ventas",
        headers: [{ key: "Content-Language", value: "es-CL" }],
      },
      {
        source: "/soporte",
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
        source: "/manuales",
        headers: [{ key: "Content-Language", value: "es-CL" }],
      },
      {
        source: "/climax/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/davaterm/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
