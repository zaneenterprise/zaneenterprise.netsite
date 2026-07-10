import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  alternates: {
    canonical: "/portfolio",
  },
}

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return children
}
