'use client'

import { useMemo, useCallback } from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

/**
 * CDNImage wraps the Next.js Image component and provides automatic
 * BunnyCDN URL generation. It uses memoization to ensure that
 * expensive object and function recreations don't happen on every render.
 */
export function CDNImage({ src, cdnOptions, ...props }: CDNImageProps) {
  // Memoize optimization options to prevent recreation on every render
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

  // Cache the generated CDN URL
  const optimizedSrc = useMemo(() => getBunnyCDNUrl(src, optimizationOptions), [src, optimizationOptions])

  // Stabilize the loader function for the Next.js Image component
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
}

export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={{ quality: 90 }} />
}
