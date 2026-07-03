"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

const TAG = "[ZE-DEBUG]"

const log = (event: string, data: Record<string, unknown>) => {
  console.log(`${TAG} ${event}`, JSON.stringify(data))
}

export function CurtainDebug() {
  const pathname = usePathname()
  const firstRoute = useRef(true)

  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined
    const boot = (window as Window & { __zeBoot?: unknown }).__zeBoot
    log("document-load", {
      version: 3,
      href: location.href,
      navType: nav?.type ?? "unknown",
      prerendering:
        (document as Document & { prerendering?: boolean }).prerendering ??
        false,
      visibility: document.visibilityState,
      boot: boot ?? "MISSING - inline head script never ran",
      returnAttr: document.documentElement.hasAttribute("data-return-visit"),
      htmlBg: getComputedStyle(document.documentElement).backgroundColor,
      ua: navigator.userAgent,
    })

    const t0 = performance.now()
    let last = ""
    const sampler = setInterval(() => {
      const c = document.querySelector(".site-load-curtain")
      const state = JSON.stringify({
        curtainPresent: !!c,
        display: c ? getComputedStyle(c).display : null,
        opacity: c ? getComputedStyle(c).opacity : null,
        hiding: c ? c.classList.contains("site-load-curtain--hidden") : null,
        returnAttr: document.documentElement.hasAttribute("data-return-visit"),
        htmlBg: getComputedStyle(document.documentElement).backgroundColor,
      })
      if (state !== last) {
        last = state
        console.log(
          `${TAG} curtain-state @${Math.round(performance.now() - t0)}ms`,
          state,
        )
      }
      if (performance.now() - t0 > 10000) clearInterval(sampler)
    }, 100)

    const onPageShow = (e: PageTransitionEvent) =>
      log("pageshow", { bfcacheRestore: e.persisted })
    const onError = (e: ErrorEvent) =>
      log("window-error", { msg: e.message, file: e.filename, line: e.lineno })
    const onResourceError = (e: Event) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === "SCRIPT" || t.tagName === "LINK")) {
        log("resource-load-failed", {
          tag: t.tagName,
          url: t.getAttribute("src") ?? t.getAttribute("href"),
        })
      }
    }
    window.addEventListener("pageshow", onPageShow)
    window.addEventListener("error", onError)
    window.addEventListener("error", onResourceError, true)

    let paintObserver: PerformanceObserver | undefined
    try {
      paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          log("paint", { name: entry.name, atMs: Math.round(entry.startTime) })
        }
      })
      paintObserver.observe({ type: "paint", buffered: true })
    } catch {}

    return () => {
      clearInterval(sampler)
      window.removeEventListener("pageshow", onPageShow)
      window.removeEventListener("error", onError)
      window.removeEventListener("error", onResourceError, true)
      paintObserver?.disconnect()
    }
  }, [])

  useEffect(() => {
    log("route", {
      path: pathname,
      kind: firstRoute.current ? "initial-document" : "client-side-nav",
      atMs: Math.round(performance.now()),
    })
    firstRoute.current = false
  }, [pathname])

  return null
}
