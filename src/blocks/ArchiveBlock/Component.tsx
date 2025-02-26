import type { Product, Producer, Artist, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { unstable_cache } from 'next/cache'

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

  console.log('ARCHIVE BLOCK PROPS', props)

  const limit = limitFromProps || 3

  let result: Product[] | Producer[] | Artist[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchProducts = unstable_cache(
      async () => {
        return payload.find({
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
      },
      [relationTo as string],
      {
        tags: [relationTo as string],
      },
    )

    const fetchedData = await fetchProducts()
    result = fetchedData.docs as Product[] | Producer[] | Artist[]
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedProducts = selectedDocs.map((product) => {
        if (typeof product.value === 'object') return product.value
      }) as Product[] | Producer[] | Artist[]

      result = filteredSelectedProducts
    }
  }

  console.log('ARCHIVE BLOCK RESULT', result)

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
