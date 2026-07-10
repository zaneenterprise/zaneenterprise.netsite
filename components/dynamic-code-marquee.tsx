"use client"

import { useState } from "react"
import { CodeMarquee } from "@/components/code-marquee"
import { codeExamples } from "@/lib/code-examples"

export function DynamicCodeMarquee() {
    const [index, setIndex] = useState(0)
    const snippet = codeExamples[index] ?? []

    return (
        <CodeMarquee
            key={index}
            snippet={snippet}
            onCycleComplete={() => {
                setIndex((prev) => (prev + 1) % codeExamples.length)
            }}
        />
    )
}
