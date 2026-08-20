import type { Access, CollectionConfig } from 'payload'

import { adminOnly } from '@/access/admin'
import type { User } from '@/payload-types'
import { slugField } from 'payload'

const canReadAssignedApplications: Access = ({ req }) => {
  const user = req.user as User | undefined

  if (!user) return false
  if (user.role === 'admin') return true

  return {
    clients: {
      contains: user.id,
    },
  }
}

export const Applications: CollectionConfig<'applications'> = {
  slug: 'applications',
  admin: {
    defaultColumns: ['name', 'status', 'updatedAt'],
    useAsTitle: 'name',
  },
  access: {
    admin: adminOnly,
    create: adminOnly,
    delete: adminOnly,
    read: canReadAssignedApplications,
    update: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'icon',
      type: 'select',
      required: true,
      defaultValue: 'layout-dashboard',
      options: [
        { label: 'Painel', value: 'layout-dashboard' },
        { label: 'Bot', value: 'bot' },
        { label: 'Gráfico', value: 'chart-no-axes-combined' },
        { label: 'Nuvem', value: 'cloud' },
        { label: 'Código', value: 'code-2' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      validate: (value: unknown) => {
        if (typeof value !== 'string') return 'Informe uma URL HTTPS válida.'

        try {
          return new URL(value).protocol === 'https:' || 'A URL deve usar HTTPS.'
        } catch {
          return 'Informe uma URL HTTPS válida.'
        }
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'online',
      options: [
        { label: 'Online', value: 'online' },
        { label: 'Em manutenção', value: 'maintenance' },
        { label: 'Indisponível', value: 'unavailable' },
      ],
    },
    {
      name: 'clients',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      required: true,
      filterOptions: {
        role: {
          equals: 'cliente',
        },
      },
    },
    slugField(),
  ],
  timestamps: true,
}
