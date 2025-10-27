// next.config.mjs
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  // Ensure this entire workbox block is present
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "nextjs-cache",
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
  // reactStrictMode: true,
  // You can keep `turbopack: {}` but try removing it if you still have issues
  turbopack: {},
};

export default withPWA(nextConfig);
