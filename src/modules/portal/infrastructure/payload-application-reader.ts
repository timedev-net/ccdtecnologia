import type { Payload } from 'payload'

import type { Application, User } from '@/payload-types'
import type { ApplicationReader } from '../application/list-client-applications'
import type { ClientApplication } from '../domain/application'

const statuses = new Set(['online', 'maintenance', 'unavailable'])

const toClientApplication = (application: Application): ClientApplication => ({
  id: application.id,
  name: application.name,
  description: application.description,
  icon: application.icon,
  url: application.url,
  status: statuses.has(application.status) ? application.status : 'unavailable',
})

export class PayloadApplicationReader implements ApplicationReader {
  constructor(
    private readonly payload: Payload,
    private readonly user: User,
  ) {}

  async findForUser(_userID: number | string): Promise<ClientApplication[]> {
    const result = await this.payload.find({
      collection: 'applications',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      user: this.user,
      sort: 'name',
    })

    return result.docs.map(toClientApplication)
  }
}
