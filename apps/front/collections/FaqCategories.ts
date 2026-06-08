import type { CollectionConfig } from 'payload'

export const FaqCategories: CollectionConfig = {
  slug: 'faq-categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
