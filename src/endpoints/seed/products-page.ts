import type { RequiredDataFromCollectionSlug } from 'payload'

export const products: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'products',
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
                text: 'Local Products',
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
      relationTo: 'products',
      categories: [],
    },
  ],
  meta: {
    description: 'products',
    title: 'Products',
  },
  title: 'Products',
}
