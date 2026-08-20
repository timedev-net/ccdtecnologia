import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE users ADD COLUMN role text NOT NULL DEFAULT 'cliente';`)
  await db.run(sql`
    CREATE TABLE applications (
      id integer PRIMARY KEY NOT NULL,
      name text NOT NULL,
      description text NOT NULL,
      icon text NOT NULL DEFAULT 'layout-dashboard',
      url text NOT NULL,
      status text NOT NULL DEFAULT 'online',
      generate_slug integer DEFAULT true,
      slug text NOT NULL,
      updated_at text NOT NULL,
      created_at text NOT NULL
    );
  `)
  await db.run(sql`CREATE UNIQUE INDEX applications_slug_idx ON applications (slug);`)
  await db.run(sql`
    CREATE TABLE applications_rels (
      id integer PRIMARY KEY NOT NULL,
      _order integer,
      parent_id integer NOT NULL,
      path text NOT NULL,
      users_id integer,
      FOREIGN KEY (parent_id) REFERENCES applications(id) ON DELETE cascade,
      FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE cascade
    );
  `)
  await db.run(sql`CREATE INDEX applications_rels_parent_idx ON applications_rels (parent_id);`)
  await db.run(sql`CREATE INDEX applications_rels_users_id_idx ON applications_rels (users_id);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE applications_rels;`)
  await db.run(sql`DROP TABLE applications;`)
}
