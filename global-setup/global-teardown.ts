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
  console.log('--- Global Teardown Complete ---');
}

export default globalTeardown; 