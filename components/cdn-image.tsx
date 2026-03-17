'use client'

import React, { useMemo } from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

/**
 * CDNImage component optimized for performance.
 * Memoized to prevent unnecessary re-renders when parent components update.
 */
export const CDNImage = React.memo(({ src, cdnOptions, ...props }: CDNImageProps) => {
  const optimizationOptions = useMemo(() => {
    const defaultOptions: BunnyImageOptions = {
      quality: 85,
      format: 'webp',
      auto_optimize: 'medium',
    }

    const options: BunnyImageOptions = {
      ...defaultOptions,
      ...cdnOptions,
    }

    if (props.width && typeof props.width === 'number' && !('fill' in props)) {
      options.width = props.width
    }

    return options
  }, [cdnOptions, props.width, props.fill])

  const optimizedSrc = getBunnyCDNUrl(src, optimizationOptions)

  const customLoader = useMemo(() => {
    return ({ width: loaderWidth, quality }: { src: string; width: number; quality?: number }) => {
      // Next.js performs a string-based check on the loader function to ensure it handles 'width'.
      // Destructuring 'width' here satisfies that check while we use our memoized CDN options.
      return getBunnyCDNUrl(src, {
        ...optimizationOptions,
        width: loaderWidth,
        quality: quality || optimizationOptions.quality,
      })
    }
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

const LOGO_CDN_OPTIONS: BunnyImageOptions = { quality: 90 }

export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={LOGO_CDN_OPTIONS} />
}
