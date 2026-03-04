'use client'

import React from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

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

  const customLoader = ({
    src: _src,
    width,
    quality,
  }: {
    src: string
    width: number
    quality?: number
  }) => {
    const cdnUrl = getBunnyCDNUrl(src, {
      ...optimizationOptions,
      width,
      quality: quality || optimizationOptions.quality,
    })
    return cdnUrl
  }

  return (
    <Image
      {...props}
      src={optimizedSrc}
      loader={customLoader}
    />
  )
})

const LOGO_CDN_OPTIONS: BunnyImageOptions = { quality: 90 }

export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={LOGO_CDN_OPTIONS} />
}
