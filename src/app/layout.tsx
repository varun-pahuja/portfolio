import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const getBaseUrl = () => {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return "https://varunpahuja04.vercel.app";
};

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
    url: baseUrl,
    siteName: "Varun Pahuja Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Varun Pahuja — Full-Stack Developer & IoT Engineer",
        type: "image/jpeg",
      },
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Varun Pahuja — Full-Stack Developer & IoT Engineer",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Varun Pahuja — Full-Stack Developer & IoT Engineer",
    description:
      "I build systems where web meets hardware. Full-stack developer and IoT engineer.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Varun Pahuja",
  url: "https://varunpahuja04.vercel.app",
  jobTitle: "Full-Stack Developer & IoT Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Madhav Institute of Technology and Science, Gwalior",
  },
  sameAs: [
    "https://github.com/varun-pahuja",
    "https://www.linkedin.com/in/varun-pahuja475/",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "CRDT",
    "Internet of Things",
    "ESP32",
    "Distributed Systems",
    "Machine Learning",
  ],
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="noise-overlay min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
