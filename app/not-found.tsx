import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"
import { SiteFooter } from "@/components/site-footer"

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-x-hidden p-3 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto bg-white dark:bg-card rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[calc(100vh-1.5rem*2)]">
        <nav className="border-b border-border px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="min-w-0 hover:opacity-80 transition-opacity">
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
            </div>
          </div>
        </nav>

        <main className="flex-1 px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex items-center">
          <div className="w-full max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            <p className="text-brand text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] uppercase bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent">
              Error 404
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
              This page took a wrong turn
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              The link might be outdated, mistyped, or moved. Let&apos;s get you back to something useful.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
              <Button asChild className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto bg-transparent">
                <Link href="/portfolio">
                  View Portfolio
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full sm:w-auto">
                <Link href="/contact">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Contact Me
                </Link>
              </Button>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}
