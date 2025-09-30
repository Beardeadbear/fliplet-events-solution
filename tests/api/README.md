## API tests (Fliplet Data Sources)

This folder contains Playwright API tests for Fliplet Data Sources.

### Files
- `agenda-api-integration.spec.ts`: inserts an Agenda entry, persists its ID, and deletes it.
- `../../utils/api/api.ts`: small helpers used by the spec:
  - `createEntry(apiContext, dataSourceId, payload)` → PUT `/v1/data-sources/:id/data`
  - `deleteEntry(apiContext, dataSourceId, entryId)` → DELETE `/v1/data-sources/:id/data/:entryId`
- `../../fixtures/api/apiRequestBodies.ts`: request body templates (e.g., `sessionTemplate`).

### Environment
Set these in `.env` (or your shell):

```
API_BASE_URL=https://api.fliplet.com/v1
FLIPLET_API_TOKEN=eu--xxxxxxxx
AGENDA_DS=1541687
```

### How it works
- The spec creates an API context with:
  - `baseURL: API_BASE_URL`
  - headers: `Authorization: Bearer <FLIPLET_API_TOKEN>` and `Content-Type: application/json`
- Insert test:
  - Uses `sessionTemplate` as payload
  - Calls `createEntry(...)`, asserts ID > 0, writes the ID to `test-results/last-agenda-entry-id.txt`
- Delete test:
  - Reads the ID from `test-results/last-agenda-entry-id.txt` (or uses in-memory ID when run serially)
  - Calls `deleteEntry(...)`
  - If the entry is already gone (404), it logs and returns without failing

### Run
Run the entire suite (serial group):

```bash
npx playwright test tests/api/agenda-api-integration.spec.ts
```

Run only delete (after insert has created the file):

```bash
npx playwright test tests/api/agenda-api-integration.spec.ts -g "Delete Agenda entry"
```

### Principles applied
- Separation of Concerns: spec (flow), utils (HTTP), fixtures (data)
- DRY: shared API context helper in the spec
- AAA: arrange (env/context), act (insert/delete), assert (ID and responses)
- Test independence: delete can run standalone by reading the persisted ID

