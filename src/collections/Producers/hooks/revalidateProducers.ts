import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Producer } from '@/payload-types'

export const revalidateProducer: CollectionAfterChangeHook<Producer> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/producers/${doc.slug}`

      payload.logger.info(`Revalidating producer at path: ${path}`)

      revalidatePath(path)

      //revalidateTag('pages-sitemap') tbd
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/producers/${previousDoc.slug}`

      payload.logger.info(`Revalidating old producer at path: ${oldPath}`)

      revalidatePath(oldPath)

      //revalidateTag('producers-sitemap') tbd
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Producer> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/producers/${doc.slug}`

    revalidatePath(path)
    //revalidateTag('producers-sitemap') tbd
  }

  return doc
}
