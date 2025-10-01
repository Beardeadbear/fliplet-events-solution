import * as fs from 'fs/promises';
import * as path from 'path';
import { request } from '@playwright/test';
import { FlipletAPIClient } from '../helpers/data/flipletApiClient';
// This script runs once after all tests have completed to clean up artifacts
// like authentication state files. This ensures each full test execution is independent.

async function globalTeardown() {
  console.log('--- Running Global Teardown ---');
  const adminStateFile = path.resolve(__dirname, '..', 'storage-state/admin.json');
  const attendeeStateFile = path.resolve(__dirname, '..', 'storage-state/attendee.json');
  const exhibitorStateFile = path.resolve(__dirname, '..', 'storage-state/exhibitor.json');
  const speakerStateFile = path.resolve(__dirname, '..', 'storage-state/speaker.json');

  try {
    await fs.rm(adminStateFile, { force: true });
    await fs.rm(attendeeStateFile, { force: true });
    await fs.rm(exhibitorStateFile, { force: true });
    await fs.rm(speakerStateFile, { force: true });
    console.log('Authentication state files deleted.');
  } catch (error) {
    console.error('Error during global teardown:', error);
  }

  // Cleanup: Delete seeded Agenda entry if present (using same approach as working test)
  try {
    const filePath = path.resolve(__dirname, '..', 'test-results/last-agenda-entry-id.txt');
    const idTxt = await fs.readFile(filePath, 'utf8');
    const entryId = Number(String(idTxt).trim());
    const apiBase = process.env.API_BASE_URL || 'https://api.fliplet.com/v1';
    const token = process.env.FLIPLET_API_TOKEN;

    if (Number.isFinite(entryId) && token) {
      console.log(`Attempting to delete seeded Agenda entry: ${entryId}`);
      
      // Use the same API context creation as the working test
      const apiContext = await request.newContext({
        baseURL: apiBase,
        extraHTTPHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const api = new FlipletAPIClient(apiContext);

      try {
        await api.agenda.deleteSession(entryId);
        console.log(`Seeded Agenda entry deleted: ${entryId}`);
      } catch (e) {
        const msg = String(e);
        if (msg.includes('HTTP 404')) {
          console.log(`Entry ${entryId} not found; considered already deleted.`);
        } else {
          console.warn(`API error deleting seeded entry ${entryId}:`, e);
        }
      } finally {
        await apiContext.dispose();
      }
    } else {
      console.log('Skipping Agenda entry deletion: missing entryId or token');
    }
  } catch (fileError) {
    console.log('No seeded Agenda entry file found or file read error');
  }
  
  console.log('--- Global Teardown Complete ---');
}

export default globalTeardown; 