// helpers/data/agendaHelpers.ts

import { APIRequestContext } from '@playwright/test';
import { createEntry, deleteEntry } from '../../utils/api/dataSourceApi';
import { DATA_SOURCES } from './constants';

/**
 * Agenda/Sessions Data Source Helper
 * Handles Insert and Delete operations for event sessions and agenda items
 */
export class AgendaAPI {
  constructor(private apiContext: APIRequestContext) {}

  /**
   * Create a new session/agenda entry
   */
  async createSession(sessionData: any): Promise<number> {
    return await createEntry(this.apiContext, DATA_SOURCES.AGENDA, sessionData);
  }

  /**
   * Delete a session
   */
  async deleteSession(sessionId: number): Promise<any> {
    return await deleteEntry(this.apiContext, DATA_SOURCES.AGENDA, sessionId);
  }
}
