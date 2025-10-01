import { test, expect, request } from '@playwright/test';
// This spec exercises Fliplet Data Sources API:
// 1) Insert an Agenda entry using a payload fixture
// 2) Persist the created ID to a file for standalone delete runs
// 3) Delete the entry, logging a simple ID-only message; treat 404 as already deleted
import * as fs from 'fs/promises';
import { FlipletAPIClient } from '../../helpers/data/flipletApiClient';
import { sessionTemplate } from '../../fixtures/api/apiRequestBodies';

const apiBase = process.env.API_BASE_URL || 'https://api.fliplet.com/v1';
const token = process.env.FLIPLET_API_TOKEN;

 test.describe.serial('Insert and delete Agenda entry', () => {
  let entryId: number | undefined;
  let api: FlipletAPIClient;

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

  // Arrange, Act, Assert: Insert Agenda event and persist its ID
  test('Insert Agenda event', async () => {
    entryId = await api.agenda.createSession(sessionTemplate);
    expect(entryId).toBeGreaterThan(0);
    console.log('Created event entry ID:', entryId);
    await fs.mkdir('test-results', { recursive: true });
    await fs.writeFile('test-results/last-agenda-entry-id.txt', String(entryId), 'utf8');
  });

  // Arrange, Act, Assert: Delete Agenda entry if present (supports standalone run)
  test('Delete Agenda entry', async () => {
    let idToDelete = entryId;
    if (!idToDelete) {
      try {
        const txt = await fs.readFile('test-results/last-agenda-entry-id.txt', 'utf8');
        const parsed = Number(txt.trim());
        if (Number.isFinite(parsed)) idToDelete = parsed;
      } catch {}
    }
    if (!idToDelete) throw new Error('Entry ID not set. Run insert test first.');

    try {
      await api.agenda.deleteSession(idToDelete);
      console.log('Deleted entry ID:', idToDelete);
    } catch (e) {
      const msg = String(e);
      if (msg.includes('HTTP 404')) {
        console.log(`Entry ${idToDelete} not found; considered already deleted.`);
        return;
      } else {
        throw e;
      }
    }
  });
}); 