"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function GlobalBackground({ image }: { image: string }) {
    const imgRef = useRef<HTMLImageElement>(null)
    const [loadsLate, setLoadsLate] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const img = imgRef.current
        if (img && !(img.complete && img.naturalWidth > 0)) {
            setLoadsLate(true)
        }
    }, [])

    const fadeClass = loadsLate
        ? ` transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"}`
        : ""

    return (
        <>
            <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
                <div className="relative h-full w-full overflow-hidden" style={{ backgroundColor: "oklch(0.15 0 0)" }}>
                    <Image
                        ref={imgRef}
                        src={image}
                        alt=""
                        fill
                        sizes="100vw"
                        aria-hidden
                        onLoad={() => setLoaded(true)}
                        className={`object-cover scale-110 blur-[8px]${fadeClass}`}
                    />
                </div>
            </div>
            <div aria-hidden className="pointer-events-none fixed inset-0 bg-background/10 -z-10" />
        </>
    )
}
