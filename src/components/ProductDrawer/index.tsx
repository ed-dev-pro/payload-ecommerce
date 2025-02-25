import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { DrawerCompoment } from './Drawer'
import { draftMode } from 'next/headers'

export async function ProductDrawer() {
  const products = await queryProducts()

  if (!products || !Array.isArray(products) || products.length === 0) {
    return null
  }

  return <DrawerCompoment products={products} />
}

const queryProducts = async () => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    select: {
      title: true,
      slug: true,
      gallery: true,
      categories: true,
      currency: true,
      price: true,
    },
  })

  return result.docs || []
}
