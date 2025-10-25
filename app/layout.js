import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// 1. Define Metadata for PWA
export const metadata = {
  title: "Next.js 15 PWA Starter",
  description:
    "A responsive Progressive Web App built with the Next.js App Router.",
  manifest: "/manifest.json", // Link to the PWA manifest file
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NextPWA",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
