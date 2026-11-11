import type { Metadata, Viewport } from "next"
import { GeistMono } from "geist/font/mono"
import { Poppins } from "next/font/google"

import { Cursor } from "@/components/site/cursor"
import { RevealObserver } from "@/components/site/reveal-observer"
import { ThemeProvider } from "@/components/site/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { FOOTER_BLURB } from "@/lib/site"

import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Lewis Magangi, software engineer",
    template: "%s, Lewis Magangi",
  },
  description: FOOTER_BLURB,
  authors: [{ name: "Lewis Magangi" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    title: "Lewis Magangi, software engineer",
    description: FOOTER_BLURB,
    siteName: "Lewis Magangi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lewis Magangi, software engineer",
    description: FOOTER_BLURB,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Cursor />
          <RevealObserver />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
