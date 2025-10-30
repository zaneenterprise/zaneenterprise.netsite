import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"
import { PostHogProvider } from "../components/PostHogProvider"

export const metadata: Metadata = {
  title: "ZaneEnterprise - App & Website Development",
  description: "Professional web development and app development services",
  keywords: ["web development", "app development", "hosting", "optimization", "mobile apps", "websites"],
  authors: [{ name: "ZaneEnterprise" }],
  creator: "ZaneEnterprise",
  publisher: "ZaneEnterprise",
  metadataBase: new URL('https://zaneenterprise.net'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zaneenterprise.net',
    title: 'ZaneEnterprise - App & Website Development',
    description: 'Anything from development, to hosting, to optimization',
    siteName: 'ZaneEnterprise',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'ZaneEnterprise - App & Website Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZaneEnterprise - App & Website Development',
    description: 'Anything from development, to hosting, to optimization',
    creator: '@zaneenterprise',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>        
        <PostHogProvider>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </PostHogProvider>
      </body>
    </html>
  )
}