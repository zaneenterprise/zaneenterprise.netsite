'use client'

import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

/**
 * CDNImage wraps the Next.js Image component and provides automatic
 * BunnyCDN URL generation.
 */
export function CDNImage({ src, cdnOptions, ...props }: CDNImageProps) {
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
    return getBunnyCDNUrl(loaderSrc, {
      ...optimizationOptions,
      width: loaderWidth,
      quality: quality || optimizationOptions.quality,
    })
  }

  return (
    <Image
      {...props}
      src={optimizedSrc}
      loader={customLoader}
    />
  )
}

export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={{ quality: 90 }} />
}
