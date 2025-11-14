"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Code2, Smartphone, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { codeExamples } from "@/lib/code-examples"

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
  const [currentTagline, setCurrentTagline] = useState(() => Math.floor(Math.random() * taglines.length))
  const [scrollOffset, setScrollOffset] = useState(0)
  const [selectedCodeExample, setSelectedCodeExample] = useState(() => Math.floor(Math.random() * codeExamples.length))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const codeLines = codeExamples[selectedCodeExample] ?? []
    const singleCodeHeight = Math.max(codeLines.length, 1) * 32
    setScrollOffset(0)

    const interval = setInterval(() => {
      setScrollOffset((prev) => {
        const next = prev + 0.5
        if (next >= singleCodeHeight) {
          return 0
        }
        return next
      })
    }, 20)

    return () => clearInterval(interval)
  }, [selectedCodeExample])

  const codeSnippets = codeExamples[selectedCodeExample]
  const allLines = [...codeSnippets, ...codeSnippets, ...codeSnippets, ...codeSnippets]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: 'url("/desert-joshua-tree-landscape.jpg")',
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />
      <div className="fixed inset-0 bg-background/10 -z-10" />

      <div className="relative min-h-screen p-3 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl mx-auto bg-white dark:bg-card rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
          <nav className="border-b border-border px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
            <div className="flex items-center justify-between gap-2">
              <Link href="/" className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <Image
                  src="/logo.svg"
                  alt="ZaneEnterprise Logo"
                  width={48}
                  height={48}
                  className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-shrink-0 transition-transform transition-filter transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 hover:rotate-[10deg] hover:brightness-110 hover:opacity-90"
                />
                <div className="text-base sm:text-lg lg:text-xl truncate">
                  <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}>Zane</span>
                  <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 200 }}>Enterprise</span>
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              </div>

              <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
                <Link href="/contact">
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

          <main className="px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-10 lg:py-16">
            <div className="max-w-4xl mx-auto text-center space-y-2 sm:space-y-6 lg:space-y-8">
              <div className="text-brand text-xs sm:text-base lg:text-lg font-bold tracking-wider sm:tracking-widest uppercase leading-normal sm:leading-relaxed bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent">
                Web and App Development
              </div>

              <div className="min-h-[60px] sm:min-h-[100px] lg:min-h-[120px] flex items-center justify-center px-1 overflow-hidden">
                {mounted && (
                  <div className="animate-soft-fade-in w-full">
                    <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance text-foreground leading-tight">
                      {taglines[currentTagline].text}
                    </h1>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto text-balance px-1">
                I build exceptional web and mobile apps that people love to use. No boring templates, just custom
                solutions.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-1.5 sm:gap-3 pt-1 sm:pt-4 px-1">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto sm:min-w-[160px] text-sm sm:text-base"
                  >
                    Contact Me
                  </Button>
                </Link>
                <Link href="/portfolio">
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
                        key={index}
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
                  <div className="bg-[#1e1e1e] rounded-lg p-1 sm:p-4 lg:p-8 text-left font-mono text-[8px] sm:text-xs lg:text-base overflow-hidden h-48 sm:h-80 lg:h-96 relative w-full">
                    <div
                      className="absolute inset-0 p-1 sm:p-4 lg:p-8"
                      style={{
                        transform: `translateY(-${scrollOffset}px)`,
                      }}
                    >
                      {allLines.map((line, index) => (
                        <div
                          key={`${index}-${line?.substring(0, 20)}`}
                          className="text-green-400 leading-loose whitespace-pre min-h-[32px] flex items-start"
                        >
                          {line || "\u00A0"}
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-6 sm:h-10 lg:h-12 bg-gradient-to-b from-[#1e1e1e] to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-10 lg:h-12 bg-gradient-to-t from-[#1e1e1e] to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="border-t border-border px-3 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs sm:text-sm text-muted-foreground text-center mb-1.5 sm:mb-4 lg:mb-6">
                Built with industry-leading technologies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 lg:gap-6 opacity-50 mb-3 sm:mb-8">
                <div className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">React</div>
                <div className="hidden sm:block text-muted-foreground">•</div>
                <div className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">Swift</div>
                <div className="hidden sm:block text-muted-foreground">•</div>
                <div className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">JavaScript</div>
                <div className="hidden sm:block text-muted-foreground">•</div>
                <div className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">Python</div>
                <div className="hidden sm:block text-muted-foreground">•</div>
                <div className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">HTML</div>
                <div className="hidden sm:block text-muted-foreground">•</div>
                <div className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">CSS</div>
              </div>
              <div className="text-center py-2 sm:py-4 border-t border-border/50">
                <a
                  href="https://zaneenterprise.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <span className="text-xs sm:text-sm text-muted-foreground">Made by</span>
                  <Image src="/logo.svg" alt="Z logo" width={24} height={24} className="h-5 w-5 sm:h-6 sm:w-6" />
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
    </div>
  )
}
