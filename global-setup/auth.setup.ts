// global-setup/auth.setup.ts
import { test as setup, expect, type Page, request as pwRequest } from '@playwright/test';
import * as fs from 'fs/promises';
import { sessionTemplate } from '../fixtures/api/apiRequestBodies';
import { createEntry } from '../utils/api/dataSourceApi';
import { loginAsAdmin, loginAsAttendee, loginAsSpeaker, loginAsExhibitor } from '../helpers/auth/login';

const ADMIN_STORAGE_STATE = 'storage-state/admin.json';
const SPEAKER_STORAGE_STATE = 'storage-state/speaker.json';
const ATTENDEE_STORAGE_STATE = 'storage-state/attendee.json';
const EXHIBITOR_STORAGE_STATE = 'storage-state/exhibitor.json';

setup.describe('Authentication Setup', () => {
  setup('Log in as Admin', async ({ page }) => {
    await loginAsAdmin(page);
    await page.context().storageState({ path: ADMIN_STORAGE_STATE });
    console.log('✅ Admin authentication state saved');
  });

  setup('Log in as Speaker', async ({ page }) => {
    await loginAsSpeaker(page);
    await page.context().storageState({ path: SPEAKER_STORAGE_STATE });
    console.log('✅ Speaker authentication state saved');
  });

  setup('Log in as Attendee', async ({ page }) => {
    await loginAsAttendee(page);
    await page.context().storageState({ path: ATTENDEE_STORAGE_STATE });
    console.log('✅ Attendee authentication state saved');
  });

  setup('Log in as Exhibitor', async ({ page }) => {
    await loginAsExhibitor(page);
    await page.context().storageState({ path: EXHIBITOR_STORAGE_STATE });
    console.log('✅ Exhibitor authentication state saved');
  });

  // Seed: Insert Agenda entry via Fliplet REST API and persist its ID
  setup('Seed: Insert Agenda entry', async () => {
    const apiBase = process.env.API_BASE_URL || 'https://api.fliplet.com/v1';
    const token = process.env.FLIPLET_API_TOKEN;
    const dsAgenda = process.env.AGENDA_DS;

    if (!token || !dsAgenda) {
      console.warn('Skipping Agenda seed: missing FLIPLET_API_TOKEN or AGENDA_DS');
      return;
    }

    const apiContext = await pwRequest.newContext({
      baseURL: apiBase,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const id = await createEntry(apiContext, dsAgenda, sessionTemplate);

    await fs.mkdir('test-results', { recursive: true });
    await fs.writeFile('test-results/last-agenda-entry-id.txt', String(id), 'utf8');
    console.log('✅ Seeded Agenda entry ID:', id);
  });
});  