"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Folder, ChevronLeft, ChevronRight, Home, Clock, ImageIcon, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/footer"

const projectData = {
  Pawcasso: {
    images: [
      {
        src: "/projects/pawcasso/pawcasso1.webp",
        caption: "Choose from multiple color themes including Vibrant, Pastel, Ocean, Sunset, and seasonal options",
      },
      {
        src: "/projects/pawcasso/pawcasso2.webp",
        caption: "Watch your cat chase the bird and create unique digital artwork",
      },
      {
        src: "/projects/pawcasso/pawcasso3.webp",
        caption: "Cat-approved interactive painting experience with real-time canvas updates",
      },
    ],
  },
  "AZBuddy.Cash": {
    images: [
      {
        src: "/projects/azbuddy/azbuddy1.webp",
        caption:
          "The complete homepage showcasing the artist's brand with a modern, clean design and seamless navigation.",
      },
      {
        src: "/projects/azbuddy/azbuddy2.webp",
        caption:
          "Custom-designed animated buttons that match website theme and seamlessly link to sections on same page.",
      },
      {
        src: "/projects/azbuddy/azbuddy3.webp",
        caption:
          "Buttons and scrollbar match custom theme design for visual consistency. Carefully crafted cohesive branding.",
      },
    ],
  },
  GardenerPlus: {
    images: [
      {
        src: "/projects/gardenerplus/gard1.webp",
        caption: "The main dashboard displays all your plants with quick health status and watering schedules.",
      },
      {
        src: "/projects/gardenerplus/gard2.webp",
        caption: "Detailed plant profiles with care instructions, watering history, and personalized growth tracking.",
      },
      {
        src: "/projects/gardenerplus/gard3.webp",
        caption: "AI-powered plant health analysis that diagnoses issues and provides treatment recommendations.",
      },
    ],
  },
}

function ImageViewer({
  id,
  image,
  initialPosition,
  zIndex,
  isMinimized,
  onClose,
  onBringToFront,
  onUpdatePosition,
  onMinimize,
}: {
  id: string
  image: { src: string; caption: string } | null
  initialPosition: { x: number; y: number }
  zIndex: number
  isMinimized: boolean
  onClose: () => void
  onBringToFront: () => void
  onUpdatePosition: (pos: { x: number; y: number }) => void
  onMinimize: () => void
}) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isMaximized, setIsMaximized] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [windowSize, setWindowSize] = useState({ width: 700, height: 500 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (imageDimensions.width > 0 && imageDimensions.height > 0 && !isMaximized) {
      const isMobile = window.innerWidth < 768
      const maxWidth = isMobile ? window.innerWidth * 0.95 : window.innerWidth * 0.85
      const maxHeight = isMobile ? window.innerHeight * 0.85 : window.innerHeight * 0.75
      const captionHeight = 60
      const headerHeight = 50
      const padding = isMobile ? 16 : 32

      let targetWidth = imageDimensions.width
      let targetHeight = imageDimensions.height

      if (targetWidth > maxWidth) {
        const scale = maxWidth / targetWidth
        targetWidth = maxWidth
        targetHeight = targetHeight * scale
      }

      if (targetHeight > maxHeight - headerHeight - captionHeight - padding) {
        const scale = (maxHeight - headerHeight - captionHeight - padding) / targetHeight
        targetHeight = maxHeight - headerHeight - captionHeight - padding
        targetWidth = targetWidth * scale
      }

      targetWidth = Math.max(isMobile ? 300 : 400, targetWidth)
      targetHeight = Math.max(isMobile ? 250 : 300, targetHeight)

      const finalWidth = Math.round(targetWidth + padding)
      const finalHeight = Math.round(targetHeight + headerHeight + captionHeight + padding)

      setWindowSize({
        width: finalWidth,
        height: finalHeight,
      })

      setPosition({
        x: Math.max(10, (window.innerWidth - finalWidth) / 2),
        y: Math.max(60, (window.innerHeight - finalHeight) / 2),
      })
    }
  }, [imageDimensions, isMaximized])

  useEffect(() => {
    if (image) {
      setImageDimensions({ width: 0, height: 0 })
    }
  }, [image])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        requestAnimationFrame(() => {
          const newPos = {
            x: e.clientX - dragOffset.x,
            y: e.clientY - dragOffset.y,
          }
          setPosition(newPos)
          onUpdatePosition(newPos)
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = "none"
      document.body.style.cursor = "grabbing"
    } else {
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }
  }, [isDragging, dragOffset, isMaximized, onUpdatePosition])

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
    setIsDragging(true)
  }

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement
    setImageDimensions({ width: img.width, height: img.height })
  }

  if (!image) return null

  if (isMinimized) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onBringToFront()
        }
      }}
    >
      <div
        ref={windowRef}
        className={`pointer-events-auto bg-[#1e1e1e] rounded-xl shadow-2xl border border-[#3d3d3d] overflow-hidden flex flex-col ${
          isMaximized ? "w-[95vw] sm:w-[90vw] h-[95vh] sm:h-[90vh]" : ""
        }`}
        style={
          isMaximized
            ? { position: "fixed", top: "2.5vh", left: "2.5vw" }
            : {
                position: "fixed",
                transform: `translate(${position.x}px, ${position.y}px)`,
                willChange: isDragging ? "transform" : "auto",
                width: `${windowSize.width}px`,
                maxWidth: "95vw",
                maxHeight: "90vh",
              }
        }
        onClick={onBringToFront}
      >
        <div
          className={`bg-gradient-to-b from-[#2d2d2d] to-[#252526] border-b border-[#3d3d3d] px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between flex-shrink-0 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
              <button
                onClick={onClose}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] hover:shadow-[0_0_8px_rgba(255,59,48,0.6)] transition-all block"
                title="Close"
              />
              <button
                onClick={onMinimize}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e] hover:bg-[#ffcc00] hover:shadow-[0_0_8px_rgba(255,204,0,0.6)] transition-all"
                title="Minimize"
              />
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840] hover:bg-[#30d158] hover:shadow-[0_0_8px_rgba(48,209,88,0.6)] transition-all"
                title="Maximize"
              />
            </div>
            <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 ml-1 sm:ml-2" />
            <span className="text-xs sm:text-sm text-gray-300 font-medium truncate">Image Viewer</span>
          </div>
        </div>

        <div className={`bg-[#1e1e1e] flex items-center justify-center p-2 sm:p-4 overflow-hidden flex-1`}>
          <img
            src={image.src || "/placeholder.svg"}
            alt={image.caption}
            onLoad={handleImageLoad}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>

        <div className="bg-[#252526] border-t border-[#3d3d3d] px-3 sm:px-4 py-2 sm:py-3 flex-shrink-0">
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{image.caption}</p>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [openImages, setOpenImages] = useState<
    Array<{
      id: string
      src: string
      caption: string
      position: { x: number; y: number }
      zIndex: number
      isMinimized: boolean
    }>
  >([])
  const [nextZIndex, setNextZIndex] = useState(100)
  const [selectedSidebarItem, setSelectedSidebarItem] = useState<string>("Projects")
  const [recentItems, setRecentItems] = useState<Array<{ name: string; type: "folder" | "image"; timestamp: Date }>>([])
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [pathInput, setPathInput] = useState("")
  const [isEditingPath, setIsEditingPath] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  useEffect(() => {
    if (position === null && windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: Math.max(50, (window.innerHeight - rect.height) / 2 - 50),
      })
    }
  }, [position])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && position) {
        requestAnimationFrame(() => {
          setPosition({
            x: e.clientX - dragOffset.x,
            y: e.clientY - dragOffset.y,
          })
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = "none"
      document.body.style.cursor = "grabbing"
    } else {
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }
  }, [isDragging, dragOffset, position])

  const projects = [
    { name: "Pawcasso", items: 3, modified: "Oct 1, 2025" },
    { name: "AZBuddy.Cash", items: 3, modified: "Sep 28, 2025" },
    { name: "GardenerPlus", items: 3, modified: "Sep 25, 2025" },
  ]

  const currentImages = selectedFolder ? projectData[selectedFolder as keyof typeof projectData]?.images || [] : []

  const getPath = () => {
    if (selectedFolder) {
      return `${selectedSidebarItem} > ${selectedFolder}`
    }
    return selectedSidebarItem
  }

  const handleSidebarClick = (item: string) => {
    setSelectedSidebarItem(item)
    setSelectedFolder(null)
  }

  const addToRecent = (name: string, type: "folder" | "image") => {
    setRecentItems((prev) => {
      const filtered = prev.filter((item) => item.name !== name)
      return [{ name, type, timestamp: new Date() }, ...filtered].slice(0, 10)
    })
  }

  const handleFolderClick = (folderName: string) => {
    setSelectedFolder(folderName)
    addToRecent(folderName, "folder")
  }

  const handleImageClick = (image: { src: string; caption: string }) => {
    const filename = image.src.split("/").pop() || "image.webp"
    addToRecent(filename, "image")

    const existingImage = openImages.find((img) => img.src === image.src)
    if (existingImage) {
      setOpenImages((prev) =>
        prev.map((img) => (img.id === existingImage.id ? { ...img, zIndex: nextZIndex, isMinimized: false } : img)),
      )
      setNextZIndex((prev) => prev + 1)
      return
    }

    const isMobile = window.innerWidth < 768
    const offset = isMobile ? 0 : openImages.length * 30
    const baseX = isMobile ? 10 : window.innerWidth / 2 - 350
    const baseY = isMobile ? 60 : Math.max(80, window.innerHeight / 2 - 300)

    const newImage = {
      id: `image-${Date.now()}`,
      src: image.src,
      caption: image.caption,
      position: {
        x: baseX + offset,
        y: baseY + offset,
      },
      zIndex: nextZIndex,
      isMinimized: false,
    }
    setOpenImages((prev) => [...prev, newImage])
    setNextZIndex((prev) => prev + 1)
  }

  const handleCloseImage = (id: string) => {
    setOpenImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleBringToFront = (id: string) => {
    setOpenImages((prev) => prev.map((img) => (img.id === id ? { ...img, zIndex: nextZIndex } : img)))
    setNextZIndex((prev) => prev + 1)
  }

  const handleUpdatePosition = (id: string, position: { x: number; y: number }) => {
    setOpenImages((prev) => prev.map((img) => (img.id === id ? { ...img, position } : img)))
  }

  const handlePathNavigation = (path: string) => {
    console.log("Navigating to path:", path)
  }

  const handleMinimizeImage = (id: string) => {
    setOpenImages((prev) => prev.map((img) => (img.id === id ? { ...img, isMinimized: true } : img)))
  }

  const handleRestoreImage = (id: string) => {
    setOpenImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, isMinimized: false, zIndex: nextZIndex } : img)),
    )
    setNextZIndex((prev) => prev + 1)
  }

  const handleFileManagerMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || !position) return
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
    setIsDragging(true)
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex-1 p-2 sm:p-4 md:p-8 flex items-center justify-center">
          {isMinimized ? null : (
            <div
              ref={windowRef}
              className={`bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-[#3d3d3d] ${
                isMaximized ? "fixed inset-2 sm:inset-8 w-auto h-auto" : "w-full max-w-6xl"
              }`}
              style={
                !isMaximized && position
                  ? {
                      position: "fixed",
                      transform: `translate(${position.x}px, ${position.y}px)`,
                      willChange: isDragging ? "transform" : "auto",
                    }
                  : !isMaximized
                    ? { position: "relative" }
                    : undefined
              }
            >
              <div
                className={`bg-gradient-to-b from-[#2d2d2d] to-[#252526] border-b border-[#3d3d3d] px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                onMouseDown={handleFileManagerMouseDown}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                  <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                    <Link
                      href="/"
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] hover:shadow-[0_0_8px_rgba(255,59,48,0.6)] transition-all block"
                      title="Close"
                    />
                    <button
                      onClick={() => setIsMinimized(true)}
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e] hover:bg-[#ffcc00] hover:shadow-[0_0_8px_rgba(255,204,0,0.6)] transition-all"
                      title="Minimize"
                    />
                    <button
                      onClick={() => setIsMaximized(!isMaximized)}
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840] hover:bg-[#30d158] hover:shadow-[0_0_8px_rgba(48,209,88,0.6)] transition-all"
                      title="Maximize"
                    />
                  </div>
                  <span className="ml-2 sm:ml-4 text-xs sm:text-sm text-gray-300 font-medium truncate">
                    {getPath()} - File Manager
                  </span>
                </div>
              </div>

              <div className="bg-[#252526] border-b border-[#3d3d3d] px-2 sm:px-4 py-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                    className="md:hidden p-1.5 rounded hover:bg-[#3d3d3d] text-gray-400 hover:text-white transition-colors"
                  >
                    <Menu className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedFolder(null)}
                      disabled={!selectedFolder}
                      className="p-1 sm:p-1.5 rounded hover:bg-[#3d3d3d] text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button className="p-1 sm:p-1.5 rounded hover:bg-[#3d3d3d] text-gray-400 hover:text-white transition-colors opacity-50 cursor-not-allowed">
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 text-xs bg-[#1e1e1e] rounded px-2 sm:px-3 py-1.5 border border-[#3d3d3d]">
                  <Home className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-400">/</span>
                  {isEditingPath ? (
                    <input
                      type="text"
                      value={pathInput}
                      onChange={(e) => setPathInput(e.target.value)}
                      onBlur={() => {
                        setIsEditingPath(false)
                        handlePathNavigation(pathInput)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setIsEditingPath(false)
                          handlePathNavigation(pathInput)
                        } else if (e.key === "Escape") {
                          setIsEditingPath(false)
                          setPathInput("")
                        }
                      }}
                      autoFocus
                      className="flex-1 bg-transparent text-gray-300 outline-none min-w-0"
                      placeholder="Type path (e.g., Projects/Pawcasso)"
                    />
                  ) : (
                    <button
                      onClick={() => {
                        setIsEditingPath(true)
                        setPathInput(getPath().replace(" > ", "/"))
                      }}
                      className="flex-1 text-left text-gray-300 hover:text-white transition-colors truncate"
                    >
                      <span>{selectedSidebarItem}</span>
                      {selectedFolder && (
                        <>
                          <span className="text-gray-400"> / </span>
                          <span>{selectedFolder}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex h-[400px] sm:h-[500px] relative">
                <div
                  className={`${
                    showMobileSidebar ? "absolute inset-y-0 left-0 z-10" : "hidden"
                  } md:block w-48 bg-[#252526] border-r border-[#3d3d3d] p-3 space-y-1 overflow-y-auto`}
                >
                  <button
                    onClick={() => setShowMobileSidebar(false)}
                    className="md:hidden w-full text-right text-gray-400 hover:text-white mb-2"
                  >
                    ✕
                  </button>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                    Favorites
                  </div>
                  <button
                    onClick={() => {
                      handleSidebarClick("Home")
                      setShowMobileSidebar(false)
                    }}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                      selectedSidebarItem === "Home" ? "bg-[#3d3d3d] text-white" : "text-gray-300 hover:bg-[#3d3d3d]"
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </button>
                  <button
                    onClick={() => {
                      handleSidebarClick("Recent")
                      setShowMobileSidebar(false)
                    }}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                      selectedSidebarItem === "Recent" ? "bg-[#3d3d3d] text-white" : "text-gray-300 hover:bg-[#3d3d3d]"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Recent</span>
                  </button>

                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2 mt-4">
                    Locations
                  </div>
                  <button
                    onClick={() => {
                      handleSidebarClick("Projects")
                      setShowMobileSidebar(false)
                    }}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                      selectedSidebarItem === "Projects"
                        ? "bg-[#3d3d3d] text-white"
                        : "text-gray-300 hover:bg-[#3d3d3d]"
                    }`}
                  >
                    <Folder className="w-4 h-4 text-blue-400 fill-blue-400/20" />
                    <span>Projects</span>
                  </button>
                </div>

                {showMobileSidebar && (
                  <div
                    className="md:hidden absolute inset-0 bg-black/50 z-[9]"
                    onClick={() => setShowMobileSidebar(false)}
                  />
                )}

                <div className="flex-1 bg-[#1e1e1e] overflow-y-auto">
                  {selectedSidebarItem === "Recent" ? (
                    <>
                      <div className="sticky top-0 bg-[#252526] border-b border-[#3d3d3d] px-3 sm:px-6 py-2 flex items-center text-xs font-medium text-gray-400">
                        <div className="flex-1">Name</div>
                        <div className="w-20 sm:w-32 text-right">Type</div>
                        <div className="w-20 sm:w-32 text-right hidden sm:block">Opened</div>
                      </div>
                      <div className="p-2 sm:p-4 space-y-1">
                        {recentItems.length === 0 ? (
                          <div className="flex items-center justify-center h-64">
                            <div className="text-center text-gray-500">
                              <Clock className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                              <p className="text-base sm:text-lg font-medium">No Recent Items</p>
                              <p className="text-xs sm:text-sm mt-2">Items you open will appear here</p>
                            </div>
                          </div>
                        ) : (
                          recentItems.map((item, index) => (
                            <div
                              key={index}
                              className="w-full flex items-center px-2 sm:px-4 py-2 sm:py-3 rounded-lg border border-transparent hover:bg-[#252526]"
                            >
                              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                {item.type === "folder" ? (
                                  <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 fill-blue-400/20 flex-shrink-0" />
                                ) : (
                                  <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
                                )}
                                <span className="text-xs sm:text-sm font-medium text-gray-200 truncate">
                                  {item.name}
                                </span>
                              </div>
                              <div className="w-20 sm:w-32 text-right text-xs sm:text-sm text-gray-400 capitalize">
                                {item.type}
                              </div>
                              <div className="w-20 sm:w-32 text-right text-xs sm:text-sm text-gray-400 hidden sm:block">
                                {item.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : selectedSidebarItem === "Projects" && !selectedFolder ? (
                    <>
                      <div className="sticky top-0 bg-[#252526] border-b border-[#3d3d3d] px-3 sm:px-6 py-2 flex items-center text-xs font-medium text-gray-400">
                        <div className="flex-1">Name</div>
                        <div className="w-16 sm:w-24 text-right">Items</div>
                        <div className="w-24 sm:w-32 text-right hidden sm:block">Modified</div>
                      </div>

                      <div className="p-2 sm:p-4 space-y-1">
                        {projects.map((project) => (
                          <button
                            key={project.name}
                            onClick={() => handleFolderClick(project.name)}
                            className="w-full flex items-center px-2 sm:px-4 py-2 sm:py-3 rounded-lg transition-all group hover:bg-[#252526] border border-transparent"
                          >
                            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                              <div className="relative flex-shrink-0">
                                <Folder className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 fill-blue-400/20" />
                              </div>
                              <span className="text-xs sm:text-sm font-medium text-gray-200 truncate">
                                {project.name}
                              </span>
                            </div>
                            <div className="w-16 sm:w-24 text-right text-xs sm:text-sm text-gray-400">
                              {project.items} items
                            </div>
                            <div className="w-24 sm:w-32 text-right text-xs sm:text-sm text-gray-400 hidden sm:block">
                              {project.modified}
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : selectedFolder ? (
                    <>
                      <div className="p-3 sm:p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                          {currentImages.map((image, index) => {
                            const filename = image.src.split("/").pop() || "image.webp"
                            return (
                              <button
                                key={index}
                                onClick={() => handleImageClick(image)}
                                className="group flex flex-col items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-[#252526] transition-all"
                              >
                                <div className="relative w-full aspect-square bg-[#252526] rounded-lg overflow-hidden border border-[#3d3d3d] hover:border-blue-500/50 transition-all">
                                  <Image
                                    src={image.src || "/placeholder.svg"}
                                    alt={filename}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-[10px] sm:text-xs text-gray-300 text-center w-full truncate px-1">
                                  {filename}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-gray-500 px-4">
                        <Folder className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-base sm:text-lg font-medium">No items in {selectedSidebarItem}</p>
                        <p className="text-xs sm:text-sm mt-2">This folder is empty</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-[#252526] border-t border-[#3d3d3d] px-3 sm:px-4 py-2 flex items-center justify-between text-[10px] sm:text-xs text-gray-400">
                <span>
                  {selectedFolder
                    ? `${currentImages.length} images`
                    : selectedSidebarItem === "Projects"
                      ? `${projects.length} folders`
                      : "0 items"}
                </span>
                <span className="hidden sm:inline">ZaneEnterprise Portfolio</span>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>

      {openImages.map((image) => (
        <ImageViewer
          key={image.id}
          id={image.id}
          image={{ src: image.src, caption: image.caption }}
          initialPosition={image.position}
          zIndex={image.zIndex}
          isMinimized={image.isMinimized}
          onClose={() => handleCloseImage(image.id)}
          onBringToFront={() => handleBringToFront(image.id)}
          onUpdatePosition={(pos) => handleUpdatePosition(image.id, pos)}
          onMinimize={() => handleMinimizeImage(image.id)}
        />
      ))}

      {(isMinimized || openImages.some((img) => img.isMinimized)) && (
        <div className="fixed bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-[100] flex gap-1.5 sm:gap-2 px-2 max-w-[95vw] overflow-x-auto">
          {isMinimized && (
            <button
              onClick={() => setIsMinimized(false)}
              className="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#3d3d3d] rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-xl transition-colors flex-shrink-0"
            >
              <Folder className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
              <span className="text-xs sm:text-sm text-gray-300">File Manager</span>
            </button>
          )}
          {openImages
            .filter((img) => img.isMinimized)
            .map((image) => {
              const filename = image.src.split("/").pop() || "image.webp"
              return (
                <button
                  key={image.id}
                  onClick={() => handleRestoreImage(image.id)}
                  className="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#3d3d3d] rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-xl transition-colors flex-shrink-0"
                >
                  <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span className="text-xs sm:text-sm text-gray-300 truncate max-w-[120px]">{filename}</span>
                </button>
              )
            })}
        </div>
      )}
    </>
  )
}
