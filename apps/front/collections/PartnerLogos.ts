import type { CollectionConfig } from 'payload'

export const PartnerLogos: CollectionConfig = {
  slug: 'partner-logos',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Short description of the logo (used for accessibility).',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    crop: true,
    focalPoint: true,
    formatOptions: {
      format: 'webp',
      options: { quality: 85 },
    },
    imageSizes: [
      {
        name: 'card',
        width: 600,
        height: 400,
        fit: 'inside',

        withoutEnlargement: true,
        formatOptions: {
          format: 'webp',
          options: { quality: 85 },
        },
      },
    ],
  },
}
