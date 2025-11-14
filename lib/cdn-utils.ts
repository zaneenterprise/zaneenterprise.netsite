export interface BunnyImageOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpg' | 'png'
  blur?: number
  sharpen?: number
  brightness?: number
  contrast?: number
  saturation?: number
}

export function getBunnyCDNHostname(): string {
  return process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || ''
}

export function isCDNEnabled(): boolean {
  return !!getBunnyCDNHostname()
}

export function getBunnyCDNUrl(imagePath: string, options: BunnyImageOptions = {}): string {
  const cdnHostname = getBunnyCDNHostname()
  if (!cdnHostname) {
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`
  }
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  const baseUrl = `https://${cdnHostname}/${cleanPath}`
  const params = new URLSearchParams()
  if (options.width) params.append('width', options.width.toString())
  if (options.height) params.append('height', options.height.toString())
  if (options.quality) params.append('quality', options.quality.toString())
  if (options.format) params.append('format', options.format)
  if (options.blur) params.append('blur', options.blur.toString())
  if (options.sharpen) params.append('sharpen', options.sharpen.toString())
  if (options.brightness) params.append('brightness', options.brightness.toString())
  if (options.contrast) params.append('contrast', options.contrast.toString())
  if (options.saturation) params.append('saturation', options.saturation.toString())
  const queryString = params.toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

export function getResponsiveUrls(
  imagePath: string,
  sizes: number[] = [640, 768, 1024, 1280, 1536],
  options: Omit<BunnyImageOptions, 'width'> = {}
): string[] {
  return sizes.map((width) => getBunnyCDNUrl(imagePath, { ...options, width }))
}

export function preloadImages(images: string[], options: BunnyImageOptions = {}): void {
  if (typeof window === 'undefined') return
  images.forEach((imagePath) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = getBunnyCDNUrl(imagePath, options)
    document.head.appendChild(link)
  })
}

export function getDefaultOptions(type: 'hero' | 'thumbnail' | 'logo' | 'background'): BunnyImageOptions {
  switch (type) {
    case 'hero':
      return { quality: 85, format: 'webp' }
    case 'thumbnail':
      return { quality: 80, format: 'webp' }
    case 'logo':
      return { quality: 90, format: 'png' }
    case 'background':
      return { quality: 75, format: 'webp', blur: 0 }
    default:
      return { quality: 85, format: 'webp' }
  }
}
 
