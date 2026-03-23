'use client'

import React, { useMemo, useCallback } from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

/**
 * Optimized CDNImage component that uses BunnyCDN for image transformation.
 * Uses React.memo and useMemo to prevent unnecessary re-renders and loader recreations.
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

  const optimizedSrc = useMemo(() => getBunnyCDNUrl(src, optimizationOptions), [src, optimizationOptions])

  const customLoader = useCallback(({ src: _loaderSrc, width: loaderWidth, quality }: { src: string; width: number; quality?: number }) => {
    return getBunnyCDNUrl(src, {
      ...optimizationOptions,
      width: loaderWidth,
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

const LOGO_CDN_OPTIONS: BunnyImageOptions = { quality: 90 }

export const LogoImage = React.memo((props: Omit<CDNImageProps, 'cdnOptions'>) => {
  return <CDNImage {...props} cdnOptions={LOGO_CDN_OPTIONS} />
})

LogoImage.displayName = 'LogoImage'
