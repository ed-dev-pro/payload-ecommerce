import type { RequiredDataFromCollectionSlug } from 'payload'

export const artists: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'artists',
  _status: 'published',
  hero: {
    type: 'lowImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Our Affiliate Artists',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  layout: [
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      populateBy: 'collection',
      relationTo: 'artists',
    },
  ],
  meta: {
    description: 'artists',
    title: 'Artists',
  },
  title: 'Artists',
}
