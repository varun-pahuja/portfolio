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

export const metadata: Metadata = {
  metadataBase: new URL("https://varun-pahuja.github.io/portfolio"),
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Varun Pahuja",
  url: "https://varun-pahuja.github.io/portfolio",
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
