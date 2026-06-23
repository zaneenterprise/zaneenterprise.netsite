'use client'

import { useEffect, useState } from 'react'
import { PostHogProvider } from 'posthog-js/react'
import type { PostHog } from 'posthog-js'

export function PHProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<PostHog | null>(null)

  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

    if (!posthogKey || !posthogHost) {
      return
    }

    let cancelled = false
    let timeout: ReturnType<typeof setTimeout> | undefined
    let idleCallback: number | undefined

    const loadClient = async () => {
      try {
        const { default: posthog } = await import('posthog-js')
        if (cancelled) return

        posthog.init(posthogKey, {
          api_host: posthogHost,
          person_profiles: 'identified_only',
          capture_pageview: false,
          capture_pageleave: true,
          disable_session_recording: true,
        })

        if (!cancelled) {
          setClient(posthog)
        }
      } catch {
        return
      }
    }

    const scheduleLoad = () => {
      if (typeof window === 'undefined') {
        void loadClient()
        return
      }

      const win = window as Window & {
        requestIdleCallback?: (callback: () => void) => number
        cancelIdleCallback?: (handle: number) => void
      }

      if (typeof win.requestIdleCallback === 'function') {
        idleCallback = win.requestIdleCallback(() => {
          void loadClient()
        })
      } else {
        timeout = setTimeout(() => {
          void loadClient()
        }, 1500)
      }
    }

    scheduleLoad()

    return () => {
      cancelled = true
      if (timeout) {
        clearTimeout(timeout)
      }
      if (idleCallback !== undefined) {
        const win = window as Window & {
          cancelIdleCallback?: (handle: number) => void
        }
        win.cancelIdleCallback?.(idleCallback)
      }
    }
  }, [])

  if (!client) {
    return <>{children}</>
  }

  return <PostHogProvider client={client}>{children}</PostHogProvider>
}
