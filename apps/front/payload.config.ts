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
const storagePlugins: Plugin[] = process.env.MINIO_ENDPOINT
  ? [
      s3Storage({
        collections: {
          media: { prefix: 'media', disablePayloadAccessControl: true },
          'organizer-photos': { prefix: 'organizer-photos', disablePayloadAccessControl: true },
          'partner-logos': { prefix: 'partner-logos', disablePayloadAccessControl: true },
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
      views: {
        applicationDetail: {
          Component: '@/app/(payload)/views/applications/[id]/index.tsx',
          path: '/applications/:id',
        },
        applications: {
          Component: '@/app/(payload)/views/applications/index.tsx',
          path: '/applications'
        },
        teams: {
          Component: '@/app/(payload)/views/teams/index.tsx',
          path: '/teams'
        },
      },
      beforeNavLinks: [
        {path: '@/app/(payload)/components/CustomNavLinks'}
      ],
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
