"use client"

import { useEffect, useState } from "react"
import Footer from "@/components/footer"

export default function Home() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineText, setCurrentLineText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [subline, setSubline] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  const reactCodeLines = [
    "export default function ZaneEnterprise() {",
    "  return (",
    '    <div className="container">',
    "      <h1>App & Website Development</h1>",
    "      <nav>",
    '        <a href="/portfolio">Portfolio</a>',
    '        <a href="/contact">Contact</a>',
    "      </nav>",
    "    </div>",
    "  )",
    "}",
    " ",
    "// Sick of boring sites and apps?",
    "// I'll build one that's legit.",
  ]

  const lines = [
    "Want a site or app that's actually awesome? <a href=\"/contact\">Let's chat</a>, I'll build it better than you imagined.",
    "Want a site or app that doesn't suck? <a href=\"/contact\">I'll build it</a> and make it awesome.",
    'Need a killer site or app? <a href="/contact">Hit me up</a>, I build cool stuff for cool people.',
    "Tired of mediocre apps and boring sites? <a href=\"/contact\">Let's fix that</a>, I'll create something badass.",
    "Want your site or app to actually stand out? <a href=\"/contact\">Let's talk</a>, I'll handle the rest.",
    "Sick of boring sites and apps? <a href=\"/contact\">I'll build one</a> that's legit.",
    'Ready for a site or app that slaps? <a href="/contact">Reach out</a> and I\'ll make it happen.',
    'Need a site or app with personality? <a href="/contact">I\'ve got you covered</a>',
    'Your idea deserves more than a basic app. <a href="/contact">Let\'s make it epic</a>',
    "Done with dull, lifeless apps? <a href=\"/contact\">I'll build something</a> you'll brag about.",
    "Stop settling for average, <a href=\"/contact\">I'll craft a site or app</a> you'll actually love.",
    'Want to finally be proud of your website or app? <a href="/contact">Let\'s chat</a> and get it built right.',
    'Your app idea plus my skills equals something seriously cool. <a href="/contact">Let\'s talk</a>',
    'Forget cookie cutter. <a href="/contact">I\'ll make your website or app</a> genuinely awesome.',
    'Want a website or app worth sharing? <a href="/contact">Say the word</a> and I\'ll build it.',
    'No more yawning at your own website. <a href="/contact">I\'ll give you something</a> fresh and exciting.',
    'Tired of stale apps and boring websites? <a href="/contact">Hit me up</a> for something worth your time.',
    'Ready to level up your site or app? <a href="/contact">Let me build you something</a> you won\'t hate.',
    'Want a website or app people will actually notice? <a href="/contact">Let\'s get started</a>',
  ]

  useEffect(() => {
    const randomLine = lines[Math.floor(Math.random() * lines.length)]
    let currentLineIndex = 0
    let currentCharIndex = 0

    const typingInterval = setInterval(() => {
      if (currentLineIndex < reactCodeLines.length) {
        const currentLine = reactCodeLines[currentLineIndex]

        if (currentCharIndex < currentLine.length) {
          setCurrentLineText(currentLine.slice(0, currentCharIndex + 1))
          currentCharIndex++
        } else {
          setDisplayedLines((prev) => [...prev, currentLine])
          setCurrentLineText("")
          currentLineIndex++
          currentCharIndex = 0
        }
      } else {
        clearInterval(typingInterval)
        setShowCursor(false)
        setTimeout(() => {
          setSubline(randomLine)
          setTimeout(() => {
            setIsTypingComplete(true)
          }, 500)
        }, 300)
      }
    }, 15)

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorInterval)
    }
  }, [])

  const highlightCode = (code: string, isCurrentLine = false) => {
    const tokens: { text: string; color: string; isLink?: boolean; href?: string }[] = []
    let i = 0

    while (i < code.length) {
      const remaining = code.slice(i)

      if (remaining.match(/^\/\/.*/)) {
        const commentText = remaining.match(/^\/\/.*/)![0]
        const linkMatch = commentText.match(/(.*?)(I'll build one)(.*)/i)

        if (linkMatch && !isCurrentLine) {
          tokens.push({ text: linkMatch[1], color: "text-[#6a9955]" })
          tokens.push({
            text: linkMatch[2],
            color: "text-[#6a9955]",
            isLink: true,
            href: "/contact",
          })
          tokens.push({ text: linkMatch[3], color: "text-[#6a9955]" })
        } else {
          tokens.push({ text: commentText, color: "text-[#6a9955]" })
        }
        i += commentText.length
      } else if (remaining.match(/^Portfolio(?=<\/a>)/)) {
        tokens.push({
          text: "Portfolio",
          color: "text-[#d4d4d4]",
          isLink: isCurrentLine ? false : true,
          href: "/portfolio",
        })
        i += 9
      } else if (remaining.match(/^Contact(?=<\/a>)/)) {
        tokens.push({
          text: "Contact",
          color: "text-[#d4d4d4]",
          isLink: isCurrentLine ? false : true,
          href: "/contact",
        })
        i += 7
      }
      else if (remaining.match(/^(export|default|function|return|const|let|var)\b/)) {
        const match = remaining.match(/^(export|default|function|return|const|let|var)\b/)!
        tokens.push({ text: match[0], color: "text-[#c586c0]" })
        i += match[0].length
      }
      else if (remaining.match(/^[A-Z][a-zA-Z0-9]*(?=\()/)) {
        const match = remaining.match(/^[A-Z][a-zA-Z0-9]*/)!
        tokens.push({ text: match[0], color: "text-[#dcdcaa]" })
        i += match[0].length
      }
      else if (remaining.match(/^<\/?[a-z][a-zA-Z0-9]*/)) {
        const match = remaining.match(/^<\/?[a-z][a-zA-Z0-9]*/)!
        tokens.push({ text: match[0], color: "text-[#4ec9b0]" })
        i += match[0].length
      }
      else if (remaining.match(/^>/)) {
        tokens.push({ text: ">", color: "text-[#4ec9b0]" })
        i += 1
      }
      else if (remaining.match(/^(className|href|id|style)\b/)) {
        const match = remaining.match(/^(className|href|id|style)\b/)!
        tokens.push({ text: match[0], color: "text-[#9cdcfe]" })
        i += match[0].length
      }
      else if (remaining.match(/^"[^"]*"/)) {
        const match = remaining.match(/^"[^"]*"/)!
        tokens.push({ text: match[0], color: "text-[#ce9178]" })
        i += match[0].length
      }
      else {
        tokens.push({ text: code[i], color: "text-[#d4d4d4]" })
        i += 1
      }
    }

    return tokens
      .map((token) => {
        const escapedText = token.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        if (token.isLink && isTypingComplete) {
          return `<a href="${token.href}" class="text-[#4e8bc9] hover:text-[#6ba3d8] underline transition-colors">${escapedText}</a>`
        }
        return `<span class="${token.color}">${escapedText}</span>`
      })
      .join("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1e1e1e] text-[#d4d4d4] font-mono overflow-x-hidden">
      <header className="border-b border-[#2d2d2d] bg-[#252526] px-3 sm:px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs sm:text-sm text-[#cccccc] ml-2 sm:ml-4">zane-enterprise.tsx</span>
        </div>
      </header>

      <main className="flex-1 px-2 sm:px-4 py-6 sm:py-12 overflow-x-hidden w-full">
        <div className="max-w-full sm:max-w-4xl w-full mx-auto overflow-x-hidden">
          <div className="flex items-start gap-1 sm:gap-2 md:gap-4 overflow-x-hidden w-full">
            <div className="text-[#858585] select-none text-right pr-1 sm:pr-2 md:pr-4 border-r border-[#2d2d2d] min-w-[1.5rem] sm:min-w-[2rem] md:min-w-[3rem] flex flex-col items-end text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl flex-shrink-0">
              {displayedLines.map((_, i) => (
                <div key={i} className="leading-relaxed">
                  {i + 1}
                </div>
              ))}
              {currentLineText && <div className="leading-relaxed">{displayedLines.length + 1}</div>}
            </div>

            <div className="flex-1 min-w-0 overflow-x-hidden max-w-full">
              <div className="space-y-0 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl overflow-x-hidden">
                {displayedLines.map((line, i) => (
                  <pre
                    key={i}
                    className="whitespace-pre-wrap sm:whitespace-pre leading-relaxed overflow-x-hidden break-words sm:break-normal max-w-full"
                    dangerouslySetInnerHTML={{ __html: highlightCode(line) }}
                  />
                ))}
                {currentLineText && (
                  <pre
                    className="whitespace-pre-wrap sm:whitespace-pre leading-relaxed overflow-x-hidden break-words sm:break-normal max-w-full"
                    dangerouslySetInnerHTML={{
                      __html:
                        highlightCode(currentLineText, true) +
                        (showCursor ? '<span class="text-[#d4d4d4] animate-pulse">|</span>' : ""),
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
