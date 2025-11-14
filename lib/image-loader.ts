import { getBunnyCDNUrl } from './cdn-utils'

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

  return getBunnyCDNUrl(src, {
    width,
    quality: quality || 75,
  })
}
