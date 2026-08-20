import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/admin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: adminOnly,
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'cliente',
      saveToJWT: true,
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Cliente', value: 'cliente' },
      ],
      access: {
        create: adminOnly,
        update: adminOnly,
      },
    },
  ],
  timestamps: true,
}
