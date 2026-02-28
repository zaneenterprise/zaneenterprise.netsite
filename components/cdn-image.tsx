'use client'

import { memo, useCallback, useMemo } from 'react'
import Image, { ImageProps } from 'next/image'
import { getBunnyCDNUrl, type BunnyImageOptions } from '@/lib/cdn-utils'

export interface CDNImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string
  cdnOptions?: BunnyImageOptions
}

export const CDNImage = memo(function CDNImage({ src, cdnOptions, ...props }: CDNImageProps) {
  const optimizationOptions = useMemo(() => {
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
  }, [cdnOptions, props.width, 'fill' in props])

  const optimizedSrc = useMemo(() => getBunnyCDNUrl(src, optimizationOptions), [src, optimizationOptions])

  const customLoader = useCallback(({ width, quality }: { width: number; quality?: number }) => {
    return getBunnyCDNUrl(src, {
      ...optimizationOptions,
      width,
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

const LOGO_CDN_OPTIONS: BunnyImageOptions = { quality: 90 }

export function LogoImage(props: Omit<CDNImageProps, 'cdnOptions'>) {
  return <CDNImage {...props} cdnOptions={LOGO_CDN_OPTIONS} />
}
