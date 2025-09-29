import * as dotenv from 'dotenv';
dotenv.config(); // Load variables from .env file

// This file loads configuration from environment variables.
// The '!' (non-null assertion) is used because we expect these values to be set in the .env file.

export const BASE_URL = process.env.BASE_URL!;

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
export const ATTENDEE_EMAIL = process.env.ATTENDEE_EMAIL!;
export const ATTENDEE_PASSWORD = process.env.ATTENDEE_PASSWORD!;
export const EXHIBITOR_EMAIL = process.env.EXHIBITOR_EMAIL!;
export const EXHIBITOR_PASSWORD = process.env.EXHIBITOR_PASSWORD!;  
export const SPEAKER_EMAIL = process.env.SPEAKER_EMAIL!;
export const SPEAKER_PASSWORD = process.env.SPEAKER_PASSWORD!;

// Invalid credentials for testing negative scenarios
export const INVALID_EMAIL = process.env.INVALID_EMAIL!;
export const INVALID_PASSWORD = process.env.INVALID_PASSWORD!;
