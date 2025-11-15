import { Button } from "@/components/ui/button"
import { Code2, Smartphone, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { CodeMarquee } from "@/components/code-marquee"
import { LandingFooter } from "@/components/landing-footer"
import { codeExamples } from "@/lib/code-examples"
import { getBunnyCDNUrl } from "@/lib/cdn-utils"

export const dynamic = "force-dynamic"

const taglines = [
  { text: "Want a site or app that's actually awesome?" },
  { text: "Want a site or app that doesn't suck?" },
  { text: "Need a killer site or app?" },
  { text: "Tired of mediocre apps and boring sites?" },
  { text: "Want your site or app to actually stand out?" },
  { text: "Sick of boring sites and apps?" },
  { text: "Ready for a site or app that slaps?" },
  { text: "Need a site or app with personality?" },
  { text: "Your idea deserves more than a basic app." },
  { text: "Done with dull, lifeless apps?" },
  { text: "Want to finally be proud of your website or app?" },
  { text: "Your app idea plus my skills equals something seriously cool." },
  { text: "Forget cookie cutter." },
  { text: "Want a website or app worth sharing?" },
  { text: "No more yawning at your own website." },
  { text: "Tired of stale apps and boring websites?" },
  { text: "Ready to level up your site or app?" },
  { text: "Want a website or app that people will actually notice?" },
]

const services = [
  { icon: Code2, label: "Web Development" },
  { icon: Smartphone, label: "App Development" },
  { icon: Zap, label: "Fast Delivery" },
]

export default function LandingPage() {
  const highlightedTagline = taglines[Math.floor(Math.random() * taglines.length)]
  const snippet = codeExamples[Math.floor(Math.random() * codeExamples.length)] ?? []
  const logoSrc = getBunnyCDNUrl("/logo.svg", { width: 96, quality: 90, auto_optimize: "low" })

  return (
    <div className="relative min-h-screen p-3 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto bg-white dark:bg-card rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[calc(100vh-1.5rem*2)]">
        <nav className="border-b border-border px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" prefetch={false} className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Image
                src={logoSrc}
                alt="ZaneEnterprise Logo"
                width={48}
                height={48}
                className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-shrink-0 transition-transform transition-filter transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 hover:rotate-[10deg] hover:brightness-110 hover:opacity-90"
                priority
                unoptimized
              />
              <div className="text-base sm:text-lg lg:text-xl truncate">
                <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}>Zane</span>
                <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 200 }}>Enterprise</span>
              </div>
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
                <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance text-foreground leading-tight">
                  {highlightedTagline.text}
                </h1>
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
                <CodeMarquee snippet={snippet} />
              </div>
            </div>
          </div>
        </main>
        <LandingFooter />
      </div>
    </div>
  )
}
