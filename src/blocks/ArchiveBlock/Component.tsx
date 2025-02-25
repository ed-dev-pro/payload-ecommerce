import type { Product, Producer, Artist, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { cn } from '@/utilities/cn'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo = 'products',
  } = props

  const limit = limitFromProps || 3

  let result: Product[] | Producer[] | Artist[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedData = await payload.find({
      collection: relationTo as 'products' | 'producers' | 'artists',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    result = fetchedData.docs as Product[] | Producer[] | Artist[]
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedProducts = selectedDocs.map((product) => {
        if (typeof product.value === 'object') return product.value
      }) as Product[]

      result = filteredSelectedProducts
    }
  }

  return (
    <div className={cn('py-8')} id={`block-${id}`}>
      {introContent && (
        <div className="container mb-6">
          <RichText
            className="text-center max-w-[48rem]"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}
      <CollectionArchive docs={result} relationTo={relationTo} />
    </div>
  )
}
