// IMPORTANT: Ensure you have installed the package: npm install @ducanh2912/next-pwa

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  // The 'register' option is crucial for ensuring the SW registration script is included.
  // We explicitly enable it here, although it defaults to true.
  register: true,
  // Disable PWA in development mode for easier debugging.
  disable: process.env.NODE_ENV === "development",

  // These settings ensure that the app shell (main page) is cached aggressively.
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,

  // Custom workbox options
  workboxOptions: {
    // Prevent logging in the browser console in production
    disableDevLogs: true,
    // This setting ensures that the generated sw.js file can access all chunks
    // (This is often the missing piece causing registration failure in production).
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "nextjs-cache",
          expiration: {
            maxEntries: 16,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
          matchOptions: {
            ignoreVary: true,
          },
        },
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ADDED: This empty turbopack object silences the build error caused by the PWA plugin's
  // reliance on Webpack when Next.js 16 defaults to Turbopack.
  turbopack: {},
};

export default withPWA(nextConfig);
