import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import { SiteFooter } from "@/components/site-footer"
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid"

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden p-3 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto bg-white dark:bg-card rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
        <nav className="border-b border-border px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/"
              className="min-w-0 hover:opacity-80 transition-opacity"
            >
              <BrandLogo />
            </Link>

            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              <Button
                asChild
                size="sm"
                className="bg-foreground text-background hover:bg-foreground/90 text-xs sm:text-sm px-2 sm:px-3"
              >
                <Link href="/contact">
                  Contact
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="gap-2 text-xs sm:text-sm px-2 sm:px-3">
                <Link href="/" aria-label="Back to home">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Back</span>
                </Link>
              </Button>
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

            <PortfolioGrid />

            <div className="text-center space-y-2 sm:space-y-3 pt-4 sm:pt-6 pb-2 px-2">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-foreground">
                Ready to Start Your Project?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                Let&apos;s build something exceptional together.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                <Button
                  asChild
                  size="sm"
                  className="bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto"
                >
                  <Link href="/contact">
                    Start a Project
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Link href="/">
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}
