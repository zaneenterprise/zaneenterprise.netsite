"use client"

import type React from "react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
].join(",")

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
    const dialogRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const touchStartX = useRef<number | null>(null)

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % projectImages.length)
    }, [projectImages.length])

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
    }, [projectImages.length])

    useEffect(() => {
        if (projectImages.length === 0) return

        const previousOverflow = document.body.style.overflow
        const backgroundElements = Array.from(document.body.children).filter(
            (element): element is HTMLElement =>
                element instanceof HTMLElement &&
                element !== dialogRef.current &&
                !element.contains(dialogRef.current),
        )
        const previousBackgroundState = backgroundElements.map((element) => ({
            element,
            ariaHidden: element.getAttribute("aria-hidden"),
            inert: element.hasAttribute("inert"),
        }))

        const getFocusableElements = () =>
            Array.from(
                dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
            ).filter((element) => element.getClientRects().length > 0)

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault()
                event.stopPropagation()
                onClose()
                return
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault()
                event.stopPropagation()
                handlePrev()
                return
            }

            if (event.key === "ArrowRight") {
                event.preventDefault()
                event.stopPropagation()
                handleNext()
                return
            }

            if (event.key !== "Tab") return

            const focusableElements = getFocusableElements()
            if (focusableElements.length === 0) {
                event.preventDefault()
                dialogRef.current?.focus()
                return
            }

            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (
                event.shiftKey &&
                (document.activeElement === firstElement ||
                    !dialogRef.current?.contains(document.activeElement))
            ) {
                event.preventDefault()
                lastElement.focus()
            } else if (
                !event.shiftKey &&
                (document.activeElement === lastElement ||
                    !dialogRef.current?.contains(document.activeElement))
            ) {
                event.preventDefault()
                firstElement.focus()
            }
        }

        const handleFocusIn = (event: FocusEvent) => {
            if (!dialogRef.current?.contains(event.target as Node)) {
                closeButtonRef.current?.focus()
            }
        }

        previousBackgroundState.forEach(({ element }) => {
            element.setAttribute("aria-hidden", "true")
            element.setAttribute("inert", "")
        })

        document.addEventListener("keydown", handleKeyDown, true)
        document.addEventListener("focusin", handleFocusIn)
        document.body.style.overflow = "hidden"
        closeButtonRef.current?.focus()

        return () => {
            document.removeEventListener("keydown", handleKeyDown, true)
            document.removeEventListener("focusin", handleFocusIn)
            document.body.style.overflow = previousOverflow
            previousBackgroundState.forEach(({ element, ariaHidden, inert }) => {
                if (ariaHidden === null) element.removeAttribute("aria-hidden")
                else element.setAttribute("aria-hidden", ariaHidden)

                if (!inert) element.removeAttribute("inert")
            })
        }
    }, [handleNext, handlePrev, onClose, projectImages.length])

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
            ref={dialogRef}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label="Project image viewer"
            tabIndex={-1}
        >
            <button
                ref={closeButtonRef}
                type="button"
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
                        type="button"
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
                        type="button"
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
                    {projectImages.map((image, idx) => (
                        <button
                            key={image.url}
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation()
                                setCurrentIndex(idx)
                            }}
                            className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            aria-label={`Go to image ${idx + 1}`}
                            aria-current={idx === currentIndex ? "true" : undefined}
                        >
                            <span
                                aria-hidden="true"
                                className={`h-2 rounded-full transition-all shadow-lg ${idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
                                    }`}
                            />
                        </button>
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
                    src={projectImages[currentIndex]?.url || "/placeholder.svg"}
                    alt={projectImages[currentIndex]?.alt || "Project image"}
                    className="w-auto h-auto max-h-[82vh] max-w-[86vw] object-contain"
                    width={2048}
                    height={2048}
                />
            </div>
        </div>,
        document.body,
    )
}
