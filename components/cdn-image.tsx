'use client'

import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  alt: string
  cdnOptions?: BunnyImageOptions
}

export function CDNImage({ src, cdnOptions, alt, ...props }: CDNImageProps) {
  const defaultOptions: BunnyImageOptions = {
    quality: 85,
    format: 'webp',
    auto_optimize: 'medium',
  }

  const optimizationOptions: BunnyImageOptions = {
    ...defaultOptions,
    ...cdnOptions,
  }

  if (props.width && typeof props.width === 'number' && !('fill' in props)) {
    optimizationOptions.width = props.width
  }

  const optimizedSrc = getBunnyCDNUrl(src, optimizationOptions)

  const customLoader = ({ src: loaderSrc, width: loaderWidth, quality }: { src: string; width: number; quality?: number }) => {
    const cdnUrl = getBunnyCDNUrl(src, {
      ...optimizationOptions,
      width: loaderWidth,
      quality: quality || optimizationOptions.quality,
    })
    return cdnUrl
  }

  return (
    <Image
      {...props}
      alt={alt}
      src={optimizedSrc}
      loader={customLoader}
    />
  )
}

export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={{ quality: 90 }} />
}
