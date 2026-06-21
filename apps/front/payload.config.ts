import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig, type Plugin } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Faq } from './collections/Faq'
import { FaqCategories } from './collections/FaqCategories'
import { Organizers } from './collections/Organizers'
import { OrganizerCategories } from './collections/OrganizerCategories'
import { OrganizerPhotos } from './collections/OrganizerPhotos'
import { Partners } from './collections/Partners'
import { PartnerCategories } from './collections/PartnerCategories'
import { PartnerLogos } from './collections/PartnerLogos'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Store uploads in MinIO (S3-compatible) when configured. Reuses the same
// MINIO_* env the API already uses. When MINIO_ENDPOINT is unset (local dev),
// Payload falls back to writing files to disk via each collection's staticDir.
const storagePlugins: Plugin[] = process.env.MINIO_ENDPOINT
  ? [
      s3Storage({
        collections: {
          media: { prefix: 'media' },
          'organizer-photos': { prefix: 'organizer-photos' },
          'partner-logos': { prefix: 'partner-logos' },
        },
        bucket: process.env.MINIO_BUCKET_NAME || '',
        config: {
          endpoint: process.env.MINIO_ENDPOINT,
          region: process.env.MINIO_REGION || 'us-east-1',
          forcePathStyle: true, // required for MinIO
          credentials: {
            accessKeyId: process.env.MINIO_ROOT_USER || '',
            secretAccessKey: process.env.MINIO_ROOT_PASSWORD || '',
          },
        },
      }),
    ]
  : []

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
    Partners,
    PartnerCategories,
    PartnerLogos,
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
  plugins: [...storagePlugins],
})
