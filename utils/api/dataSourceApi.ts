import { APIRequestContext } from '@playwright/test';

/**
 * Creates a new entry in a Fliplet Data Source.
 *
 * Endpoint: PUT /v1/data-sources/:dataSourceId/data
 * - If API_BASE_URL ends with /v1/data-sources/, this helper uses a
 *   relative path like `${dataSourceId}/data`.
 * - Otherwise ensure the full path is `/data-sources/${dataSourceId}/data`.
 *
 * @param apiContext Playwright APIRequestContext with Bearer token
 * @param dataSourceId Data Source ID
 * @param payload Entry data (keys must match DS columns)
 * @returns Created entry ID
 */
export async function createEntry(
  apiContext: APIRequestContext,
  dataSourceId: string,
  payload: Record<string, any> = {}
): Promise<number> {
  const response = await apiContext.put(`${dataSourceId}/data`, {
    data: payload
  });

  if (!response.ok()) {
    const status = response.status();
    const text = await response.text();
    throw new Error(`Create entry failed: HTTP ${status} - ${text}`);
  }

  const result: unknown = await response.json();
  const id = Array.isArray(result) ? (result[0] as any)?.id : (result as any)?.id;
  return id as number;
}

/**
 * Deletes an existing entry in a Fliplet Data Source.
 *
 * Endpoint: DELETE /v1/data-sources/:dataSourceId/data/:entryId
 * Path handling follows the same baseURL rule as createEntry.
 */
export async function deleteEntry(
  apiContext: APIRequestContext,
  dataSourceId: string,
  entryId: number
) {
  const response = await apiContext.delete(`${dataSourceId}/data/${entryId}`);
  if (!response.ok()) {
    const status = response.status();
    const text = await response.text();
    throw new Error(`Delete entry failed: HTTP ${status} - ${text}`);
  }
  return await response.json();
}
