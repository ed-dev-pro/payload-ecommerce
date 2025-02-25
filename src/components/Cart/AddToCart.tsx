'use client'

import type { Product } from '@/payload-types'

import { useCart } from '@/providers/Cart'
import clsx from 'clsx'
import { ShoppingCart } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { Button, ButtonProps } from '../ui/button'

type ProductVariant = NonNullable<NonNullable<Product['variants']>['variants']>[number]

type Props = {
  product: Product
  variants?: ProductVariant[]
  btnVariant?: ButtonProps['variant']
  btnClasses?: string
  showIcon?: boolean
  showPrice?: boolean
}

export function AddToCart({
  product,
  variants,
  btnVariant,
  btnClasses,
  showIcon = true,
  showPrice = true,
}: Props) {
  const { addItemToCart, cart } = useCart()
  const searchParams = useSearchParams()

  const selectedVariantId = searchParams.get('variant')

  // const buttonClasses = ''
  // 'w-fit rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 mt-2 mb-2'
  // 'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white'
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60'

  const productUrl = useMemo(() => {
    const base = `/product/${product.slug}`

    if (selectedVariantId) {
      const variant = variants?.find((variant) => variant.id === selectedVariantId)

      if (!variant) {
        return base
      }

      const variantOptions = variant.options.map((option) => `${option.slug}=${option.slug}`)
      return `${base}?variant=${selectedVariantId}&${variantOptions.join('&')}`
    } else {
      return base
    }
  }, [product.slug, selectedVariantId, variants])

  if (!true) {
    return (
      <button aria-disabled className={clsx(disabledClasses)} type="submit">
        Out Of Stock
      </button>
    )
  }

  const addToCart = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()

      let unitPrice = product.price || 0

      if (selectedVariantId && product.enableVariants && product.variants?.variants?.length) {
        const variant = product.variants?.variants?.find(
          (variant) => variant.id === selectedVariantId,
        )
        unitPrice = variant?.price || 0
      }

      // console.log({
      //   id: selectedVariantId ?? product.id,
      //   product,
      //   quantity: 1,
      //   url: productUrl,
      //   unitPrice,
      //   variant: selectedVariantId ?? undefined,
      // })

      addItemToCart({
        id: selectedVariantId ?? product.id,
        product,
        quantity: 1,
        url: productUrl,
        unitPrice,
        variant: selectedVariantId ?? undefined,
      })
    },
    [addItemToCart, product, productUrl, selectedVariantId],
  )

  return (
    <Button
      variant={btnVariant}
      className={btnClasses}
      aria-label="Add to cart"
      onClick={addToCart}
      type="submit"
    >
      {showIcon && <ShoppingCart size={16} className="mr-1" />}
      Add To Cart {showPrice && `| ${product.price}`}
    </Button>
  )
}
