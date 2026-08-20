import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getMeUser } from '@/utilities/getMeUser'
import { listClientApplications } from '@/modules/portal/application/list-client-applications'
import { PayloadApplicationReader } from '@/modules/portal/infrastructure/payload-application-reader'
import { PortalDashboard } from '@/modules/portal/presentation/portal-dashboard'

export default async function PortalPage() {
  const { user } = await getMeUser({ nullUserRedirect: '/login' })
  const payload = await getPayload({ config: configPromise })
  const applications = await listClientApplications(new PayloadApplicationReader(payload, user), user.id)

  return <PortalDashboard applications={applications} name={user.name} />
}
