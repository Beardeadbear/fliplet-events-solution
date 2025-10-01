import * as fs from 'fs/promises';
import * as path from 'path';
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

  // Cleanup: Delete seeded Agenda entry if present
  try {
    const idTxt = await fs.readFile(path.resolve(__dirname, '..', 'test-results/last-agenda-entry-id.txt'), 'utf8');
    const entryId = Number(String(idTxt).trim());
    const apiBase = process.env.API_BASE_URL || 'https://api.fliplet.com/v1';
    const token = process.env.FLIPLET_API_TOKEN;
    const dsAgenda = process.env.AGENDA_DS;

    if (Number.isFinite(entryId) && token && dsAgenda) {
      const url = `${apiBase}/data-sources/${dsAgenda}/data/${entryId}`;
      const res = await (globalThis as any).fetch(url, { method: 'DELETE', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } } as any);
      if (res && res.ok) {
        console.log(`Seeded Agenda entry deleted: ${entryId}`);
      } else if (res && res.status === 404) {
        console.log(`Seeded Agenda entry ${entryId} not found; already removed.`);
      } else {
        console.warn(`Failed to delete seeded entry ${entryId}: HTTP ${res ? res.status : 'no-response'}`);
      }
    }
  } catch {
    // ignore if file missing or deletion fails silently
  }
  console.log('--- Global Teardown Complete ---');
}

export default globalTeardown; 