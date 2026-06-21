import type { CollectionConfig } from 'payload'
import { uploadDir } from './uploadDir'

export const PartnerLogos: CollectionConfig = {
  slug: 'partner-logos',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
    hidden: true,
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
    staticDir: uploadDir('partner-logos'),
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
