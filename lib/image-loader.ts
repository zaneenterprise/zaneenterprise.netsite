export default function customImageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  // For local static files (like logo.svg), return as-is
  if (src.startsWith('/') && !src.includes('images/')) {
    return src
  }

  // Get CDN hostname from environment
  const cdnHostname = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME
  
  // If no CDN is configured, return local path
  if (!cdnHostname) {
    return src.startsWith('/') ? src : `/${src}`
  }

  // Build CDN URL with parameters
  const cleanPath = src.startsWith('/') ? src.slice(1) : src
  const baseUrl = `https://${cdnHostname}/${cleanPath}`
  const params = new URLSearchParams()
  
  params.append('width', width.toString())
  if (quality) {
    params.append('quality', quality.toString())
  }
  
  return `${baseUrl}?${params.toString()}`
}
