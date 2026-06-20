"use client"

import { useCallback, useEffect, useState, type MouseEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"

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

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 100 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", stiffness: 500, damping: 25, mass: 0.8 },
            }}
            exit={{ opacity: 0, scale: 0.5, y: 50, transition: { duration: 0.2 } }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <motion.div
              animate={{ rotate: [0, -3, 3, -3, 3, 0] }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
              className="relative"
            >
              <motion.p
                className="text-2xl sm:text-3xl font-bold whitespace-nowrap bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                You&apos;re already here!
              </motion.p>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [1, 1, 0],
                    scale: [0, 1, 0.5],
                    x: [0, Math.cos((i * Math.PI * 2) / 6) * 60],
                    y: [0, Math.sin((i * Math.PI * 2) / 6) * 60],
                  }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  style={{ left: "50%", top: "50%" }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
