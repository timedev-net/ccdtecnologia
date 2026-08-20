import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
import { redirects } from './redirects'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

const nextConfig: NextConfig = {
  output: 'standalone',
  // Payload keeps SQLite available for local development. Include its lazy-loaded
  // libSQL binary in the standalone trace so production's conditional adapter
  // loading does not fail at runtime.
  outputFileTracingIncludes: {
    '/*': [
      './node_modules/.pnpm/@libsql+*/node_modules/@libsql/**/*',
      './node_modules/.pnpm/libsql@*/node_modules/libsql/**/*',
      // Payload loads drizzle-kit dynamically while running a PostgreSQL
      // baseline migration, so Next cannot infer this runtime dependency.
      './node_modules/drizzle-kit/**/*',
      './node_modules/.pnpm/drizzle-kit@*/node_modules/drizzle-kit/**/*',
      './node_modules/.pnpm/@drizzle-team+*/node_modules/@drizzle-team/**/*',
      './node_modules/drizzle-orm/**/*',
      './node_modules/.pnpm/drizzle-orm@*/node_modules/drizzle-orm/**/*',
    ],
  },
  // Temporarily required on Windows until Next.js fixes Turbopack Sass resolution.
  // See: https://github.com/vercel/next.js/issues/86431
  sassOptions: {
    loadPaths: ['./node_modules/@payloadcms/ui/dist/scss/'],
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    qualities: [100],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
