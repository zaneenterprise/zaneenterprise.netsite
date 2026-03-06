"use client"

import React, { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import { SiteFooter } from "@/components/site-footer"
import { projects } from "@/lib/data"
import { ProjectCard } from "@/components/portfolio/project-card"
import { PlaceholderProjectCard } from "@/components/portfolio/placeholder-project-card"
import { ImageLightbox } from "@/components/portfolio/image-lightbox"

/**
 * ⚡ Bolt: PortfolioPage with memoized openLightbox handler to prevent
 * cascading re-renders of the project list when interacting with the lightbox.
 */
export default function PortfolioPage() {
  const [lightboxData, setLightboxData] = useState<{
    images: { url: string; alt: string }[]
    index: number
  } | null>(null)

  const openLightbox = useCallback((images: { url: string; alt: string }[], index: number) => {
    setLightboxData({ images, index })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxData(null)
  }, [])

  return (
    <>
      <div className="relative min-h-screen overflow-x-hidden p-3 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl mx-auto bg-white dark:bg-card rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
          <nav className="border-b border-border px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
            <div className="flex items-center justify-between gap-2">
              <Link
                href="/"
                prefetch={false}
                className="min-w-0 hover:opacity-80 transition-opacity"
              >
                <BrandLogo />
              </Link>

              <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
                <Link href="/contact" prefetch={false}>
                  <Button
                    size="sm"
                    className="bg-foreground text-background hover:bg-foreground/90 text-xs sm:text-sm px-2 sm:px-3"
                  >
                    Contact
                  </Button>
                </Link>
                <Link href="/" prefetch={false}>
                  <Button variant="ghost" size="sm" className="gap-2 text-xs sm:text-sm px-2 sm:px-3">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                </Link>
              </div>
            </div>
          </nav>

          <main className="px-3 sm:px-4 md:px-6 py-6 sm:py-8">
            <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
              <div className="text-center space-y-1 sm:space-y-2 px-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Featured Projects</h1>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
                  Real-world applications built with modern tech
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onImageClick={openLightbox}
                  />
                ))}

                <PlaceholderProjectCard />
              </div>

              <div className="text-center space-y-2 sm:space-y-3 pt-4 sm:pt-6 pb-2 px-2">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-foreground">
                  Ready to Start Your Project?
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                  Let's build something exceptional together.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                  <Link href="/contact" prefetch={false} className="w-full sm:w-auto">
                    <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 w-full">
                      Start a Project
                    </Button>
                  </Link>
                  <Link href="/" className="w-full sm:w-auto">
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>

          <SiteFooter />
        </div>
      </div>

      {lightboxData && (
        <ImageLightbox projectImages={lightboxData.images} initialIndex={lightboxData.index} onClose={closeLightbox} />
      )}
    </>
  )
}
