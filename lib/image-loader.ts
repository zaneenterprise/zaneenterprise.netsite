export default function customImageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const cdnHostname = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME
  const defaultQuality = quality ?? 85

  if (src.startsWith('/') && !src.includes('images/')) {
    return src
  }

  if (/^https?:\/\//i.test(src)) {
    try {
      const url = new URL(src)
      if (cdnHostname && url.hostname === cdnHostname) {
        url.searchParams.set('width', width.toString())
        url.searchParams.set('quality', defaultQuality.toString())
        if (!url.searchParams.has('auto_optimize')) {
          url.searchParams.set('auto_optimize', 'medium')
        }
        return url.toString()
      }
      return src
    } catch {
      return src
    }
  }

  if (!cdnHostname) {
    return src.startsWith('/') ? src : `/${src}`
  }

  const cleanPath = src.startsWith('/') ? src.slice(1) : src
  const baseUrl = `https://${cdnHostname}/${cleanPath}`
  const params = new URLSearchParams()
  
  params.append('width', width.toString())
  params.append('quality', defaultQuality.toString())
  params.append('auto_optimize', 'medium')
  
  return `${baseUrl}?${params.toString()}`
}
