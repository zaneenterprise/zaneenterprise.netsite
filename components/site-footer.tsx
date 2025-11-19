import type { ReactNode } from "react"
import { BrandLogo } from "@/components/brand-logo"
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
            <BrandLogo size="sm" />
          </a>
          {children}
        </div>
      </div>
    </footer>
  )
}
