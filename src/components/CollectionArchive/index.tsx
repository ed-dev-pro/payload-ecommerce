import { cn } from '@/utilities/cn'
import React from 'react'

import type { Artist, Producer, Product } from '@/payload-types'
import { ProductCard } from '../Card/Product'
import { ProducerCard } from '../Card/Producer'
import { ArtistCard } from '../Card/Artist'

/* import { Card } from '../Card' */

export type Props = {
  docs: Product[] | Producer[] | Artist[] | null
  relationTo: 'products' | 'producers' | 'artists' | null
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { docs, relationTo } = props

  const customClassName =
    relationTo === 'products'
      ? 'w-full flex flex-wrap justify-center gap-4 py-4 border rounded-xl'
      : relationTo === 'producers'
        ? 'space-y-6'
        : relationTo === 'artists'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          : ''

  return (
    <div className={cn('container')}>
      <div className={customClassName}>
        {docs?.map((doc) => {
          if (typeof doc === 'object' && doc !== null) {
            return (
              <React.Fragment key={doc.id}>
                {relationTo === 'products' ? (
                  <ProductCard product={doc as Product} />
                ) : relationTo === 'producers' ? (
                  <ProducerCard producer={doc as Producer} />
                ) : relationTo === 'artists' ? (
                  <ArtistCard artist={doc as Artist} />
                ) : null}
              </React.Fragment>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
