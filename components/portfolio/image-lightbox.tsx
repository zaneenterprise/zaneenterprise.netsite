"use client"

import React, { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { getBunnyCDNUrl } from "@/lib/cdn-utils"

const LIGHTBOX_IMAGE_OPTIONS = { width: 2048, quality: 90, auto_optimize: 'low' as const, sharpen: true }

/**
 * ⚡ Bolt: ImageLightbox with programmatic preloading of adjacent images
 * and stable event handlers.
 */
export function ImageLightbox({
    projectImages,
    initialIndex,
    onClose,
}: {
    projectImages: { url: string; alt: string }[]
    initialIndex: number
    onClose: () => void
}) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % projectImages.length)
    }, [projectImages.length])

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
    }, [projectImages.length])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft") handlePrev()
            if (e.key === "ArrowRight") handleNext()
        }

        document.addEventListener("keydown", handleKeyDown)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "unset"
        }
    }, [onClose, handleNext, handlePrev])

    // ⚡ Bolt: Programmatic preloading of next and previous images
    useEffect(() => {
        if (projectImages.length <= 1) return

        const nextIndex = (currentIndex + 1) % projectImages.length
        const prevIndex = (currentIndex - 1 + projectImages.length) % projectImages.length

        const preloadIndices = [nextIndex, prevIndex]

        preloadIndices.forEach(idx => {
            const img = new Image()
            img.src = getBunnyCDNUrl(projectImages[idx]?.url || "/placeholder.svg", LIGHTBOX_IMAGE_OPTIONS)
        })
    }, [currentIndex, projectImages])

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        onClose()
    }

    if (projectImages.length === 0) return null

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onClose()
                }}
                className="absolute top-4 right-4 p-3 rounded-full bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white transition-all hover:scale-110 z-[10001] shadow-xl border border-white/20"
                aria-label="Close"
            >
                <X className="h-6 w-6" />
            </button>

            {projectImages.length > 1 && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm text-white text-sm z-[10001] shadow-xl border border-white/20"
                >
                    {currentIndex + 1} / {projectImages.length}
                </div>
            )}

            {projectImages.length > 1 && (
                <>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handlePrev()
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white transition-all hover:scale-110 z-[10001] shadow-xl border border-white/20"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleNext()
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white transition-all hover:scale-110 z-[10001] shadow-xl border border-white/20"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-8 w-8" />
                    </button>
                </>
            )}

            {projectImages.length > 1 && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-[10001]"
                >
                    {projectImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation()
                                setCurrentIndex(idx)
                            }}
                            className={`h-2 rounded-full transition-all shadow-lg ${idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
                                }`}
                            aria-label={`Go to image ${idx + 1}`}
                        />
                    ))}
                </div>
            )}

            <div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className="relative max-w-7xl max-h-[90vh] animate-in zoom-in-95 duration-200"
            >
                <img
                    src={getBunnyCDNUrl(projectImages[currentIndex]?.url || "/placeholder.svg", LIGHTBOX_IMAGE_OPTIONS)}
                    alt={projectImages[currentIndex]?.alt || "Project image"}
                    className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                    style={{ maxWidth: "90vw" }}
                />
            </div>
        </div>
    )
}
