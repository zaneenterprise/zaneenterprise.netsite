"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

const TAG = "[ZE-DEBUG]"

type ZeWindow = Window & { __ZE_LOG?: Array<Record<string, unknown>> }

const log = (event: string, data: Record<string, unknown>) => {
  const w = window as ZeWindow
  if (!w.__ZE_LOG) w.__ZE_LOG = []
  w.__ZE_LOG.push({ event, ...data })
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
    let rafId = 0
    const sampleFrame = () => {
      const c = document.querySelector(".site-load-curtain")
      const img = document.querySelector<HTMLImageElement>(
        'img[src*="background"]',
      )
      const shell = document.querySelector(".animate-page-shell-in")
      const state = JSON.stringify({
        curtain: c
          ? {
              display: getComputedStyle(c).display,
              opacity: getComputedStyle(c).opacity,
              hiding: c.classList.contains("site-load-curtain--hidden"),
            }
          : null,
        htmlBg: getComputedStyle(document.documentElement).backgroundColor,
        bodyBg: document.body
          ? getComputedStyle(document.body).backgroundColor
          : null,
        img: img
          ? {
              complete: img.complete,
              naturalWidth: img.naturalWidth,
              opacity: getComputedStyle(img).opacity,
            }
          : "no-img-element",
        shellFilter: shell ? getComputedStyle(shell).filter : null,
        returnAttr: document.documentElement.hasAttribute("data-return-visit"),
      })
      if (state !== last) {
        last = state
        log(`frame @${Math.round(performance.now() - t0)}ms`, {
          state: JSON.parse(state),
        })
      }
      if (performance.now() - t0 < 8000) rafId = requestAnimationFrame(sampleFrame)
    }
    rafId = requestAnimationFrame(sampleFrame)

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
      cancelAnimationFrame(rafId)
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
