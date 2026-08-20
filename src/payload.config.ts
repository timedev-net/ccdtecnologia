import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Applications } from './collections/Applications'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const databaseURL = process.env.DATABASE_URL || ''
const usesPostgres = databaseURL.startsWith('postgres://') || databaseURL.startsWith('postgresql://')
const minioConfiguration = {
  accessKey: process.env.S3_ACCESS_KEY || '',
  bucket: process.env.S3_BUCKET || '',
  endpoint: process.env.S3_ENDPOINT || '',
  secretKey: process.env.S3_SECRET_KEY || '',
}
const usesMinio = Object.values(minioConfiguration).every(Boolean)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: usesPostgres
    ? postgresAdapter({
        pool: {
          connectionString: databaseURL,
        },
        // The production database is provisioned empty by Coolify. Later schema changes must use migrations.
        push: true,
      })
    : sqliteAdapter({
        client: {
          url: databaseURL,
        },
        // Schema changes are applied through the tracked migrations, never by a dev-server rewrite.
        push: false,
        prodMigrations: migrations,
      }),
  collections: [Pages, Posts, Media, Categories, Users, Applications],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    ...(usesMinio
      ? [
          s3Storage({
            bucket: minioConfiguration.bucket,
            collections: {
              media: true,
            },
            config: {
              credentials: {
                accessKeyId: minioConfiguration.accessKey,
                secretAccessKey: minioConfiguration.secretKey,
              },
              endpoint: minioConfiguration.endpoint,
              forcePathStyle: true,
              region: process.env.S3_REGION || 'us-east-1',
            },
          }),
        ]
      : []),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
