'use client'

import * as React from 'react'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Carousel } from './features/Carousel'
import { Accordion } from './features/Accordion'
import { SearchIcon, ShoppingCart, X } from 'lucide-react'
import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Product } from '@/payload-types'
import { Media } from '../Media'
import { AddToCart } from '../Cart/AddToCart'
import { Button } from '../ui/button'
import { useCart } from '@/providers/Cart'

interface ProductsDrawerProps {
  products: Product[]
}

export function DrawerCompoment({ products }: ProductsDrawerProps) {
  const defaultProduct = React.useMemo(() => (products.length > 0 ? products[0] : null), [products])

  // const { openCart, isOpen } = useCart()
  const [open, setOpen] = React.useState(false)
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(defaultProduct)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleDrawerState = React.useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen)
      const params = new URLSearchParams(searchParams.toString())

      if (!isOpen) {
        params.delete('product')
      } else {
        if (!params.get('product') && products[0]) {
          params.set('product', products[0].id)
          setSelectedProduct(products[0])
        }
      }

      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, searchParams, router, products],
  )

  const handleProductSelect = React.useCallback(
    (product: Product) => {
      setSelectedProduct(product)

      const params = new URLSearchParams(searchParams.toString())
      params.set('product', product?.id)
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, searchParams, router],
  )

  useEffect(() => {
    const productId = searchParams.get('product')
    if (!productId) {
      setOpen(false)
      return
    }

    const product = products.find((p) => p.id === productId)
    if (product) {
      setSelectedProduct(product)
      setOpen(true)
    } else {
      console.warn(`Product with ID ${productId} not found`)
      const params = new URLSearchParams(searchParams.toString())
      router.push(`${pathname}?${params.toString()}`)
      // router.push(pathname)
    }
  }, [pathname, searchParams, router, products]) // Only depend on the product ID

  const image = React.useMemo(() => {
    const firstGalleryImage =
      typeof selectedProduct?.gallery?.[0] !== 'string' ? selectedProduct?.gallery?.[0] : undefined
    const metaImage =
      typeof selectedProduct?.meta?.image !== 'string' ? selectedProduct?.meta?.image : undefined
    return metaImage || firstGalleryImage
  }, [selectedProduct])

  console.log('DRAWER')
  return (
    <Drawer open={open} onOpenChange={handleDrawerState}>
      <DrawerTrigger className="relative flex h-11 w-11 items-center justify-center rounded-md text-gray-500 transition-colors dark:border-neutral-700 dark:bg-black dark:text-white">
        <SearchIcon className="h-6 transition-all ease-in-out hover:scale-110" />
      </DrawerTrigger>
      <DrawerContent className="[&>div:first-child]:hidden border-none rounded-t-3xl">
        <DrawerClose asChild className="absolute top-3 right-3 z-10">
          <X className="w-5 h-5 cursor-pointer" />
        </DrawerClose>
        <div className="relative mx-auto w-full max-w-lg flex flex-col h-full">
          <div className="relative bg-[#EDEDED] h-52 w-full rounded-t-3xl">
            {image ? (
              <Media
                className="h-full w-full rounded-t-3xl"
                imgClassName="h-full w-full object-contain"
                resource={image}
                alt={selectedProduct?.title}
              />
            ) : null}
          </div>
          <div className="px-6 py-4 overflow-auto max-h-[60dvh]">
            <DrawerHeader className="text-left">
              <DrawerTitle className="text-2xl font-semibold">Grape Profile</DrawerTitle>
              <DrawerDescription className="hidden">
                {/* {selectedProduct.description} */}
              </DrawerDescription>
            </DrawerHeader>
            {selectedProduct && (
              <>
                <Carousel
                  items={products}
                  selectedItem={selectedProduct}
                  onItemSelect={(product) => handleProductSelect(product)}
                />
                <Accordion product={selectedProduct} />
                <DrawerFooter className="flex flex-row justify-center items-center">
                  <AddToCart
                    product={selectedProduct}
                    variants={selectedProduct?.variants?.variants || []}
                    showIcon={false}
                    btnVariant="accent"
                  />
                  {/* {!isOpen && (
                  <Button
                    // onClick={openCart}
                    variant="accent"
                    aria-label="Add to cart"
                    type="submit"
                  >
                    <ShoppingCart size={16} />
                  </Button>
                  )} */}
                </DrawerFooter>
              </>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
