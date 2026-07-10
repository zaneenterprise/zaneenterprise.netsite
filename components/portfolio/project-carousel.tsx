"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { projects } from "@/lib/data"

const thumbnailWidths = [320, 640] as const

function getThumbnailUrl(
  imageUrl: string,
  width: (typeof thumbnailWidths)[number],
) {
  const filename = imageUrl.slice(imageUrl.lastIndexOf("/") + 1, imageUrl.lastIndexOf("."))
  return `/images/optimized/${filename}-${width}.avif`
}

export function ProjectCarousel({
  project,
  onImageClick,
}: {
  project: (typeof projects)[0]
  onImageClick: (images: { url: string; alt: string }[], index: number) => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentImage = project.images[currentIndex]

  if (!currentImage) {
    return (
      <div className="relative aspect-[9/16] overflow-hidden rounded-lg bg-muted sm:aspect-[3/4]" />
    )
  }

  const isPriorityImage = project.id === projects[0]?.id && currentIndex === 0
  const smallThumbnail = getThumbnailUrl(currentImage.url, 320)
  const largeThumbnail = getThumbnailUrl(currentImage.url, 640)

  const next = () => {
    setCurrentIndex((previous) => (previous + 1) % project.images.length)
  }

  const previous = () => {
    setCurrentIndex(
      (current) => (current - 1 + project.images.length) % project.images.length,
    )
  }

  return (
    <div
      className="group relative"
      role="region"
      aria-label={`${project.title} image carousel`}
    >
      <button
        type="button"
        className="relative block aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-lg bg-muted transition-all hover:ring-2 hover:ring-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:aspect-[3/4]"
        onClick={() => onImageClick(project.images, currentIndex)}
        aria-label={`Open ${currentImage.alt} in the image viewer`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={largeThumbnail}
          srcSet={`${smallThumbnail} 320w, ${largeThumbnail} 640w`}
          sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) 50vw, 300px"
          alt={currentImage.alt}
          width={640}
          height={640}
          loading={isPriorityImage ? "eager" : "lazy"}
          fetchPriority={isPriorityImage ? "high" : "auto"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </button>

      <button
        type="button"
        onClick={previous}
        className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-100 transition-opacity hover:bg-black/70 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:opacity-0 sm:group-hover:opacity-100"
        aria-label={`Previous image for ${project.title}`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-100 transition-opacity hover:bg-black/70 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:opacity-0 sm:group-hover:opacity-100"
        aria-label={`Next image for ${project.title}`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-1 left-1/2 z-10 flex -translate-x-1/2">
        {project.images.map((image, index) => (
          <button
            key={image.url}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={`Show image ${index + 1} of ${project.images.length} for ${project.title}`}
            aria-current={index === currentIndex ? "true" : undefined}
          >
            <span
              aria-hidden="true"
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
