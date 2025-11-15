import type { ReactNode } from "react"
import { LogoImage } from "@/components/cdn-image"
import { cn } from "@/lib/utils"

interface SiteFooterProps {
  className?: string
  children?: ReactNode
}

export function SiteFooter({ className, children }: SiteFooterProps) {
  return (
    <footer className={cn("border-t border-border px-4 py-4", className)}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-4">
          <a
            href="https://zaneenterprise.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-xs sm:text-sm text-muted-foreground">Made by</span>
            <LogoImage src="/logo.svg" alt="Z logo" width={24} height={24} className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-xs sm:text-sm">
              <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}>Zane</span>
              <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 200 }}>Enterprise</span>
              <span className="text-muted-foreground ml-0.5">LLC</span>
            </span>
          </a>
          {children}
        </div>
      </div>
    </footer>
  )
}
