import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  it('limits client application reads to assigned applications', async () => {
    const suffix = Date.now().toString()
    const client = await payload.create({
      collection: 'users',
      data: { email: `cliente-${suffix}@example.com`, name: 'Cliente de teste', password: 'senha-segura', role: 'cliente' },
    })
    const otherClient = await payload.create({
      collection: 'users',
      data: { email: `outro-${suffix}@example.com`, name: 'Outro cliente', password: 'senha-segura', role: 'cliente' },
    })

    const assigned = await payload.create({
      collection: 'applications',
      data: { clients: [client.id], description: 'Aplicativo liberado', icon: 'layout-dashboard', name: `App liberado ${suffix}`, slug: `app-liberado-${suffix}`, status: 'online', url: 'https://example.com/assigned' },
    })
    await payload.create({
      collection: 'applications',
      data: { clients: [otherClient.id], description: 'Aplicativo restrito', icon: 'bot', name: `App restrito ${suffix}`, slug: `app-restrito-${suffix}`, status: 'online', url: 'https://example.com/restricted' },
    })

    const applications = await payload.find({
      collection: 'applications',
      overrideAccess: false,
      user: client,
    })

    expect(applications.docs.map((application) => application.id)).toEqual([assigned.id])
  })
})
