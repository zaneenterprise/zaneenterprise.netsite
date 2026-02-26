'use client'

import { memo, useMemo } from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

export const CDNImage = memo(function CDNImage({ src, cdnOptions, ...props }: CDNImageProps) {
  const defaultOptions: BunnyImageOptions = {
    quality: 85,
    format: 'webp',
    auto_optimize: 'medium',
  }

  const optimizationOptions = useMemo(() => ({
    ...defaultOptions,
    ...cdnOptions,
    ...(props.width && typeof props.width === 'number' && !('fill' in props) ? { width: props.width } : {})
  }), [cdnOptions, props.width, props.fill])

  const optimizedSrc = useMemo(() => getBunnyCDNUrl(src, optimizationOptions), [src, optimizationOptions])

  return (
    <Image
      {...props}
      src={optimizedSrc}
      loader={({ width, quality }) => {
        return getBunnyCDNUrl(src, {
          ...optimizationOptions,
          width,
          quality: quality || optimizationOptions.quality,
        })
      }}
    />
  )
})

export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={{ quality: 90 }} />
}
