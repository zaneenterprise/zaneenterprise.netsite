'use client'

import React from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

/**
 * ⚡ Bolt: Memoized CDNImage to prevent unnecessary re-renders.
 * Uses a custom loader for BunnyCDN optimization.
 */
export const CDNImage = React.memo(function CDNImage({ src, cdnOptions, ...props }: CDNImageProps) {
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

  // Explicitly destructure width for Next.js loader check
  const customLoader = ({ width, quality }: { src: string; width: number; quality?: number }) => {
    return getBunnyCDNUrl(src, {
      ...optimizationOptions,
      width,
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
 * ⚡ Bolt: LogoImage using stable options to avoid breaking CDNImage memoization.
 */
export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={LOGO_CDN_OPTIONS} />
}
