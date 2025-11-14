"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { LogoImage } from "@/components/cdn-image"
import { getBunnyCDNUrl } from "@/lib/cdn-utils"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setSubmitStatus("success")
        ;(e.target as HTMLFormElement).reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const bgImage = getBunnyCDNUrl('/background.avif', { width: 1920, quality: 75, auto_optimize: 'medium' })
  
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
                <Link href="/">
                  <Button variant="ghost" size="sm" className="gap-2 text-xs sm:text-sm px-2 sm:px-3">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                </Link>
              </div>
            </div>
          </nav>

          <main className="px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-10 lg:py-16">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              <div className="text-center space-y-2 sm:space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Reach out to get started
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
                  Ready to start your project? Let's talk about how I can help bring your ideas to life.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Contact Information</CardTitle>
                    <CardDescription>Get in touch via phone or fill out the form</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-muted/50">
                        <Phone className="h-5 w-5 text-brand mt-0.5 flex-shrink-0" />
                        <div className="space-y-1 min-w-0 flex-1 overflow-hidden">
                          <p className="text-sm font-medium text-foreground">Call Me</p>
                          <a href="tel:877-730-9263" className="text-brand hover:underline font-semibold block">
                            <div className="flex flex-col sm:flex-row sm:gap-1">
                              <span className="text-lg sm:text-xl lg:text-2xl">877-730-ZANE</span>
                              <span className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                                (877-730-9263)
                              </span>
                            </div>
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                        <Mail className="h-5 w-5 text-brand mt-0.5 flex-shrink-0" />
                        <div className="space-y-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">Email</p>
                          <p className="text-sm text-muted-foreground">Or use the contact form to send a message</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-semibold text-foreground mb-3">What I Can Help With</h3>
                      <ul className="space-y-4 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-brand mt-0.5">✓</span>
                          <span>Custom web and mobile app development</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand mt-0.5">✓</span>
                          <span>UI/UX design and modern interfaces</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand mt-0.5">✓</span>
                          <span>Full-stack development and API integration</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand mt-0.5">✓</span>
                          <span>Consultation and technical guidance</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Send a Message</CardTitle>
                    <CardDescription>Fill out the form and I'll get back to you soon</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input type="hidden" name="access_key" value="5e473c65-d194-41d6-9e6e-36b98694c848" />
                      <input type="hidden" name="subject" value="New Contact Form Submission from ZaneEnterprise" />

                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="Your name" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell me about your project..."
                          rows={5}
                          required
                        />
                      </div>

                      {submitStatus === "success" && (
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                          <p className="text-sm text-green-600 dark:text-green-400">
                            Message sent successfully! I'll get back to you soon.
                          </p>
                        </div>
                      )}

                      {submitStatus === "error" && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                          <p className="text-sm text-red-600 dark:text-red-400">
                            Something went wrong. Please try again or call me directly.
                          </p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-foreground text-background hover:bg-foreground/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
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
    </div>
  )
}
