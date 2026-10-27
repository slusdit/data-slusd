/**
 * Limits shared by the report runner (server) and the report screens (client).
 * Pure constants only: this module is imported from client components.
 */

/**
 * Hard cap on rows returned to the app from any report query (finding S13).
 * Raised from 10,000 on 2026-10-27: single-school grade/attendance reports
 * (one row per student per section) run to ~16,000 rows and must show whole.
 */
export const MAX_ROWS = 50_000;

/** "50,000" for banners and messages. */
export const MAX_ROWS_LABEL = MAX_ROWS.toLocaleString("en-US");
