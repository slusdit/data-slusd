/**
 * SLUSD school code -> display name mapping.
 * Single source of truth - import this instead of redefining the map.
 */
export const SCHOOL_NAMES: Record<string, string> = {
  '2': 'Garfield Elementary',
  '3': 'Jefferson Elementary',
  '4': 'Madison Elementary',
  '5': 'McKinley Elementary',
  '6': 'Monroe Elementary',
  '7': 'Roosevelt Elementary',
  '8': 'Washington Elementary',
  '9': 'Halkin Elementary',
  '11': 'Bancroft Middle School',
  '12': 'Muir Middle School',
  '15': 'Lincoln High School',
  '16': 'San Leandro High School',
  '60': 'SLVA Elementary',
  '61': 'SLVA Middle',
  '62': 'SLVA High',
};

export function getSchoolName(code: string | number): string {
  return SCHOOL_NAMES[code.toString()] || `School ${code}`;
}
