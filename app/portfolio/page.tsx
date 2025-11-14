"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react"
import Link from "next/link"
import { CDNImage, LogoImage } from "@/components/cdn-image"
import { useState, useEffect } from "react"

const projects = [
  {
    id: "pawcasso",
    title: "Pawcasso",
    tagline: "Cat-Approved Digital Art Studio",
    description:
      "An innovative mobile app that turns your cat's playful movements into beautiful digital artwork. Watch your feline friend chase a bird across the screen and create unique masterpieces with customizable color themes.",
    images: [
      {
        url: "/images/pawcasso1.avif",
        alt: "Pawcasso theme selection screen",
      },
      {
        url: "/images/pawcasso2.avif",
        alt: "Pawcasso gameplay with cat painting",
      },
      {
        url: "/images/pawcasso3.avif",
        alt: "Cat-approved painting experience",
      },
    ],
    tags: ["React Native", "Mobile", "iOS", "Android"],
    features: [
      "Multiple color themes (Vibrant, Pastel, Ocean, Sunset, Gray, Halloween)",
      "Real-time canvas updates as your cat plays",
      "Save and share your cat's artwork",
      "Interactive bird chase mechanics",
    ],
    color: "from-pink-500 to-purple-600",
  },
  {
    id: "azbuddy",
    title: "AZBuddy.Cash",
    tagline: "Custom built page for musician",
    description:
      "A professional musician portfolio website featuring custom animations, seamless navigation, and cohesive branding. Built for Buddy Cash with a powerful custom admin portal for gig management, schedule integration, and real-time updates.",
    images: [
      {
        url: "/images/azbuddy1.avif",
        alt: "AZBuddy.Cash homepage",
      },
      {
        url: "/images/azbuddy2.avif",
        alt: "Custom animated navigation buttons",
      },
      {
        url: "/images/azbuddy3.avif",
        alt: "Social media integration section",
      },
      {
        url: "/images/azbuddy4.avif",
        alt: "Performance schedule page",
      },
      {
        url: "/images/azbuddy5.avif",
        alt: "Custom admin portal for gig management",
      },
    ],
    tags: ["React", "Custom Scheduling Portal", "Portfolio"],
    features: [
      "Custom-designed animated buttons and transitions",
      "Seamless single-page navigation",
      "Social media integration (YouTube, Facebook)",
      "Desert-inspired color scheme and branding",
      "Custom admin portal for gig management and scheduling",
      "Real-time schedule updates and performance tracking",
    ],
    color: "from-orange-500 to-teal-500",
  },
  {
    id: "gardenerplus",
    title: "GardenerPlus",
    tagline: "AI-Powered Plant Care Companion",
    description:
      "A comprehensive plant care tracking app with AI-powered health diagnostics. Track watering schedules, get personalized care recommendations, and analyze plant health using advanced photo analysis technology.",
    images: [
      {
        url: "/images/gard1.avif",
        alt: "GardenerPlus main dashboard",
      },
      {
        url: "/images/gard2.avif",
        alt: "Detailed plant profile with care instructions",
      },
      {
        url: "/images/gard3.avif",
        alt: "AI plant health checkup feature",
      },
    ],
    tags: ["Swift", "AI/ML", "Mobile", "Python Backend"],
    features: [
      "AI-powered plant health diagnostics",
      "Personalized care recommendations and reminders",
      "Photo analysis with care history integration",
      "Track multiple plants with detailed profiles",
    ],
    color: "from-green-500 to-emerald-600",
  },
]

function ImageLightbox({
  projectImages,
  initialIndex,
  onClose,
}: {
  projectImages: { url: string; alt: string }[]
  initialIndex: number
  onClose: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

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
  }, [currentIndex])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projectImages.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
  }

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
              className={`h-2 rounded-full transition-all shadow-lg ${
                idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
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
          src={projectImages[currentIndex]?.url || "/placeholder.svg"}
          alt={projectImages[currentIndex]?.alt || "Project image"}
          className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
          style={{ maxWidth: "90vw" }}
        />
      </div>
    </div>
  )
}

function ProjectCarousel({
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
          cdnOptions={{ quality: 85, format: 'webp' }}
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
            className={`h-1.5 rounded-full transition-all ${
              idx === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function PlaceholderProjectCard() {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border-dashed border-2">
      <CardContent className="p-0">
        <div className="p-3 sm:p-4">
          <div className="relative aspect-[9/16] sm:aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
            <Sparkles className="h-12 w-12 sm:h-16 sm:w-16 text-brand/30" />
          </div>
        </div>

        <div className="px-3 sm:px-4 pb-4 flex flex-col min-h-[200px]">
          <div className="space-y-0.5 mb-2.5">
            <h2 className="text-base sm:text-lg font-bold text-foreground">Your Project Here</h2>
            <p className="text-xs font-medium text-brand">This Could Be Your Next Project</p>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
            Ready to bring your ideas to life? Let's collaborate on creating something amazing that stands out.
          </p>

          <div className="flex flex-wrap gap-1 mt-auto">
            <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
              Custom
            </Badge>
            <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
              Innovative
            </Badge>
            <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
              Modern
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PortfolioPage() {
  const [lightboxData, setLightboxData] = useState<{
    images: { url: string; alt: string }[]
    index: number
  } | null>(null)
  const bgImage = '/background.avif'

  const openLightbox = (images: { url: string; alt: string }[], index: number) => {
    setLightboxData({ images, index })
  }

  const closeLightbox = () => {
    setLightboxData(null)
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `url("${bgImage}")`,
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />
      <div className="fixed inset-0 bg-background/10 -z-10" />

      <div className="relative min-h-screen p-3 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl mx-auto bg-white dark:bg-card rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
          <nav className="border-b border-border px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
            <div className="flex items-center justify-between gap-2">
              <Link href="/" className="flex items-center gap-1.5 sm:gap-2 min-w-0 hover:opacity-80 transition-opacity">
                <LogoImage
                  src="/logo.svg"
                  alt="ZaneEnterprise Logo"
                  width={48}
                  height={48}
                  className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-shrink-0 transition-all duration-300 hover:scale-110 hover:rotate-12 hover:brightness-125"
                />
                <div className="text-base sm:text-lg lg:text-xl truncate">
                  <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}>Zane</span>
                  <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 200 }}>Enterprise</span>
                </div>
              </Link>

              <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
                <Link href="/contact">
                  <Button
                    size="sm"
                    className="bg-foreground text-background hover:bg-foreground/90 text-xs sm:text-sm px-2 sm:px-3"
                  >
                    Contact
                  </Button>
                </Link>
                <Link href="/">
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
                  <Card
                    key={project.id}
                    className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <CardContent className="p-0">
                      <div className="p-3 sm:p-4">
                        <ProjectCarousel project={project} onImageClick={openLightbox} />
                      </div>

                      <div className="px-3 sm:px-4 pb-4 flex flex-col min-h-[200px]">
                        <div className="space-y-0.5 mb-2.5">
                          <h2 className="text-base sm:text-lg font-bold text-foreground">{project.title}</h2>
                          <p className="text-xs font-medium text-brand">{project.tagline}</p>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">{project.description}</p>

                        <div className="flex flex-wrap gap-1 mt-auto">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0 h-5">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                  <Link href="/contact" className="w-full sm:w-auto">
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

          <footer className="border-t border-border px-4 py-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-4">
                <a
                  href="https://zaneenterprise.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <span className="text-xs sm:text-sm text-muted-foreground">Made by</span>
                  <LogoImage src="/logo.svg" alt="Z logo" width={24} height={24} className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs sm:text-sm">
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}>Zane</span>
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 200 }}>Enterprise</span>
                    <span className="text-muted-foreground ml-0.5">LLC</span>
                  </span>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {lightboxData && (
        <ImageLightbox projectImages={lightboxData.images} initialIndex={lightboxData.index} onClose={closeLightbox} />
      )}
    </div>
  )
}
