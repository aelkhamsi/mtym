import type { CollectionConfig } from 'payload'

export const Organizers: CollectionConfig = {
  slug: 'organizers',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'category'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'portfolioUrl',
      type: 'text',
      admin: {
        description:
          'Link used on the card. Use a personal website if available, otherwise a LinkedIn profile URL.',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'organizer-photos',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'organizer-categories',
      hasMany: false,
      required: true,
    },
  ],
}
