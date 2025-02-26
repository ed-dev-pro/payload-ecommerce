import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Product } from '../../../payload-types'

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('archive-block')

    if (doc._status === 'published') {
      const path = `/products/${doc.slug}`

      payload.logger.info(`Revalidating product at path: ${path}`)

      revalidatePath(path)

      //revalidateTag('pages-sitemap') tbd
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/products/${previousDoc.slug}`

      payload.logger.info(`Revalidating old product at path: ${oldPath}`)

      revalidatePath(oldPath)

      //revalidateTag('products-sitemap') tbd
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Product> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/products/${doc.slug}`

    revalidateTag('archive-block')
    revalidatePath(path)
    //revalidateTag('products-sitemap') tbd
  }

  return doc
}
