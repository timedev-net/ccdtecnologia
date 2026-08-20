export type ApplicationStatus = 'online' | 'maintenance' | 'unavailable'

export type ClientApplication = {
  id: number | string
  name: string
  description: string
  icon: string
  url: string
  status: ApplicationStatus
}
