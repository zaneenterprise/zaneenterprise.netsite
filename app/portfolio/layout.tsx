import type { Metadata } from "next"
import type { ReactNode } from "react"

const title = "Portfolio | ZaneEnterprise"
const description =
  "Explore ZaneEnterprise web and mobile app projects, including custom websites, iOS and Android apps, and AI-powered experiences."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/portfolio",
    title,
    description,
    siteName: "ZaneEnterprise",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ZaneEnterprise web and mobile app portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@zaneenterprise",
    images: ["/opengraph-image.png"],
  },
}

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return children
}
