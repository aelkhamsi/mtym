import {
  defaultColors,
  FixedToolbarFeature,
  lexicalEditor,
  TextStateFeature,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Faq: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          TextStateFeature({
            state: {
              color: {
                ...defaultColors.text,
              },
            },
          }),
          FixedToolbarFeature(),
        ],
      }),
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'faq-categories',
      hasMany: false,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Controls the display order of the questions within a category (lowest first).',
      },
    },
  ],
}
