import { test, expect, request } from '@playwright/test';
import { FlipletAPIClient } from '../../helpers/data/flipletApiClient';
import { sessionTemplate } from '../../fixtures/api/apiRequestBodies';

const apiBase = process.env.API_BASE_URL || 'https://api.fliplet.com/v1';
const token = process.env.FLIPLET_API_TOKEN;

test.describe.serial('Agenda Data Source Operations', () => {
  let api: FlipletAPIClient;
  let agendaEntryId: number | undefined;

  // SoC/DRY: centralize API context creation
  const createApiContext = async () => {
    if (!token) throw new Error('FLIPLET_API_TOKEN not set');
    return request.newContext({
      baseURL: apiBase,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  };

  test.beforeAll(async () => {
    const apiContext = await createApiContext();
    api = new FlipletAPIClient(apiContext);
  });

  // INSERT operation
  test('Insert Agenda entry', async () => {
    agendaEntryId = await api.agenda.createSession(sessionTemplate);
    expect(agendaEntryId).toBeGreaterThan(0);
    console.log('✅ Created Agenda entry ID:', agendaEntryId);
  });

  // DELETE operation
  test('Delete Agenda entry', async () => {
    if (!agendaEntryId) throw new Error('Agenda entry ID not set');

    await api.agenda.deleteSession(agendaEntryId);
    console.log('✅ Deleted Agenda entry ID:', agendaEntryId);
  });
});
