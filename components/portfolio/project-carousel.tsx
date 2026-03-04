"use client"

import React, { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CDNImage } from "@/components/cdn-image"
import { projects } from "@/lib/data"
import type { BunnyImageOptions } from "@/lib/cdn-utils"

const CAROUSEL_CDN_OPTIONS: BunnyImageOptions = { quality: 85, auto_optimize: 'high' }

export function ProjectCarousel({
    project,
    onImageClick,
}: {
    project: (typeof projects)[0]
    onImageClick: (images: { url: string; alt: string }[], index: number) => void
}) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const next = (e: React.MouseEvent) => {
        e.stopPropagation()
        setCurrentIndex((prev) => (prev + 1) % project.images.length)
    }

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation()
        setCurrentIndex((curr) => (curr - 1 + project.images.length) % project.images.length)
    }

    return (
        <div className="relative group">
            <div
                className="relative aspect-[9/16] sm:aspect-[3/4] rounded-lg overflow-hidden bg-muted cursor-pointer hover:ring-2 hover:ring-brand/50 transition-all"
                onClick={() => onImageClick(project.images, currentIndex)}
            >
                <CDNImage
                    src={project.images[currentIndex].url || "/placeholder.svg"}
                    alt={project.images[currentIndex].alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    cdnOptions={CAROUSEL_CDN_OPTIONS}
                />
            </div>

            <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Previous image"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>
            <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Next image"
            >
                <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => {
                            e.stopPropagation()
                            setCurrentIndex(idx)
                        }}
                        className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                            }`}
                        aria-label={`Go to image ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
