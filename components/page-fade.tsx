"use client"

import { useEffect, useState } from "react"

export function PageFade({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) {
      setIsVisible(true)
      return
    }

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="transition-opacity duration-300 ease-in-out motion-reduce:transition-none"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {children}
    </div>
  )
}