import type React from "react"
import type { Metadata } from "next"
import { Montserrat, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { PHProvider } from "@/components/posthog-provider"
import { PostHogPageView } from "@/components/posthog-pageview"
import { LandingFooter } from "@/components/landing-footer"
import { Suspense } from "react"
import { getBunnyCDNHostname, getBunnyCDNUrl } from "@/lib/cdn-utils"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "ZaneEnterprise - App & Website Development",
  description: "Professional web development and app development services",
  keywords: [
    "web development",
    "app development",
    "hosting",
    "optimization",
    "mobile apps",
    "websites",
  ],
  authors: [{ name: "ZaneEnterprise" }],
  creator: "ZaneEnterprise",
  publisher: "ZaneEnterprise",
  metadataBase: new URL("https://zaneenterprise.net"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zaneenterprise.net",
    title: "ZaneEnterprise - App & Website Development",
    description: "Anything from development, to hosting, to optimization",
    siteName: "ZaneEnterprise",
    images: [
      {
        url: getBunnyCDNUrl("/opengraph-image.png", { width: 1200, quality: 85, auto_optimize: 'medium' }),
        width: 1200,
        height: 630,
        alt: "ZaneEnterprise - App & Website Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZaneEnterprise - App & Website Development",
    description: "Anything from development, to hosting, to optimization",
    creator: "@zaneenterprise",
    images: [getBunnyCDNUrl("/twitter-image.png", { width: 1200, quality: 85, auto_optimize: 'medium' })],
  },
  icons: {
    icon: [
      {
        url: getBunnyCDNUrl("/favicon-32.png", { width: 32, quality: 90, auto_optimize: 'low' }),
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: getBunnyCDNUrl("/favicon-16.png", { width: 16, quality: 90, auto_optimize: 'low' }),
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
      },
    ],
    apple: [
      {
        url: getBunnyCDNUrl("/apple-touch-icon.png", { width: 180, quality: 90, auto_optimize: 'low' }),
        sizes: "180x180",
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cdnHost = getBunnyCDNHostname()
  const backgroundImage = getBunnyCDNUrl('/background.avif', { width: 1920, quality: 75, auto_optimize: 'medium' })
  return (
    <html lang="en">
      {cdnHost ? (
        <head>
          <link rel="preconnect" href={`https://${cdnHost}`} />
          <link rel="dns-prefetch" href={`https://${cdnHost}`} />
          <link rel="preload" as="image" href={backgroundImage} fetchPriority="high" crossOrigin="anonymous" />
        </head>
      ) : null}
      <PHProvider>
        <body className={`${montserrat.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
          <GlobalBackground image={backgroundImage} />
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <div className="relative z-10 min-h-screen">{children}</div>
          <LandingFooter />
        </body>
      </PHProvider>
    </html>
  )
}

function GlobalBackground({ image }: { image: string }) {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="relative h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})`, filter: "blur(8px)", transform: "scale(1.1)" }}
        />
      </div>
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-background/10 -z-10" />
    </>
  )
}
