'use client'

import React, { memo, useMemo } from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

const DEFAULT_OPTIONS: BunnyImageOptions = {
  quality: 85,
  format: 'webp',
  auto_optimize: 'medium',
}

// Optimization: memoize CDNImage and its internal options to maintain stable references
// and prevent redundant re-renders of the underlying Next.js Image component.
export const CDNImage = memo(function CDNImage({ src, cdnOptions, ...props }: CDNImageProps) {
  const optimizationOptions = useMemo(() => {
    const options: BunnyImageOptions = {
      ...DEFAULT_OPTIONS,
      ...cdnOptions,
    }

    if (props.width && typeof props.width === 'number' && !('fill' in props)) {
      options.width = props.width
    }

    return options
  }, [cdnOptions, props.width, props.fill])

  const optimizedSrc = useMemo(() =>
    getBunnyCDNUrl(src, optimizationOptions),
  [src, optimizationOptions])

  const customLoader = useMemo(() => {
    return ({ width: loaderWidth, quality }: { width: number; quality?: number }) => {
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

const LOGO_CDN_OPTIONS: BunnyImageOptions = { quality: 90 };

export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={LOGO_CDN_OPTIONS} />
}
