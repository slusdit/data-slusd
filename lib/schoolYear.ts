/**
 * School Year Utilities
 *
 * These are pure functions that can be used in both client and server contexts.
 */

// Available Aeries database years (add new years as they become available)
// Year code is the START year of the school year (e.g., 25 = 2025-26)
export const AVAILABLE_DB_YEARS = [
  { year: 25, label: '2025-26', database: 'DST25000SLUSD' },
  { year: 24, label: '2024-25', database: 'DST24000SLUSD' },
  { year: 23, label: '2023-24', database: 'DST23000SLUSD' },
  { year: 22, label: '2022-23', database: 'DST22000SLUSD' },
];

/**
 * Calculate the current school year based on date.
 * School year starts July 1st.
 * Returns the 2-digit year code representing the START year of the school year.
 *
 * Examples:
 * - June 30, 2025 -> 24 (2024-25 school year, started in 2024)
 * - July 1, 2025 -> 25 (2025-26 school year, starts in 2025)
 * - December 2025 -> 25 (2025-26 school year)
 *
 * The database naming convention uses the START year of the school year.
 * So 2025-26 school year uses DST25000SLUSD (year code 25).
 */
export function calculateCurrentSchoolYear(): number {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed (0 = January, 6 = July)

  // If before July (months 0-5), we're in the school year that started last calendar year
  // e.g., March 2025 -> 2024-25 school year -> year code 24 (started 2024)
  // If July or later (months 6-11), we're in the new school year
  // e.g., August 2025 -> 2025-26 school year -> year code 25 (starts 2025)

  if (currentMonth < 6) {
    // Before July: school year started last year
    return (currentYear - 1) % 100;
  } else {
    // July or later: school year starts this year
    return currentYear % 100;
  }
}

// Calculated default - can be overridden by admin setting
export const DEFAULT_DB_YEAR = calculateCurrentSchoolYear();

// Build database name from year code
export function getDatabaseName(yearCode: number): string {
  const yearInfo = AVAILABLE_DB_YEARS.find(y => y.year === yearCode);
  if (yearInfo) {
    return yearInfo.database;
  }
  // Fallback: construct from pattern if not found in list
  return `DST${yearCode.toString().padStart(2, '0')}000SLUSD`;
}
