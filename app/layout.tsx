import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/brand/Nav";
import Footer from "@/components/brand/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CalEmbed from "@/components/CalEmbed";
import Chatwoot from "@/components/Chatwoot";
import { site } from "@/lib/site";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import "./originkit.css";
import "./brand.css";
import "./interior.css";

/**
 * Geist for interface and display, Geist Mono for anything technical.
 *
 * Mono is motivated here rather than decorative: the content is full of course
 * codes, protocol names and phone numbers, and a networking
 * audience reads those faster in a monospaced face. Self-hosted through
 * next/font so there is no render-blocking request to Google.
 */
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "education",
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: [{ url: "/images/tbn-mark-512.png", type: "image/png" }],
    apple: [{ url: "/images/tbn-mark-512.png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9ecea" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1512" },
  ],
};

/**
 * The wrapper chain below is Fintra's own. `framer-Efl2Y` and its siblings are
 * the scopes the typography presets are written against
 * (`.framer-Efl2Y .framer-styles-preset-1qick95 { ... }`), so removing any of
 * them silently drops the heading styles. `framer-12flmqb` / `framer-72rtr7`
 * are Framer's desktop breakpoint variants; the responsive switching happens in
 * framer.css media queries and the `hidden-*` classes.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>

        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />

        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <CalEmbed />
        <Chatwoot />
      </body>
    </html>
  );
}
