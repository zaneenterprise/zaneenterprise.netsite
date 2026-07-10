"use client"

import { useCallback, useRef, useState } from "react"
import { projects } from "@/lib/data"
import { ProjectCard } from "@/components/portfolio/project-card"
import { PlaceholderProjectCard } from "@/components/portfolio/placeholder-project-card"
import { ImageLightbox } from "@/components/portfolio/image-lightbox"

export function PortfolioGrid() {
  const lightboxTriggerRef = useRef<HTMLElement | null>(null)
  const [lightboxData, setLightboxData] = useState<{
    images: { url: string; alt: string }[]
    index: number
  } | null>(null)

  const openLightbox = (images: { url: string; alt: string }[], index: number) => {
    lightboxTriggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    setLightboxData({ images, index })
  }

  const closeLightbox = useCallback(() => {
    const trigger = lightboxTriggerRef.current
    setLightboxData(null)

    window.requestAnimationFrame(() => {
      if (trigger?.isConnected) trigger.focus()
      lightboxTriggerRef.current = null
    })
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onImageClick={openLightbox} />
        ))}

        <PlaceholderProjectCard />
      </div>

      {lightboxData && (
        <ImageLightbox
          projectImages={lightboxData.images}
          initialIndex={lightboxData.index}
          onClose={closeLightbox}
        />
      )}
    </>
  )
}
