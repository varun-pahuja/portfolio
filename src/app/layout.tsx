import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Varun Pahuja — Full-Stack Developer & IoT Engineer",
  description:
    "I build systems where web meets hardware. Full-stack developer and IoT engineer specializing in React, Next.js, Node.js, and embedded systems.",
  keywords: [
    "Varun Pahuja",
    "full-stack developer",
    "IoT engineer",
    "React",
    "Next.js",
    "Node.js",
    "ESP32",
    "portfolio",
  ],
  authors: [{ name: "Varun Pahuja" }],
  openGraph: {
    title: "Varun Pahuja — Full-Stack Developer & IoT Engineer",
    description:
      "I build systems where web meets hardware. Full-stack developer and IoT engineer.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Varun Pahuja — Full-Stack Developer & IoT Engineer",
    description:
      "I build systems where web meets hardware. Full-stack developer and IoT engineer.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="noise-overlay min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
