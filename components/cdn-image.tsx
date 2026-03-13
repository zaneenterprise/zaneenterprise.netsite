'use client'

import React from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

/**
 * Optimized Image component that uses BunnyCDN for image processing.
 * Memoized to prevent unnecessary re-renders when parent state changes.
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
    return getBunnyCDNUrl(src, {
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
})

CDNImage.displayName = 'CDNImage'

const LOGO_CDN_OPTIONS: BunnyImageOptions = { quality: 90 }

/**
 * Specialized version of CDNImage for logos.
 */
export const LogoImage = React.memo((props: Omit<CDNImageProps, 'cdnOptions'>) => {
  return <CDNImage {...props} cdnOptions={LOGO_CDN_OPTIONS} />
})

LogoImage.displayName = 'LogoImage'
