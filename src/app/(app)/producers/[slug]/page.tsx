import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import { ProducerInfo } from './features/ProducerInfo'
import { AvailableCollection } from './features/AvailableCollection'
import { OriginGellery } from './features/OriginGellery'
import { Showcase } from './features/Showcase'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: Args) {
  const { slug } = await params

  const { producer, products } = await queryProducerBySlug({ slug })

  if (!producer) return notFound()

  const filteredProducts = products.filter((product) => typeof product !== 'string')

  const gallery =
    producer.gallery &&
    Array.isArray(producer.gallery) &&
    producer.gallery.length > 0 &&
    producer.gallery.filter((image) => typeof image !== 'string')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-3 container mx-auto py-12 space-3">
      <div className="space-y-3">
        <ProducerInfo producer={producer} />
        {products && <AvailableCollection products={filteredProducts} />}
        {gallery && <OriginGellery gallery={gallery} />}
      </div>
      <div>
        <Showcase />
      </div>
    </div>
  )
}

const queryProducerBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  // get the producer
  const producer = await payload.find({
    collection: 'producers',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  // If no producer found, return early
  if (!producer.docs?.[0]) {
    return {
      producer: null,
      products: [],
    }
  }

  // get all products where this producer is referenced
  const products = await payload.find({
    collection: 'products',
    depth: 1,
    draft,
    where: {
      producers: {
        contains: producer.docs[0].id,
      },
    },
  })

  return {
    producer: producer.docs[0] || null,
    products: products.docs || [],
  }
}
