import type { Metadata } from "next"
import type { ReactNode } from "react"

const title = "Contact | ZaneEnterprise"
const description =
  "Contact ZaneEnterprise to discuss a custom website, mobile app, hosting, or optimization project."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/contact",
    title,
    description,
    siteName: "ZaneEnterprise",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Contact ZaneEnterprise about a web or mobile app project",
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

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
