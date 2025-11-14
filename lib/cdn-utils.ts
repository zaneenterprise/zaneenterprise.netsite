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
 
