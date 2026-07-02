export interface BunnyImageOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'jpeg' | 'png' | 'gif'
  blur?: number
  sharpen?: boolean
  brightness?: number
  contrast?: number
  saturation?: number
  auto_optimize?: 'low' | 'medium' | 'high'
  aspect_ratio?: string
  crop?: string
  crop_gravity?: 'center' | 'north' | 'south' | 'east' | 'west' | 'northeast' | 'northwest' | 'southeast' | 'southwest'
}

export function getBunnyCDNHostname(): string {
  return process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || ''
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
  if (options.auto_optimize) params.append('auto_optimize', options.auto_optimize)
  if (options.aspect_ratio) params.append('aspect_ratio', options.aspect_ratio)
  if (options.crop) params.append('crop', options.crop)
  if (options.crop_gravity) params.append('crop_gravity', options.crop_gravity)
  if (options.blur !== undefined) params.append('blur', options.blur.toString())
  if (options.sharpen === true) params.append('sharpen', 'true')
  if (options.brightness !== undefined) params.append('brightness', options.brightness.toString())
  if (options.contrast !== undefined) params.append('contrast', options.contrast.toString())
  if (options.saturation !== undefined) params.append('saturation', options.saturation.toString())
  const queryString = params.toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}
 
