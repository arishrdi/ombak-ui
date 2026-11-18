import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/site/header";
import { themeScript } from "@/components/site/theme-toggle";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Ombak UI: Motion components for React", template: "%s · Ombak UI" },
  description: site.description,
  openGraph: { title: "Ombak UI", description: site.description, url: site.url, siteName: "Ombak UI" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${sans.variable} ${mono.variable} ${display.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
