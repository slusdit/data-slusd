'use server';

import prisma from './db';
import { calculateCurrentSchoolYear, AVAILABLE_DB_YEARS } from './schoolYear';

// Setting keys - defined inline since "use server" files can only export async functions
const SETTING_KEYS = {
  DEFAULT_DB_YEAR: 'defaultDbYear',
} as const;

/**
 * Get a setting value by key
 */
export async function getSetting(key: string): Promise<string | null> {
  const setting = await prisma.appSetting.findUnique({
    where: { key },
  });
  return setting?.value ?? null;
}

/**
 * Set a setting value
 */
export async function setSetting(
  key: string,
  value: string,
  label?: string,
  updatedBy?: string
): Promise<void> {
  await prisma.appSetting.upsert({
    where: { key },
    update: {
      value,
      label,
      updatedBy,
    },
    create: {
      key,
      value,
      label,
      updatedBy,
    },
  });
}

/**
 * Get all settings
 */
export async function getAllSettings(): Promise<Record<string, string>> {
  const settings = await prisma.appSetting.findMany();
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Get the effective default database year.
 * Priority:
 * 1. Admin override (from AppSetting)
 * 2. Calculated based on current date
 */
export async function getDefaultDbYear(): Promise<number> {
  try {
    const setting = await getSetting(SETTING_KEYS.DEFAULT_DB_YEAR);
    if (setting) {
      const parsed = parseInt(setting, 10);
      // Validate it's a valid year
      if (!isNaN(parsed) && AVAILABLE_DB_YEARS.some(y => y.year === parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    // If database isn't available (e.g., during build), fall back to calculated
    console.warn('Could not fetch default DB year from settings:', error);
  }

  // Fall back to calculated default
  return calculateCurrentSchoolYear();
}

/**
 * Update the default database year (admin only)
 */
export async function updateDefaultDbYear(year: number, userId: string): Promise<void> {
  // Validate it's a known year
  if (!AVAILABLE_DB_YEARS.some(y => y.year === year)) {
    throw new Error(`Invalid year: ${year}. Must be one of: ${AVAILABLE_DB_YEARS.map(y => y.year).join(', ')}`);
  }

  await setSetting(
    SETTING_KEYS.DEFAULT_DB_YEAR,
    year.toString(),
    'Default Database Year',
    userId
  );
}
