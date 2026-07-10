"use client"

import type { CSSProperties } from "react"
import { useMemo } from "react"

import { cn } from "@/lib/utils"

interface CodeMarqueeProps {
  snippet: string[]
  className?: string
  onCycleComplete?: () => void
}

export function CodeMarquee({
  snippet,
  className,
  onCycleComplete,
}: CodeMarqueeProps) {
  const lines = useMemo(() => (snippet.length ? snippet : [""]), [snippet])
  const duplicated = useMemo(() => [...lines, ...lines], [lines])
  const duration = Math.max(lines.length * 0.5, 10)

  return (
    <div
      className={cn(
        "code-marquee bg-[#1e1e1e] rounded-lg p-1 sm:p-4 lg:p-8 text-left font-mono text-[8px] sm:text-xs lg:text-base overflow-hidden h-48 sm:h-80 lg:h-96 relative w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        className,
      )}
      role="img"
      aria-label="Source code example demonstrating custom app development. Hover or focus the panel to pause motion."
      tabIndex={0}
    >
      <div
        className="absolute top-0 left-0 right-0 p-1 sm:p-4 lg:p-8 animate-vertical-marquee"
        aria-hidden="true"
        onAnimationIteration={onCycleComplete}
        style={
          {
            animationDuration: `${duration}s`,
          } as CSSProperties
        }
      >
        {duplicated.map((line, index) => (
          <div
            key={`${index}-${line?.slice(0, 20)}`}
            className="text-green-400 leading-loose whitespace-pre-wrap break-words min-h-[32px] flex items-start"
          >
            {line || "\u00A0"}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 sm:h-10 lg:h-12 bg-gradient-to-b from-[#1e1e1e] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 sm:h-10 lg:h-12 bg-gradient-to-t from-[#1e1e1e] to-transparent" />
    </div>
  )
}
