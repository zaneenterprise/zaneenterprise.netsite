"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Footer from "@/components/footer"
import Link from "next/link"

type Step = "name" | "email" | "message" | "confirm" | "complete"

export default function Contact() {
  const [step, setStep] = useState<Step>("name")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [currentInput, setCurrentInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    "ZaneEnterprise Contact Terminal v1.0",
    "",
    "📞 Call: 877-730-ZANE (877-730-9263)",
    "",
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [step])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    const timer = setTimeout(() => {
      setHistory((prev) => [...prev, "> What is your name?"])
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (step !== "complete" && document.activeElement !== inputRef.current) {
        if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1 && e.key !== "Tab" && e.key !== "Escape") {
          inputRef.current?.focus()
        }
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [step])

  const handlePageClick = () => {
    if (step !== "complete") {
      inputRef.current?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentInput.trim() && step !== "confirm") return

    const input = currentInput.trim()

    if (input.toLowerCase() === "exit") {
      window.location.href = "/"
      return
    }

    switch (step) {
      case "name":
        setFormData((prev) => ({ ...prev, name: input }))
        setHistory((prev) => [...prev, `  ${input}`, "", "> Email address?"])
        setStep("email")
        break

      case "email":
        if (!input.includes("@")) {
          setHistory((prev) => [...prev, `  ${input}`, "! Invalid email", "", "> Email address?"])
          setCurrentInput("")
          return
        }
        setFormData((prev) => ({ ...prev, email: input }))
        setHistory((prev) => [...prev, `  ${input}`, "", "> Your message?"])
        setStep("message")
        break

      case "message":
        setFormData((prev) => ({ ...prev, message: input }))
        setHistory((prev) => [
          ...prev,
          `  ${input}`,
          "",
          "──────────────────────",
          `Name:    ${formData.name}`,
          `Email:   ${input}`,
          `Message: ${input}`,
          "──────────────────────",
          "",
          "> Send? (yes/no)",
        ])
        setStep("confirm")
        break

      case "confirm":
        const response = input.toLowerCase()
        if (response === "yes" || response === "y") {
          setHistory((prev) => [...prev, `  ${input}`, "", "⟳ Sending..."])

          if (formRef.current) {
            try {
              const formElement = formRef.current
              const formDataToSend = new FormData(formElement)

              const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formDataToSend,
              })

              if (res.ok) {
                setHistory((prev) => [...prev.slice(0, -1), "✓ Message sent!", "", "We'll get back to you soon."])
              } else {
                setHistory((prev) => [...prev.slice(0, -1), "✗ Failed to send. Try again."])
              }
            } catch (error) {
              setHistory((prev) => [...prev.slice(0, -1), "✗ Network error. Try again."])
            }
          }
          setStep("complete")
        } else if (response === "no" || response === "n") {
          setHistory((prev) => [
            ...prev,
            `  ${input}`,
            "",
            "✗ Cancelled",
            "",
            "ZaneEnterprise Contact Terminal v1.0",
            "",
            "📞 Call: 877-730-ZANE (877-730-9263)",
            "",
            "> What is your name?",
          ])
          setFormData({ name: "", email: "", message: "" })
          setStep("name")
        } else {
          setHistory((prev) => [...prev, `  ${input}`, "! Type 'yes' or 'no'", "", "> Send? (yes/no)"])
        }
        break
    }

    setCurrentInput("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-black font-mono" onClick={handlePageClick}>
      <header className="border-b border-green-900/30 bg-black px-3 sm:px-4 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/z.svg" alt="Z" className="w-5 h-5 sm:w-6 sm:h-6" />
          <div className="flex items-baseline">
            <span className="text-sm sm:text-base font-medium text-green-400">Zane</span>
            <span className="text-sm sm:text-base text-green-400/70">Enterprise</span>
          </div>
        </Link>
        <span className="text-xs text-green-600">terminal</span>
      </header>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div ref={terminalRef} className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-0.5 text-xs sm:text-sm">
          {history.map((line, i) => (
            <div
              key={i}
              className={`leading-relaxed ${
                line.startsWith(">")
                  ? "text-green-400 font-semibold"
                  : line.startsWith("!")
                    ? "text-red-400"
                    : line.startsWith("✓")
                      ? "text-green-400"
                      : line.startsWith("✗") || line.startsWith("⟳")
                        ? "text-yellow-400"
                        : line.startsWith("─")
                          ? "text-green-700"
                          : line.startsWith(" ")
                            ? "text-green-300 pl-3"
                            : "text-green-500"
              }`}
            >
              {line || "\u00A0"}
            </div>
          ))}

          <form ref={formRef} className="hidden">
            <input type="hidden" name="access_key" value="5e473c65-d194-41d6-9e6e-36b98694c848" />
            <input type="hidden" name="subject" value="New Contact from ZaneEnterprise Website" />
            <input type="text" name="name" value={formData.name} readOnly />
            <input type="email" name="email" value={formData.email} readOnly />
            <textarea name="message" value={formData.message} readOnly />
          </form>

          {step !== "complete" && (
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
              <span className="text-green-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-green-300 caret-green-400 text-xs sm:text-sm"
                autoComplete="off"
                spellCheck="false"
                placeholder="Type 'exit' to return home..."
              />
            </form>
          )}

          {step === "complete" && (
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setHistory([
                    "ZaneEnterprise Contact Terminal v1.0",
                    "",
                    "📞 Call: 877-730-ZANE (877-730-9263)",
                    "",
                    "> What is your name?",
                  ])
                  setFormData({ name: "", email: "", message: "" })
                  setCurrentInput("")
                  setStep("name")
                }}
                className="text-green-400 hover:text-green-300 underline text-xs sm:text-sm block"
              >
                → Send another message
              </button>
              <Link href="/" className="text-green-400 hover:text-green-300 underline text-xs sm:text-sm block">
                → Return home
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
