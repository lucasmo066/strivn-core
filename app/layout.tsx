import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ViewportBlur } from "@/components/layout/viewport-blur";
import { NavigationScroll } from "@/components/layout/navigation-scroll";

import "react-3d-button/styles";

import "./globals.css";
import "@/styles/tokens/button-3d.css";

const geistSans = localFont({
  src: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "monospace",
  ],
});

const geistPixel = localFont({
  src: "../node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Square.woff2",
  variable: "--font-geist-pixel-square",
  weight: "500",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

const themeBootScript = `(function(){try{var t=localStorage.getItem("strivn-theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})();`;

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "Strivn Agency - %s",
  },
  description:
    "Strivn builds fast, custom websites for small businesses. Based in Colorado's Front Range. Design, development, SEO, and ongoing support. Launch in weeks, not months.",
  icons: {
    icon: [
      {
        url: "/favicon-light.png?v=2",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.png?v=2",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/favicon-light.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${geistPixel.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body
        className={`${geistSans.className} min-h-screen overflow-x-clip bg-background antialiased`}
      >
        <SiteHeader />
        <Suspense fallback={null}>
          <NavigationScroll />
        </Suspense>
        {children}
        <SiteFooter />
        <ViewportBlur />
      </body>
    </html>
  );
}
