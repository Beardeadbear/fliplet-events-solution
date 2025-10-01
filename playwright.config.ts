// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './test-data/app.data';
import { channel } from 'diagnostics_channel';

// The teardown script is configured at the top level to run after all tests have finished.
const globalTeardown = require.resolve('./global-setup/global-teardown');

export const ADMIN_STORAGE_STATE = 'storage-state/admin.json';
export const ATTENDEE_STORAGE_STATE = 'storage-state/attendee.json';
export const SPEAKER_STORAGE_STATE = 'storage-state/speaker.json';
export const EXHIBITOR_STORAGE_STATE = 'storage-state/exhibitor.json';


export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  // Note: globalSetup is not needed here because we use a 'setup' project.
  globalTeardown,

  use: {
    baseURL: BASE_URL,  
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testDir: './global-setup',
      testMatch: 'auth.setup.ts',
    },
    {
      name: 'Auth Tests',
      // No dependencies on setup - runs with clean state
      testDir: './tests/auth',
      testMatch: 'tests/auth/**/*.spec.ts',
      use: {
        channel: 'chrome',
      },
    },
    {
      name: 'Admin Tests',
      dependencies: ['setup'],
      use: { storageState: ADMIN_STORAGE_STATE },
      testMatch: 'tests/admin/**/*.spec.ts',
    },
    {
      name: 'Attendee Tests',
      dependencies: ['setup'],
      use: { storageState: ATTENDEE_STORAGE_STATE },
      testMatch: 'tests/user/**/*.spec.ts',
    },
    {
      name: 'API',
      use: {
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders: {
          'Authorization': `Bearer ${process.env.FLIPLET_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      },
      testMatch: 'tests/api/**/*.spec.ts',
    },
    {
      name: 'Exhibitor Tests',
      dependencies: ['setup'],
       use: { storageState: EXHIBITOR_STORAGE_STATE },
      testMatch: 'tests/exhibitor/**/*.spec.ts',
    },
    {
      name: 'Speaker Tests',
      dependencies: ['setup'],
      use: { storageState: SPEAKER_STORAGE_STATE },
      testMatch: 'tests/speaker/**/*.spec.ts',
    },
      ],
}); 