"use client"

import { useEffect, useState } from "react"
import { taglines } from "@/lib/data"

export function DynamicTagline() {
    const [mounted, setMounted] = useState(false)
    const [tagline] = useState(() => taglines[Math.floor(Math.random() * taglines.length)])

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance text-foreground leading-tight">
                {"\u00A0"}
            </h1>
        )
    }

    return (
        <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance text-foreground leading-tight">
            {tagline.text}
        </h1>
    )
}
