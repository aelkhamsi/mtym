import {
  defaultColors,
  FixedToolbarFeature,
  lexicalEditor,
  TextStateFeature,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Partner name (used for accessibility and admin listing).',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'partner-logos',
      required: true,
    },
    {
      name: 'description',
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
      admin: {
        description:
          'Use several paragraphs to mirror the existing /partners cards.',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'partner-categories',
      hasMany: false,
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Controls the display order of the cards within a category (lowest first).',
      },
    },
  ],
}
