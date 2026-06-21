"use client"

import { useEffect, useState } from "react"
import { taglines } from "@/lib/data"

const fallbackTagline = taglines[0]

export function DynamicTagline() {
    const [tagline, setTagline] = useState<(typeof taglines)[number]>(fallbackTagline)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTagline(taglines[Math.floor(Math.random() * taglines.length)])
        }, 0)

        return () => clearTimeout(timeout)
    }, [])

    return (
        <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance text-foreground leading-tight">
            {tagline.text}
        </h1>
    )
}
