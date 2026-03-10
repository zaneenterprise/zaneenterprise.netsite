'use client'

import React from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

/**
 * Optimized image component with automatic BunnyCDN integration and memoization.
 * Memoized to prevent unnecessary re-renders in lists when stable props are provided.
 */
export const CDNImage = React.memo(({ src, cdnOptions, ...props }: CDNImageProps) => {
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

  const customLoader = ({ width: loaderWidth, quality }: { src: string; width: number; quality?: number }) => {
    // We explicitly destructure width to satisfy Next.js loader requirements
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
      src={optimizedSrc}
      loader={customLoader}
    />
  )
})

CDNImage.displayName = 'CDNImage'

const LOGO_CDN_OPTIONS: BunnyImageOptions = { quality: 90 }

/**
 * Specialized LogoImage component using stable CDN options to prevent re-renders.
 */
export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={LOGO_CDN_OPTIONS} />
}
