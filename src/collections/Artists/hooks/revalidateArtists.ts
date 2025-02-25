import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Artist } from '@/payload-types'

export const revalidateArtist: CollectionAfterChangeHook<Artist> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/artists/${doc.slug}`

      payload.logger.info(`Revalidating artist at path: ${path}`)

      revalidatePath(path)

      //revalidateTag('pages-sitemap') tbd
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/artists/${previousDoc.slug}`

      payload.logger.info(`Revalidating old artist at path: ${oldPath}`)

      revalidatePath(oldPath)

      //revalidateTag('artists-sitemap') tbd
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Artist> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/artists/${doc.slug}`

    revalidatePath(path)
    //revalidateTag('artists-sitemap') tbd
  }

  return doc
}
