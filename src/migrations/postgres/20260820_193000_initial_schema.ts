import { pushDevSchema } from '@payloadcms/drizzle'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await pushDevSchema(payload.db as Parameters<typeof pushDevSchema>[0])
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // A baseline migration must never drop the production schema automatically.
}
