import { test, expect, request } from '@playwright/test';
import * as fs from 'fs/promises';
import { createEntry, deleteEntry } from '../../utils/api/api';
import { sessionTemplate, userTemplate } from '../../fixtures/api/apiRequestBodies';

const apiBase = process.env.API_BASE_URL || 'https://api.fliplet.com/v1';
const token = process.env.FLIPLET_API_TOKEN;

 test.describe.serial('Insert and delete Agenda entry', () => {
  let entryId: number | undefined;

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

  test('Insert Agenda event', async () => {
    if (!token) throw new Error('FLIPLET_API_TOKEN not set');
    const dsAgenda = process.env.AGENDA_DS;
    if (!dsAgenda) throw new Error('AGENDA_DS not set');

    const apiContext = await createApiContext();

    entryId = await createEntry(apiContext, dsAgenda, sessionTemplate);
    expect(entryId).toBeGreaterThan(0);
    console.log('Created event entry ID:', entryId);
    await fs.mkdir('test-results', { recursive: true });
    await fs.writeFile('test-results/last-agenda-entry-id.txt', String(entryId), 'utf8');
  });

  test('Delete Agenda entry', async () => {
    if (!token) throw new Error('FLIPLET_API_TOKEN not set');
    let idToDelete = entryId;
    if (!idToDelete) {
      try {
        const txt = await fs.readFile('test-results/last-agenda-entry-id.txt', 'utf8');
        const parsed = Number(txt.trim());
        if (Number.isFinite(parsed)) idToDelete = parsed;
      } catch {}
    }
    if (!idToDelete) throw new Error('Entry ID not set. Run insert test first.');

    const dsAgenda = process.env.AGENDA_DS;
    if (!dsAgenda) throw new Error('AGENDA_DS not set');

    const apiContext = await createApiContext();

    try {
      await deleteEntry(apiContext, dsAgenda, idToDelete);
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