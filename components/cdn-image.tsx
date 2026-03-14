'use client'

import React, { useCallback, useMemo } from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

const LOGO_CDN_OPTIONS = { quality: 90 } as const

const DEFAULT_CDN_OPTIONS: BunnyImageOptions = {
  quality: 85,
  format: 'webp',
  auto_optimize: 'medium',
}

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

  const customLoader = useCallback(({ width: loaderWidth, quality }: { width: number; quality?: number }) => {
    return getBunnyCDNUrl(src, {
      ...optimizationOptions,
      width: loaderWidth,
      quality: quality || optimizationOptions.quality,
    })
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

export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={LOGO_CDN_OPTIONS} />
}
