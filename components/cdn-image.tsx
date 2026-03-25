'use client'

import React, { useMemo } from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

/**
 * Optimized CDNImage component using React.memo to prevent unnecessary re-renders.
 * Memoizes image optimization options and the custom loader to ensure stable props
 * for the underlying Next.js Image component.
 */
export const CDNImage = React.memo(({ src, cdnOptions, ...props }: CDNImageProps) => {
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
      src={src}
      loader={customLoader}
    />
  )
})

CDNImage.displayName = 'CDNImage'

const LOGO_CDN_OPTIONS = { quality: 90 } as const

export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={LOGO_CDN_OPTIONS} />
}
