"use client"

import { useEffect, useState } from "react"
import Footer from "@/components/footer"

export default function Home() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineText, setCurrentLineText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [randomLineIndex] = useState(() => Math.floor(Math.random() * 19))

  const lines = [
    { part1: "// Want a site or app that's actually awesome?", part2: "// Let's chat, I'll build it better than you imagined.", linkText: "Let's chat" },
    { part1: "// Want a site or app that doesn't suck?", part2: "// I'll build it and make it awesome.", linkText: "I'll build it" },
    { part1: "// Need a killer site or app?", part2: "// Hit me up, I build cool stuff for cool people.", linkText: "Hit me up" },
    { part1: "// Tired of mediocre apps and boring sites?", part2: "// Let's fix that, I'll create something badass.", linkText: "Let's fix that" },
    { part1: "// Want your site or app to actually stand out?", part2: "// Let's talk, I'll handle the rest.", linkText: "Let's talk" },
    { part1: "// Sick of boring sites and apps?", part2: "// I'll build one that's legit.", linkText: "I'll build one" },
    { part1: "// Ready for a site or app that slaps?", part2: "// Reach out and I'll make it happen.", linkText: "Reach out" },
    { part1: "// Need a site or app with personality?", part2: "// I've got you covered.", linkText: "I've got you covered" },
    { part1: "// Your idea deserves more than a basic app.", part2: "// Let's make it epic.", linkText: "Let's make it epic" },
    { part1: "// Done with dull, lifeless apps?", part2: "// I'll build something you'll brag about.", linkText: "I'll build something" },
    { part1: "// Stop settling for average,", part2: "// I'll craft a site or app you'll actually love.", linkText: "I'll craft a site or app" },
    { part1: "// Want to finally be proud of your website or app?", part2: "// Let's chat and get it built right.", linkText: "Let's chat" },
    { part1: "// Your app idea plus my skills equals something seriously cool.", part2: "// Let's talk.", linkText: "Let's talk" },
    { part1: "// Forget cookie cutter.", part2: "// I'll make your website or app genuinely awesome.", linkText: "I'll make your website or app" },
    { part1: "// Want a website or app worth sharing?", part2: "// Say the word and I'll build it.", linkText: "Say the word" },
    { part1: "// No more yawning at your own website.", part2: "// I'll give you something fresh and exciting.", linkText: "I'll give you something" },
    { part1: "// Tired of stale apps and boring websites?", part2: "// Hit me up for something worth your time.", linkText: "Hit me up" },
    { part1: "// Ready to level up your site or app?", part2: "// Let me build you something you won't hate.", linkText: "Let me build you something" },
    { part1: "// Want a website or app people will actually notice?", part2: "// Let's get started.", linkText: "Let's get started" },
  ]

  const randomLine = lines[randomLineIndex]

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
    randomLine.part1,
    randomLine.part2,
  ]

  useEffect(() => {
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
          setIsTypingComplete(true)
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

  const highlightCode = (code: string, isCurrentLine = false, lineNumber = 0) => {
    const tokens: { text: string; color: string; isLink?: boolean; href?: string }[] = []
    let i = 0

    while (i < code.length) {
      const remaining = code.slice(i)

      if (remaining.match(/^\/\/.*/)) {
        const commentText = remaining.match(/^\/\/.*/)![0]
        
        if (lineNumber === 13 && !isCurrentLine && randomLine.linkText) {
          const linkText = randomLine.linkText
          const linkIndex = commentText.indexOf(linkText)
          
          if (linkIndex !== -1) {
            if (linkIndex > 0) {
              tokens.push({ text: commentText.substring(0, linkIndex), color: "text-[#6a9955]" })
            }
            tokens.push({
              text: linkText,
              color: "text-[#6a9955]",
              isLink: true,
              href: "/contact",
            })
            const afterLinkIndex = linkIndex + linkText.length
            if (afterLinkIndex < commentText.length) {
              tokens.push({ text: commentText.substring(afterLinkIndex), color: "text-[#6a9955]" })
            }
          } else {
            tokens.push({ text: commentText, color: "text-[#6a9955]" })
          }
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
        <div className="text-xs sm:text-sm text-[#cccccc] font-mono pr-10">
          877-730-ZANE
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
                    dangerouslySetInnerHTML={{ __html: highlightCode(line, false, i) }}
                  />
                ))}
                {currentLineText && (
                  <pre
                    className="whitespace-pre-wrap sm:whitespace-pre leading-relaxed overflow-x-hidden break-words sm:break-normal max-w-full"
                    dangerouslySetInnerHTML={{
                      __html:
                        highlightCode(currentLineText, true, displayedLines.length) +
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
