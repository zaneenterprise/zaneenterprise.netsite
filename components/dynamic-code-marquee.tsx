"use client"

import { useEffect, useState } from "react"
import { CodeMarquee } from "@/components/code-marquee"
import { codeExamples } from "@/lib/code-examples"

export function DynamicCodeMarquee() {
    const [index, setIndex] = useState(0)
    const snippet = codeExamples[index] ?? []

    useEffect(() => {
        const lines = snippet.length
        const duration = Math.max(lines * 0.5, 10)

        const timeout = setTimeout(() => {
            setIndex((prev) => (prev + 1) % codeExamples.length)
        }, duration * 1000)

        return () => clearTimeout(timeout)
    }, [index, snippet.length])

    return <CodeMarquee key={index} snippet={snippet} />
}
