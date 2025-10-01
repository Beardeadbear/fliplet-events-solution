// helpers/data/constants.ts

/**
 * Data Source IDs from environment variables
 * Currently only Agenda data source is used
 */
export const DATA_SOURCES = {
  AGENDA: process.env.AGENDA_DS || '1541687'
} as const;
