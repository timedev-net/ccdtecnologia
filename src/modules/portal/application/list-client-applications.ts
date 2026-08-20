import type { ClientApplication } from '../domain/application'

export interface ApplicationReader {
  findForUser(userID: number | string): Promise<ClientApplication[]>
}

export const listClientApplications = async (
  reader: ApplicationReader,
  userID: number | string,
): Promise<ClientApplication[]> => reader.findForUser(userID)
