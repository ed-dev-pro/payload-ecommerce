'use client'
import React from 'react'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Media } from '@/components/Media'
import { Product } from '@/payload-types'
import { AddToCart } from '@/components/Cart/AddToCart'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface ProductProps {
  product: Product
}

export function ProductCard({ product }: ProductProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onSelectCard = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (product) {
      params.set('product', product?.id)
    } else {
      params.delete('product')
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const firstGalleryImage =
    typeof product.gallery?.[0] !== 'string' ? product.gallery?.[0] : undefined
  const metaImage = typeof product.meta?.image !== 'string' ? product.meta?.image : undefined
  const image = metaImage || firstGalleryImage

  return (
    <Card
      className="w-[9rem] flex flex-col rounded-xl overflow-hidden"
      id={`product-${product.id}`}
    >
      <div onClick={onSelectCard} className="relative w-full h-[183px] cursor-pointer">
        {image ? (
          <Media className="h-full" imgClassName="h-full object-cover" resource={image} />
        ) : null}
      </div>
      <CardHeader className="px-2.5 pb-2">
        <CardTitle
          onClick={onSelectCard}
          className="line-clamp-2 text-md font-normal cursor-pointer"
        >
          {product.title}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-center mt-auto px-2.5 pb-3">
        <AddToCart
          product={product}
          variants={product.variants?.variants || []}
          btnVariant="default"
          showPrice={false}
          btnClasses="text-xs font-normal"
        />
      </CardFooter>
    </Card>
  )
}
