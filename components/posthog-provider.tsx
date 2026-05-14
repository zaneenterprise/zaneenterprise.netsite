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

    const loadClient = async () => {
      const { default: posthog } = await import('posthog-js')
      if (cancelled) return

      posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: 'identified_only',
        capture_pageview: false,
        capture_pageleave: true,
        disable_session_recording: false,
      })

      if (!cancelled) {
        setClient(posthog)
      }
    }

    const scheduleLoad = () => {
      if (typeof window === 'undefined') {
        void loadClient()
        return
      }

      const win = window as Window & {
        requestIdleCallback?: (callback: () => void) => number
      }

      if (typeof win.requestIdleCallback === 'function') {
        win.requestIdleCallback(() => {
          void loadClient()
        })
      } else {
        setTimeout(() => {
          void loadClient()
        }, 1500)
      }
    }

    scheduleLoad()

    return () => {
      cancelled = true
    }
  }, [])

  if (!client) {
    return <>{children}</>
  }

  return <PostHogProvider client={client}>{children}</PostHogProvider>
}
