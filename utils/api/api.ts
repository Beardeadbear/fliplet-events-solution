import { APIRequestContext } from '@playwright/test';

// Utility to create a new entry in a given Data Source
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

// Utility to delete an entry from a given Data Source
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
