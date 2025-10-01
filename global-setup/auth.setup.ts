// global-setup/auth.setup.ts
import { test as setup, expect, type Page } from '@playwright/test';
import * as fs from 'fs/promises';
import { sessionTemplate } from '../fixtures/api/apiRequestBodies';
import { LoginPage } from '../page-objects/login.page';
import { OnboardingPage } from '../page-objects/onboarding.page';
import { ADMIN_EMAIL, ADMIN_PASSWORD, SPEAKER_EMAIL, SPEAKER_PASSWORD, ATTENDEE_EMAIL, ATTENDEE_PASSWORD, EXHIBITOR_EMAIL, EXHIBITOR_PASSWORD } from '../test-data/app.data';

const ADMIN_STORAGE_STATE = 'storage-state/admin.json';
const SPEAKER_STORAGE_STATE = 'storage-state/speaker.json';
const ATTENDEE_STORAGE_STATE = 'storage-state/attendee.json';
const EXHIBITOR_STORAGE_STATE = 'storage-state/exhibitor.json';

setup.describe('Authentication Setup', () => {
  const loginAs = async (page: Page, user: { username?: string, password?: string }) => {
    const onboardingPage = new OnboardingPage(page);
    const loginPage = new LoginPage(page);

    await onboardingPage.goto();
    await onboardingPage.completeOnboarding();

    // No need to call loginPage.goto() - onboarding leaves us on login page
    await loginPage.login(user.username!, user.password!);
  };

  setup('Log in as Admin', async ({ page }) => {
    await loginAs(page, { username: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    await expect(page.getByRole('button', { name: 'Check In' })).toBeVisible();
    await page.context().storageState({ path: ADMIN_STORAGE_STATE });
    console.log('✅ Admin authentication state saved');
  });

  setup('Log in as Speaker', async ({ page }) => {
    await loginAs(page, { username: SPEAKER_EMAIL, password: SPEAKER_PASSWORD });
    await expect(page.getByRole('button', { name: 'Check In' })).toBeVisible();
    await page.context().storageState({ path: SPEAKER_STORAGE_STATE });
    console.log('✅ Speaker authentication state saved');
  });

  setup('Log in as Attendee', async ({ page }) => {
    await loginAs(page, { username: ATTENDEE_EMAIL, password: ATTENDEE_PASSWORD });
    await expect(page.getByRole('button', { name: 'Check In' })).toBeVisible();
    await page.context().storageState({ path: ATTENDEE_STORAGE_STATE });
    console.log('✅ Attendee authentication state saved');
  });

  setup('Log in as Exhibitor', async ({ page }) => {
    await loginAs(page, { username: EXHIBITOR_EMAIL, password: EXHIBITOR_PASSWORD });
    await expect(page.getByRole('button', { name: 'Check In' })).toBeVisible();
    await page.context().storageState({ path: EXHIBITOR_STORAGE_STATE });
    console.log('✅ Exhibitor authentication state saved');
  });

  // Seed: Insert Agenda entry via Fliplet REST API and persist its ID
  setup('Seed: Insert Agenda entry', async ({ request }) => {
    const apiBase = process.env.API_BASE_URL || 'https://api.fliplet.com/v1';
    const token = process.env.FLIPLET_API_TOKEN;
    const dsAgenda = process.env.AGENDA_DS;

    if (!token || !dsAgenda) {
      console.warn('Skipping Agenda seed: missing FLIPLET_API_TOKEN or AGENDA_DS');
      return;
    }

    const api = await request.newContext({
      baseURL: apiBase,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const res = await api.put(`/data-sources/${dsAgenda}/data`, { data: sessionTemplate });
    if (!res.ok()) {
      throw new Error(`Seed insert failed: HTTP ${res.status()} - ${await res.text()}`);
    }
    const body: any = await res.json();
    const id: number = Array.isArray(body) ? body[0]?.id : body?.id;
    if (!id) throw new Error('Seed insert did not return an entry ID');

    await fs.mkdir('test-results', { recursive: true });
    await fs.writeFile('test-results/last-agenda-entry-id.txt', String(id), 'utf8');
    console.log('✅ Seeded Agenda entry ID:', id);
  });
});  