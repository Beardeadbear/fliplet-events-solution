// helpers/data/flipletApiClient.ts

import { APIRequestContext } from '@playwright/test';
import { AgendaAPI } from './agendaHelpers';
import { DATA_SOURCES } from './constants';

/**
 * Main API Client that provides access to data source helpers
 * Currently only supports Agenda operations (Insert and Delete)
 */
export class FlipletAPIClient {
  public agenda: AgendaAPI;

  constructor(apiContext: APIRequestContext) {
    this.agenda = new AgendaAPI(apiContext);
  }

  /**
   * Get all data source IDs
   */
  static getDataSources() {
    return DATA_SOURCES;
  }
}
