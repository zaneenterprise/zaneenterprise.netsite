"use client"

import { useEffect, useState } from "react"

const MIN_VISIBLE_MS = 200
const MAX_WAIT_MS = 3500
const HIDE_ANIMATION_MS = 600

const debug = (event: string, data?: Record<string, unknown>) => {
  console.log(
    `[ZE-DEBUG] curtain:${event}`,
    JSON.stringify({ t: Math.round(performance.now()), ...data }),
  )
}

export function LoadCurtain({ backgroundImage }: { backgroundImage: string }) {
  const [isHiding, setIsHiding] = useState(false)
  const [isGone, setIsGone] = useState(false)

  useEffect(() => {
    const returnVisit = document.documentElement.hasAttribute(
      "data-return-visit",
    )
    debug("hydrated", { returnVisit })

    if (returnVisit) {
      setIsGone(true)
      debug("skipped-return-visit")
      return
    }

    let cancelled = false
    let revealed = false
    let hideTimer: ReturnType<typeof setTimeout> | undefined
    let removeTimer: ReturnType<typeof setTimeout> | undefined
    const startedAt = performance.now()

    const waitForBackground = new Promise<void>((resolve) => {
      const image = new window.Image()
      image.src = backgroundImage

      if (image.complete && image.naturalWidth > 0) {
        debug("background-already-cached")
        resolve()
        return
      }

      const finish = () => {
        debug("background-settled", {
          waitedMs: Math.round(performance.now() - startedAt),
        })
        resolve()
      }
      image.addEventListener("load", finish, { once: true })
      image.addEventListener("error", finish, { once: true })

      if (typeof image.decode === "function") {
        image.decode().then(finish).catch(finish)
      }
    })

    const waitForFonts =
      "fonts" in document && document.fonts?.ready
        ? document.fonts.ready.then(() => undefined).catch(() => undefined)
        : Promise.resolve()

    const reveal = (reason: string) => {
      if (cancelled || revealed) return
      revealed = true

      const elapsed = performance.now() - startedAt
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed)
      debug("reveal", { reason, elapsedMs: Math.round(elapsed) })

      hideTimer = setTimeout(() => {
        if (cancelled) return
        setIsHiding(true)
        debug("fade-out-started")
        removeTimer = setTimeout(() => {
          if (!cancelled) {
            setIsGone(true)
            debug("removed")
          }
        }, HIDE_ANIMATION_MS)
      }, remaining)
    }

    const maxTimer = setTimeout(() => reveal("max-wait-timeout"), MAX_WAIT_MS)

    Promise.allSettled([waitForBackground, waitForFonts]).then(() => {
      clearTimeout(maxTimer)
      requestAnimationFrame(() => reveal("assets-ready"))
    })

    return () => {
      cancelled = true
      clearTimeout(maxTimer)
      if (hideTimer) clearTimeout(hideTimer)
      if (removeTimer) clearTimeout(removeTimer)
    }
  }, [backgroundImage])

  if (isGone) return null

  return (
    <div
      aria-hidden="true"
      className={`site-load-curtain${isHiding ? " site-load-curtain--hidden" : ""}`}
    />
  )
}
