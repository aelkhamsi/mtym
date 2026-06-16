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
      name: 'linkedinUrl',
      type: 'text',
      admin: {
        description:
          'LinkedIn profile URL. Used as the card link first if provided.',
      },
    },
    {
      name: 'websiteUrl',
      type: 'text',
      admin: {
        description:
          'Personal website URL. Used as the card link if there is no LinkedIn URL.',
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
