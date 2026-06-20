import type { CollectionConfig } from 'payload'

export const PartnerCategories: CollectionConfig = {
  slug: 'partner-categories',
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
      admin: {
        description:
          'Section title shown on the /partners page (e.g. Organisateur, Co-organisateur, Partenaire officiel, Sponsors).',
      },
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
