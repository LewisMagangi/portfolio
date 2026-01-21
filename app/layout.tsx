import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Lewis Magangi | Full-Stack Software Engineer",
  description: "Full-Stack Software Engineer with expertise in Django, React, and Next.js. Building secure, scalable applications.",
  keywords: ["Software Engineer", "Full-Stack Developer", "Django", "React", "Next.js", "Python"],
  authors: [{ name: "Lewis Magangi" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lewismagangi.com",
    title: "Lewis Magangi | Full-Stack Software Engineer",
    description: "Full-Stack Software Engineer specializing in Django and React",
    siteName: "Lewis Magangi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lewis Magangi | Full-Stack Software Engineer",
    description: "Full-Stack Software Engineer specializing in Django and React",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
