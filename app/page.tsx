import { Button } from "@/components/ui/button"
import Link from "next/link"

import { LandingFooter } from "@/components/landing-footer"
import { DynamicTagline } from "@/components/dynamic-tagline"
import { DynamicCodeMarquee } from "@/components/dynamic-code-marquee"
import { BrandLogo } from "@/components/brand-logo"
import { services } from "@/lib/data"

export default function LandingPage() {

  return (
    <div className="relative min-h-screen p-3 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto bg-white dark:bg-card rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[calc(100vh-1.5rem*2)]">
        <nav className="border-b border-border px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" prefetch={false} className="min-w-0">
              <BrandLogo />
            </Link>

            <div className="hidden lg:flex items-center gap-6 xl:gap-8" />

            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              <Link href="/contact" prefetch={false}>
                <Button
                  size="sm"
                  className="bg-foreground text-background hover:bg-foreground/90 text-xs sm:text-sm px-2 sm:px-3"
                >
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <main className="px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-10 lg:py-16 flex-1">
          <div className="max-w-4xl mx-auto text-center space-y-2 sm:space-y-6 lg:space-y-8">
            <div className="text-brand text-xs sm:text-base lg:text-lg font-bold tracking-wider sm:tracking-widest uppercase leading-normal sm:leading-relaxed bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent">
              Web and App Development
            </div>

            <div className="min-h-[60px] sm:min-h-[100px] lg:min-h-[120px] flex items-center justify-center px-1 overflow-hidden">
              <div className="animate-soft-fade-in w-full">
                <DynamicTagline />
              </div>
            </div>

            <p className="text-xs sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto text-balance px-1">
              I build exceptional web and mobile apps that people love to use. No boring templates, just custom solutions.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-1.5 sm:gap-3 pt-1 sm:pt-4 px-1">
              <Link href="/contact" prefetch={false}>
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto sm:min-w-[160px] text-sm sm:text-base"
                >
                  Contact Me
                </Button>
              </Link>
              <Link href="/portfolio" prefetch={false}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto sm:min-w-[160px] bg-transparent border-2 text-sm sm:text-base"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>

            <div className="pt-3 sm:pt-8 lg:pt-12">
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 px-0.5">
                {services.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <div
                      key={service.label}
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Icon className="h-4 w-4 text-brand flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">
                        {service.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="pt-3 sm:pt-8 lg:pt-12 max-w-6xl mx-auto">
            <div className="rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-border bg-muted/30 p-1 sm:p-4 lg:p-6 backdrop-blur-sm w-full">
              <div className="space-y-1 sm:space-y-3">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-destructive" />
                  <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-chart-4" />
                  <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                </div>
                <DynamicCodeMarquee />
              </div>
            </div>
          </div>
        </main>
        <LandingFooter />
      </div>
    </div>
  )
}
