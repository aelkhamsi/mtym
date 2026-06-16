import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Faq } from './collections/Faq'
import { FaqCategories } from './collections/FaqCategories'
import { Organizers } from './collections/Organizers'
import { OrganizerCategories } from './collections/OrganizerCategories'
import { OrganizerPhotos } from './collections/OrganizerPhotos'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '@/app/components/Logo#Logo',
        Icon: '@/app/components/Logo#Icon',
      },
    },
    meta: {
      icons: [{ url: '/images/logos/mtym_square.svg', type: 'image/svg+xml' }],
    },
  },
  collections: [
    Users,
    Media,
    Faq,
    FaqCategories,
    Organizers,
    OrganizerCategories,
    OrganizerPhotos,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
