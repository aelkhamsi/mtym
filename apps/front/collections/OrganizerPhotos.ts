import type { CollectionConfig } from 'payload'


export const OrganizerPhotos: CollectionConfig = {
  slug: 'organizer-photos',
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
        description: 'Short description of the photo (used for accessibility).',
      },
    },
  ],
  upload: {
    staticDir: 'public/images/payload/organizer-photos',
    mimeTypes: ['image/*'],
    crop: true,
    focalPoint: true,
    formatOptions: {
      format: 'webp',
      options: { quality: 80 },
    },
    imageSizes: [
      {
        name: 'card',
        width: 500,
        height: 500,
        crop: 'center',
        formatOptions: {
          format: 'webp',
          options: { quality: 80 },
        },
      },
    ],
  },
}
