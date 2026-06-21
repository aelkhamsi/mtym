import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Organizers: CollectionConfig = {
  slug: 'organizers',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  upload: {
    // Store uploaded photos directly under the front-end public folder so they
    // are served as static assets at /images/payload/organizer-photos/<filename>
    staticDir: path.resolve(dirname, '../public/images/payload/organizer-photos'),
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'organizing-committee',
      options: [
        { label: 'Organizing Committee', value: 'organizing-committee' },
        { label: 'Web Development', value: 'web-development' },
        { label: 'Design & Branding', value: 'design-and-branding' },
      ],
    },
    {
      name: 'portfolioSrc',
      type: 'text',
      label: 'Portfolio / LinkedIn URL',
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
