import type { PayloadRequest } from 'payload'

import type { User } from '@/payload-types'

export const adminOnly = ({ req }: { req: PayloadRequest }): boolean => {
  const user = req.user as User | undefined
  return user?.role === 'admin'
}
