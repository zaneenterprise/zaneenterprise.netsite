"use client"

import type React from "react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { getBunnyCDNUrl } from "@/lib/cdn-utils"

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
    const touchStartX = useRef<number | null>(null)

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % projectImages.length)
    }, [projectImages.length])

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
    }, [projectImages.length])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft") handlePrev()
            if (e.key === "ArrowRight") handleNext()
        }

        document.addEventListener("keydown", handleEscape)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [handleNext, handlePrev, onClose])

    const handleBackdropClick = () => {
        onClose()
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || projectImages.length <= 1) {
            touchStartX.current = null
            return
        }
        const deltaX = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) handleNext()
            else handlePrev()
        }
        touchStartX.current = null
    }

    if (projectImages.length === 0 || typeof document === "undefined") return null

    return createPortal(
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
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative flex items-center justify-center w-full h-full p-4 animate-in zoom-in-95 duration-200"
            >
                <Image
                    onClick={(e) => e.stopPropagation()}
                    src={getBunnyCDNUrl(projectImages[currentIndex]?.url || "/placeholder.svg", { width: 2048, quality: 90, auto_optimize: 'low', sharpen: true })}
                    alt={projectImages[currentIndex]?.alt || "Project image"}
                    className="w-auto h-auto max-h-[82vh] max-w-[86vw] object-contain"
                    width={2048}
                    height={2048}
                    unoptimized
                />
            </div>
        </div>,
        document.body,
    )
}
