"use client"

import { useCallback, useEffect, useState, type MouseEvent } from "react"

import { BrandLogo } from "@/components/brand-logo"

export function LandingFooter() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined
    if (showPopup) {
      timeout = setTimeout(() => setShowPopup(false), 2500)
    }
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [showPopup])

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setShowPopup(true)
  }, [])

  return (
    <>
      <footer
        className="border-t border-border px-3 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm text-muted-foreground text-center mb-1.5 sm:mb-4 lg:mb-6">
            Built with industry-leading technologies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 lg:gap-6 opacity-50 mb-3 sm:mb-8">
            <div className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">React</div>
            <div className="hidden sm:block text-muted-foreground">•</div>
            <div className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">Swift</div>
            <div className="hidden sm:block text-muted-foreground">•</div>
            <div className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">JavaScript</div>
            <div className="hidden sm:block text-muted-foreground">•</div>
            <div className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">Python</div>
            <div className="hidden sm:block text-muted-foreground">•</div>
            <div className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">HTML</div>
            <div className="hidden sm:block text-muted-foreground">•</div>
            <div className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">CSS</div>
          </div>
          <div className="text-center py-2 sm:py-4 border-t border-border/50">
            <div
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
              onClick={handleClick}
            >
              <span className="text-xs sm:text-sm text-muted-foreground">Made by</span>
              <BrandLogo size="sm" />
            </div>
          </div>
        </div>
      </footer>

      {showPopup && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-footer-pop motion-reduce:animate-none">
          <p className="text-2xl sm:text-3xl font-bold whitespace-nowrap bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent drop-shadow-lg">
            You&apos;re already here!
          </p>
        </div>
      )}
    </>
  )
}
