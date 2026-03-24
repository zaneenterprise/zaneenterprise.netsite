'use client'

import React, { useMemo, useCallback } from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

const DEFAULT_CDN_OPTIONS: BunnyImageOptions = {
  quality: 85,
  format: 'webp',
  auto_optimize: 'medium',
}

/**
 * Optimized CDN Image component with memoization and stable loader references.
 * Prevents unnecessary re-renders when parent components update.
 */
export const CDNImage = React.memo(({ src, cdnOptions, ...props }: CDNImageProps) => {
  const optimizationOptions = useMemo((): BunnyImageOptions => {
    const options = {
      ...DEFAULT_CDN_OPTIONS,
      ...cdnOptions,
    }

    if (props.width && typeof props.width === 'number' && !('fill' in props)) {
      options.width = props.width
    }

    return options
  }, [cdnOptions, props.width, props.fill])

  // Loader signature destructures src, width, and quality to satisfy Next.js internal validation.
  const customLoader = useCallback(({ src: loaderSrc, width: loaderWidth, quality }: { src: string; width: number; quality?: number }) => {
    return getBunnyCDNUrl(loaderSrc, {
      ...optimizationOptions,
      width: loaderWidth,
      quality: quality || optimizationOptions.quality,
    })
  }, [optimizationOptions])

  return (
    <Image
      {...props}
      src={src}
      loader={customLoader}
    />
  )
})

CDNImage.displayName = 'CDNImage'

const LOGO_CDN_OPTIONS: BunnyImageOptions = { quality: 90 }

export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={LOGO_CDN_OPTIONS} />
}
