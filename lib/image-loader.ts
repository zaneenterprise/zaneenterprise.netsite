export default function customImageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  if (src.startsWith('/') && !src.includes('images/')) {
    return src
  }

  const cdnHostname = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME
  
  if (!cdnHostname) {
    return src.startsWith('/') ? src : `/${src}`
  }

  const cleanPath = src.startsWith('/') ? src.slice(1) : src
  const baseUrl = `https://${cdnHostname}/${cleanPath}`
  const params = new URLSearchParams()
  
  params.append('width', width.toString())
  if (quality) {
    params.append('quality', quality.toString())
  }
  
  return `${baseUrl}?${params.toString()}`
}
