import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Montserrat, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { PHProvider } from "@/components/posthog-provider"
import { PostHogPageView } from "@/components/posthog-pageview"
import { GlobalBackground } from "@/components/global-background"
import { LoadCurtain } from "@/components/load-curtain"
import { PageFade } from "@/components/page-fade"
import { ConsoleEasterEgg } from "@/components/console-easter-egg"

// Emit `s-maxage=300, stale-while-revalidate` instead of `max-age=0` so the
// CDN in front (Cloudflare) is allowed to cache the prerendered HTML at the
// edge once HTML caching is enabled there.
export const revalidate = 300

const backgroundImage = "/background-1920.avif"

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
        url: "/opengraph-image.png",
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
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      style={{ backgroundColor: "oklch(0.15 0 0)", colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="image"
          href={backgroundImage}
          fetchPriority="high"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var n=Date.now(),p=+localStorage.getItem("ze-last-visit");if(p&&n-p<864e5){var d=document.documentElement;d.setAttribute("data-return-visit","");d.style.backgroundColor="oklch(0.15 0 0)"}localStorage.setItem("ze-last-visit",""+n)}catch(x){}',
          }}
        />
      </head>
      <PHProvider>
        <body
          className={`${montserrat.variable} ${jetbrainsMono.variable} font-sans antialiased`}
          style={{ backgroundColor: "transparent" }}
        >
          <ConsoleEasterEgg />
          <GlobalBackground image={backgroundImage} />
          <LoadCurtain backgroundImage={backgroundImage} />
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <PageFade>
            <div className="relative z-10 min-h-screen">{children}</div>
          </PageFade>
        </body>
      </PHProvider>
    </html>
  )
}
