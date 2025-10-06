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
    headless: true,  // Ensure browsers close automatically
  },

  projects: [
    // ========== SETUP PROJECT ==========
    {
      name: 'setup',
      testDir: './global-setup',
      testMatch: 'auth.setup.ts',
    },

    // ========== AUTH MODULE TESTS ==========
    {
      name: 'Auth Tests',
      // No dependencies on setup - runs with clean state
      testDir: './tests/auth',
      testMatch: 'tests/auth/**/*.spec.ts',
    },

    // ========== JOURNEY TESTS (E2E) ==========
    {
      name: 'Journey: Auth',
      dependencies: ['setup'],
      testDir: './tests/journeys/auth-journeys',
      testMatch: 'tests/journeys/auth-journeys/**/*.journey.spec.ts',
      use: { 
        storageState: ATTENDEE_STORAGE_STATE,
        trace: 'on' // Always trace journeys
      },
    },
    {
      name: 'Journey: Attendee',
      dependencies: ['setup'],
      testDir: './tests/journeys/attendee-journeys',
      testMatch: 'tests/journeys/attendee-journeys/**/*.journey.spec.ts',
      use: { 
        storageState: ATTENDEE_STORAGE_STATE,
        trace: 'on'
      },
    },
    {
      name: 'Journey: Admin',
      dependencies: ['setup'],
      testDir: './tests/journeys/admin-journeys',
      testMatch: 'tests/journeys/admin-journeys/**/*.journey.spec.ts',
      use: { 
        storageState: ADMIN_STORAGE_STATE,
        trace: 'on'
      },
    },
    {
      name: 'Journey: Integration',
      dependencies: ['setup'],
      testDir: './tests/journeys/integration-journeys',
      testMatch: 'tests/journeys/integration-journeys/**/*.journey.spec.ts',
      use: { 
        storageState: ADMIN_STORAGE_STATE, // Admin can do more
        trace: 'on'
      },
    },

    // ========== MODULE TESTS ==========
    {
      name: 'Admin Module Tests',
      dependencies: ['setup'],
      use: { storageState: ADMIN_STORAGE_STATE },
      testMatch: 'tests/admin/**/*.spec.ts',
    },
    {
      name: 'Attendee Module Tests',
      dependencies: ['setup'],
      use: { storageState: ATTENDEE_STORAGE_STATE },
      testMatch: 'tests/user/**/*.spec.ts',
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

    // ========== SPECIALIZED TESTS ==========
    {
      name: 'API Tests',
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
      name: 'RBAC Tests',
      dependencies: ['setup'],
      use: { storageState: ATTENDEE_STORAGE_STATE },
      testMatch: 'tests/rbac/**/*.spec.ts',
    },
    {
      name: 'Accessibility Tests',
      dependencies: ['setup'],
      use: { storageState: ATTENDEE_STORAGE_STATE },
      testMatch: 'tests/accessibility/**/*.spec.ts',
    },
    {
      name: 'Performance Tests',
      dependencies: ['setup'],
      use: { 
        storageState: ATTENDEE_STORAGE_STATE,
        video: 'off', // Faster performance tests
        screenshot: 'off'
      },
      testMatch: 'tests/performance/**/*.spec.ts',
    },
  ],
}); 