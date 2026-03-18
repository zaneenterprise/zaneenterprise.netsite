'use client'

import React, { useMemo, useCallback } from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

/**
 * Optimized CDN Image component that uses Bunny.net CDN for image processing.
 * Memoized to prevent unnecessary re-renders when parent components update.
 */
export const CDNImage = React.memo(({ src, cdnOptions, ...props }: CDNImageProps) => {
  // Memoize default options to avoid recreation
  const optimizationOptions = useMemo((): BunnyImageOptions => {
    const options: BunnyImageOptions = {
      quality: 85,
      format: 'webp',
      auto_optimize: 'medium',
      ...cdnOptions,
    }

    if (props.width && typeof props.width === 'number' && !('fill' in props)) {
      options.width = props.width
    }

    return options
  }, [cdnOptions, props.width, props.fill])

  // Memoize the initial optimized source
  const optimizedSrc = useMemo(() => getBunnyCDNUrl(src, optimizationOptions), [src, optimizationOptions])

  // Memoize the loader to maintain stable reference for Next.js Image component
  // We explicitly destructure width to satisfy Next.js internal validation
  const customLoader = useCallback(({ width, quality }: { src: string; width: number; quality?: number }) => {
    return getBunnyCDNUrl(src, {
      ...optimizationOptions,
      width: width,
      quality: quality || optimizationOptions.quality,
    })
  }, [src, optimizationOptions])

  return (
    <Image
      {...props}
      src={optimizedSrc}
      loader={customLoader}
    />
  )
})

CDNImage.displayName = 'CDNImage'

// Stable constant for LogoImage to ensure memoization effectiveness
const LOGO_CDN_OPTIONS: BunnyImageOptions = { quality: 90 }

export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={LOGO_CDN_OPTIONS} />
}
