import type { CollectionConfig } from 'payload'


export const OrganizerCategories: CollectionConfig = {
  slug: 'organizer-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order'],
    hidden: true,
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
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Controls the display order of the sections (lowest first).',
      },
    },
  ],
}
