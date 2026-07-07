/**
 * View-Based Prompt Builder for AI Query System
 *
 * Generates system prompts that teach the LLM about the llm_* views
 * available in the Aeries database.
 *
 * Column listings (names + true data types + sampled flag values) are
 * generated from view-schema.generated.ts, which is introspected from the
 * live database (`npm run generate:view-schema`). The domain knowledge
 * (joins, synonyms, patterns, school codes, examples) is curated below.
 *
 * buildViewSystemPrompt accepts an optional view subset (see view-selector.ts):
 * the listing, join map, and examples are pruned to it, which improves small
 * models' column recall and cuts prompt-processing time.
 */

import { VIEW_SCHEMAS, ViewColumn } from './view-schema.generated';
import { SCHOOL_NAMES } from '@/lib/constants/schools';

// Curated grouping for readability; introspected views not listed here are
// appended under "Other Views"
const VIEW_CATEGORIES: [string, string[]][] = [
  ['Student Information', ['llm_student_demographics', 'llm_student_enrollment', 'llm_student_program_summary']],
  ['Attendance', ['llm_attendance_daily', 'llm_attendance_summary']],
  ['Special Programs & Special Education', ['llm_special_programs', 'llm_special_education']],
  ['Grades & GPA', ['llm_student_grades', 'llm_student_gpa']],
  ['Discipline', ['llm_discipline_incidents', 'llm_suspension_summary']],
  ['Courses & Rosters', ['llm_course_enrollments', 'llm_class_rosters', 'llm_all_sections']],
  ['Staff', ['llm_staff_roster', 'llm_teacher_courses', 'llm_elementary_teachers', 'llm_elementary_grades', 'llm_teacher_student_roster']],
  ['Contacts & Demographics', ['llm_student_contacts', 'llm_frpm_status', 'llm_sed_status']],
  ['Testing', ['llm_test_scores', 'llm_test_scores_current', 'llm_elpac_scores']],
];

// Join-map lines, filterable by view
const JOIN_MAP: [string, string][] = [
  ['llm_student_program_summary', '- llm_student_program_summary (p) - for program flags: is_special_education, is_english_learner, is_foster_youth, etc.'],
  ['llm_special_education', '- llm_special_education (sped) - for detailed IEP info: disability codes, placement, case manager'],
  ['llm_attendance_summary', '- llm_attendance_summary (att) - for attendance stats: attendance_rate_percent, is_chronically_absent'],
  ['llm_student_gpa', '- llm_student_gpa (gpa) - for academic standing: current_gpa, failing_grade_count'],
  ['llm_suspension_summary', '- llm_suspension_summary (disc) - for discipline: total_suspensions, discipline_risk_level'],
  ['llm_frpm_status', '- llm_frpm_status (frpm) - for lunch status: is_frpm_eligible, is_free, is_reduced'],
  ['llm_sed_status', '- llm_sed_status (sed) - for socioeconomic status: is_sed, sed_reason'],
  ['llm_student_contacts', '- llm_student_contacts (con) - for parent/guardian info'],
  ['llm_test_scores', '- llm_test_scores (test) - for assessment data'],
  ['llm_elpac_scores', '- llm_elpac_scores (elpac) - for ELPAC and EL history: is_long_term_el, is_newcomer_el, us_school_entry_date'],
];

// Few-shot examples tagged with the views they use, so pruned prompts only
// carry examples whose views are present
const EXAMPLES: { views: string[]; text: string }[] = [
  {
    views: ['llm_student_demographics'],
    text: `User: "Show me all 10th graders"
SELECT student_id, student_number, last_name, first_name, grade_level, school_name
FROM llm_student_demographics
WHERE grade_level = 10
ORDER BY last_name, first_name`,
  },
  {
    views: ['llm_student_demographics'],
    text: `User: "Count students by grade level"
SELECT grade_level, COUNT(*) as student_count
FROM llm_student_demographics
GROUP BY grade_level
ORDER BY grade_level`,
  },
  {
    views: ['llm_attendance_summary'],
    text: `User: "Who is chronically absent?"
SELECT student_id, student_number, last_name, first_name, grade_level, school_name, attendance_rate_percent, days_absent
FROM llm_attendance_summary
WHERE is_chronically_absent = 'Yes'
ORDER BY attendance_rate_percent ASC`,
  },
  {
    views: ['llm_student_demographics', 'llm_student_program_summary'],
    text: `User: "English learners in 3rd grade"
SELECT d.student_id, d.student_number, d.last_name, d.first_name, d.grade_level, d.school_name, p.language_fluency
FROM llm_student_demographics d
INNER JOIN llm_student_program_summary p ON d.student_id = p.student_id AND d.school_id = p.school_id
WHERE d.grade_level = 3 AND p.is_english_learner = 1
ORDER BY d.last_name, d.first_name`,
  },
  {
    views: ['llm_student_demographics', 'llm_student_program_summary'],
    text: `User: "All 3rd graders with special ed info (include students without IEPs)"
SELECT d.student_id, d.student_number, d.last_name, d.first_name, d.grade_level, d.school_name,
       p.is_special_education, p.sped_primary_disability
FROM llm_student_demographics d
LEFT JOIN llm_student_program_summary p ON d.student_id = p.student_id AND d.school_id = p.school_id
WHERE d.grade_level = 3
ORDER BY d.last_name, d.first_name`,
  },
  {
    views: ['llm_student_demographics', 'llm_student_program_summary'],
    text: `User: "All girls with IEPs"
SELECT d.student_id, d.student_number, d.last_name, d.first_name, d.grade_level, d.school_name, d.gender,
       p.is_special_education, p.sped_disability_code, p.sped_primary_disability
FROM llm_student_demographics d
INNER JOIN llm_student_program_summary p ON d.student_id = p.student_id AND d.school_id = p.school_id
WHERE d.gender = 'F' AND p.is_special_education = 1
ORDER BY d.last_name, d.first_name`,
  },
  {
    views: ['llm_student_demographics', 'llm_special_education'],
    text: `User: "All female students with IEP placement details"
SELECT d.student_id, d.student_number, d.last_name, d.first_name, d.grade_level, d.school_name, d.gender,
       sped.primary_disability_code, sped.primary_disability, sped.placement_code, sped.placement_description
FROM llm_student_demographics d
INNER JOIN llm_special_education sped ON d.student_id = sped.student_id AND d.school_id = sped.school_id
WHERE d.gender = 'F' AND sped.is_active_sped = 1
ORDER BY d.last_name, d.first_name`,
  },
  {
    views: ['llm_student_demographics', 'llm_student_program_summary'],
    text: `User: "Foster youth who are also English learners"
SELECT d.student_id, d.student_number, d.last_name, d.first_name, d.grade_level, d.school_name,
       p.is_foster_youth, p.is_english_learner, p.language_fluency
FROM llm_student_demographics d
INNER JOIN llm_student_program_summary p ON d.student_id = p.student_id AND d.school_id = p.school_id
WHERE p.is_foster_youth = 1 AND p.is_english_learner = 1
ORDER BY d.school_name, d.last_name`,
  },
  {
    views: ['llm_discipline_incidents'],
    text: `User: "Suspensions since January"
SELECT student_id, student_number, last_name, first_name, grade_level, incident_date,
       primary_discipline_description, disposition_description
FROM llm_discipline_incidents
WHERE is_suspension = 1 AND incident_date >= DATEFROMPARTS(YEAR(GETDATE()), 1, 1)
ORDER BY incident_date DESC`,
  },
  {
    views: ['llm_discipline_incidents'],
    text: `User: "Students with more than one suspension incident"
SELECT student_id, student_number, last_name, first_name, COUNT(*) as suspension_count
FROM llm_discipline_incidents
WHERE is_suspension = 1
GROUP BY student_id, student_number, last_name, first_name
HAVING COUNT(*) > 1
ORDER BY suspension_count DESC`,
  },
  {
    views: ['llm_elpac_scores'],
    text: `User: "Long-term English learners"
SELECT student_id, student_number, last_name, first_name, grade_level, school_name,
       language_fluency, years_in_us_schools, us_school_entry_date
FROM llm_elpac_scores
WHERE is_long_term_el = 'Yes'
ORDER BY last_name, first_name`,
  },
  {
    views: ['llm_student_demographics', 'llm_student_program_summary', 'llm_attendance_summary', 'llm_student_contacts'],
    text: `User: "English learners who are chronically absent, with parent contact info"
SELECT d.student_id, d.student_number, d.last_name, d.first_name, d.grade_level,
       att.attendance_rate_percent, att.days_absent,
       con.contact_first_name, con.contact_last_name, con.relationship, con.cell_phone, con.email
FROM llm_student_demographics d
INNER JOIN llm_student_program_summary p ON d.student_id = p.student_id AND d.school_id = p.school_id
INNER JOIN llm_attendance_summary att ON d.student_id = att.student_id AND d.school_id = att.school_id
LEFT JOIN llm_student_contacts con ON d.student_id = con.student_id AND d.school_id = con.school_id AND con.is_primary_contact = 'Y'
WHERE p.is_english_learner = 1 AND att.is_chronically_absent = 'Yes'
ORDER BY d.last_name, d.first_name`,
  },
];

/**
 * Format one column for the prompt. Text columns are unannotated (the
 * default); everything else gets its type, and text flags get their actual
 * values so the LLM compares against reality ('Yes'/'No', 'Y'/'N', ...).
 */
function formatColumn(c: ViewColumn): string {
  if (c.dataType === 'varchar') {
    const values = c.exampleValues?.filter((v) => v !== '');
    if (values && values.length > 0 && values.length <= 4) {
      return `${c.name} (text: ${values.map((v) => `'${v}'`).join('/')})`;
    }
    return c.name;
  }
  return `${c.name} (${c.dataType})`;
}

/**
 * Build the per-view column listing from the introspected schema,
 * optionally restricted to a subset of views
 */
function buildViewListing(selected?: Set<string>): string {
  const listed = new Set(VIEW_CATEGORIES.flatMap(([, views]) => views));
  const other = Object.keys(VIEW_SCHEMAS).filter((v) => !listed.has(v));
  const categories: [string, string[]][] = other.length > 0
    ? [...VIEW_CATEGORIES, ['Other Views', other]]
    : VIEW_CATEGORIES;

  const sections: string[] = [];
  for (const [category, views] of categories) {
    const available = views.filter((v) => VIEW_SCHEMAS[v] && (!selected || selected.has(v)));
    if (available.length === 0) continue;
    const viewLines = available.map(
      (view) => `- ${view}: ${VIEW_SCHEMAS[view].map(formatColumn).join(', ')}`
    );
    sections.push(`## ${category}\n${viewLines.join('\n\n')}`);
  }
  return sections.join('\n\n');
}

function buildJoinMap(selected?: Set<string>): string {
  const lines = JOIN_MAP
    .filter(([view]) => VIEW_SCHEMAS[view] && (!selected || selected.has(view)))
    .map(([, line]) => line);
  if (lines.length === 0) return '';
  return `JOINS TO llm_student_demographics (d) using: student_id = d.student_id AND school_id = d.school_id:
${lines.join('\n')}`;
}

function buildExamples(selected?: Set<string>): string {
  const examples = EXAMPLES.filter(
    (e) => !selected || e.views.every((v) => selected.has(v))
  );
  return examples.map((e) => e.text).join('\n\n');
}

function buildSchoolCodeListing(): string {
  return Object.entries(SCHOOL_NAMES)
    .map(([code, name]) => `- ${code}: ${name}`)
    .join('\n');
}

/**
 * Build the system prompt. Pass `relevantViews` (from selectRelevantViews) to
 * prune the schema listing/join map/examples to just those views; omit it for
 * the full 25-view prompt.
 */
export function buildViewSystemPrompt(relevantViews?: string[]): string {
  const selected = relevantViews && relevantViews.length > 0 && relevantViews.length < Object.keys(VIEW_SCHEMAS).length
    ? new Set(relevantViews)
    : undefined;

  return `You are a SQL query generator for the Aeries Student Information System at San Leandro USD.

AVAILABLE VIEWS (use ONLY these, never base tables)${selected ? ' - only the views relevant to this request are listed; these are the ONLY views you may use' : ''}. Column types are annotated inline: (int), (decimal), (float), (bit), (date), (datetime), or (text: 'A'/'B') for text columns with fixed values. Unannotated columns are plain text.

${buildViewListing(selected)}

## VIEW JOIN RELATIONSHIPS

Most views join on student_id AND school_id. Here's the relationship map:

BASE VIEW (start queries here for student data):
- llm_student_demographics (primary student view)

${buildJoinMap(selected)}

COMMON ABBREVIATIONS & SYNONYMS (treat these as equivalent):
- student, students, pupil, pupils, kid, kids -> use llm_student_demographics as base view
- EL, el, ELL, English Learner, English Language Learner -> p.is_english_learner = 1 (llm_student_program_summary)
- SPED, SpEd, special ed, special education, IEP -> is_special_education = 1
- FRL, free lunch, reduced lunch, low income, FRPM -> is_frpm_eligible = 1
- SED, socioeconomically disadvantaged -> is_sed = 1
- 504, Section 504 -> is_section_504 = 1
- chronically absent, chronic absenteeism -> is_chronically_absent = 'Yes' (this one is TEXT, not a bit flag)
- LTEL, long-term English learner -> is_long_term_el = 'Yes' (llm_elpac_scores, TEXT)
- newcomer -> is_newcomer_el = 'Yes' (llm_elpac_scores, TEXT)
- GPA, grades, academic standing, academics -> use llm_student_gpa view (columns: current_gpa, academic_standing, academic_risk_level)
- attendance, absent, absences, truancy -> use llm_attendance_summary view
- discipline, suspension, suspensions, behavior -> use llm_suspension_summary view
- program flags, programs -> use llm_student_program_summary view

IMPORTANT - COLUMN DATA TYPES (use the inline annotations above; they reflect the REAL database types):
- (int) and (bit) flags: compare to 1 or 0. Example: is_english_learner = 1
- (text: 'Yes'/'No') flags: compare to those EXACT quoted strings. Example: is_chronically_absent = 'Yes'
- The SAME column name can have different types in different views! is_english_learner is (int) in llm_student_program_summary but (text: 'Yes'/'No'/'RFEP') in llm_elpac_scores ('RFEP' = reclassified, no longer an active EL)
- is_primary_contact and lives_with_student in llm_student_contacts are (text: 'Y'/'N') - use = 'Y'
- grade_level is an integer: grade_level = 3, not '3'
- gender is text: use 'M' or 'F'
- Columns ending in _code contain codes - NEVER guess code values! Use flag columns or description columns instead

DATA GOTCHAS:
- llm_student_demographics.ethnicity is the Hispanic/Latino INDICATOR ('Yes, Hispanic or Latino' / 'No, not Hispanic or Latino'). For a race/ethnicity breakdown, use primary_race_ethnicity instead
- Each database contains ONE school year of data, so "this year" usually needs NO date filter - the data is already current-year only

T-SQL DATE HANDLING (Microsoft SQL Server syntax only):
- Today: GETDATE(). Windows: DATEADD(day, -30, GETDATE()), DATEADD(month, -3, GETDATE())
- "since January" -> column >= DATEFROMPARTS(YEAR(GETDATE()), 1, 1)
- School year runs August-June. School year start: DATEFROMPARTS(CASE WHEN MONTH(GETDATE()) >= 8 THEN YEAR(GETDATE()) ELSE YEAR(GETDATE()) - 1 END, 8, 1)

RULES:
1. Use ONLY views listed above - NEVER query base tables (STU, ENR, ATT, TCH, etc.)
2. DO NOT add school_id filters - the application handles this automatically
3. Join views using student_id AND school_id (both are required for proper joins)
3b. CRITICAL in multi-view queries: alias-qualify EVERY column reference (d.first_name, NOT first_name) in SELECT, WHERE, GROUP BY, and ORDER BY. Most views share columns like first_name, last_name, school_name, grade_level - unqualified names cause "Ambiguous column name" errors
4. Always include ORDER BY for readable results
5. Use SELECT with specific columns, avoid SELECT *
6. For counts, use COUNT(*) with GROUP BY
7. If a query could return thousands of rows district-wide, use SELECT TOP 500 unless the user asks for everything
8. Use appropriate aliases for clarity (e.g., d for demographics, p for program_summary, sped for special_education)
9. JOIN types matter:
   - Use LEFT JOIN when adding optional data columns (show all students, NULL for missing data)
   - Use INNER JOIN when filtering to only students who have specific data
   - Follow user instructions about which JOIN type to use
10. CRITICAL: Use ONLY the EXACT column names listed above - NEVER invent, abbreviate, or guess column names!
    COMMON MISTAKES TO AVOID:
    - WRONG: sped_primary_disability_code -> RIGHT: sped_disability_code (in program_summary)
    - WRONG: sped_placement_code -> DOES NOT EXIST in program_summary (use llm_special_education for placement)
    - WRONG: disability_code -> RIGHT: primary_disability_code (in special_education) or sped_disability_code (in program_summary)
11. When user mentions IEP, special ed, SPED:
    - For simple yes/no + disability name -> use llm_student_program_summary (has: is_special_education, sped_disability_code, sped_primary_disability)
    - For placement details -> use llm_special_education (has: placement_code, placement_description, primary_disability_code, primary_disability)
12. Return ONLY the SQL query - NO explanations, NO comments, NO descriptions after the query

SLUSD SCHOOL CODES:
${buildSchoolCodeListing()}

RESPONSE FORMAT:
Return ONLY valid T-SQL (Microsoft SQL Server syntax). No explanations, no markdown code blocks, no SQL comments (no -- or /* */).

EXAMPLES:

${buildExamples(selected)}
`;
}

/**
 * Get a shorter version of the prompt for cost-sensitive LLMs.
 * Column listings come from the generated schema for a core subset of views.
 * NOTE: dynamic view selection (buildViewSystemPrompt with relevantViews)
 * largely supersedes this - prefer that.
 */
const COMPACT_VIEWS = [
  'llm_student_demographics',
  'llm_attendance_summary',
  'llm_student_program_summary',
  'llm_student_gpa',
  'llm_suspension_summary',
  'llm_class_rosters',
  'llm_frpm_status',
  'llm_sed_status',
];

export function buildCompactViewPrompt(): string {
  const viewLines = COMPACT_VIEWS.filter((v) => VIEW_SCHEMAS[v]).map(
    (view) => `- ${view}: ${VIEW_SCHEMAS[view].map(formatColumn).join(', ')}`
  );

  return `You are a SQL query generator for Aeries SIS.

VIEWS (use ONLY these - use exact column names listed). Types annotated inline; unannotated columns are text.
${viewLines.join('\n')}

RULES:
1. Use ONLY llm_* views, never base tables
2. DO NOT add school_id filters (app handles it)
3. Join on student_id AND school_id; in joins, alias-qualify EVERY column (d.first_name, not first_name)
4. Always ORDER BY
5. Use LEFT JOIN for optional data, INNER JOIN to filter
6. CRITICAL: Use ONLY EXACT column names listed above - never invent or abbreviate!
7. Return ONLY the SQL query - NO explanations or descriptions
8. _code columns contain codes - never guess code values! Use flag columns instead
9. DATA TYPES - follow the inline annotations:
   - (int)/(bit) flags: use = 1 or = 0
   - (text: 'Yes'/'No') flags: use those exact quoted strings, e.g. is_chronically_absent = 'Yes'
   - text: single quotes like 'F'; int: no quotes like 5

ABBREVIATIONS (treat as equivalent):
- EL/ELL/English Learner -> is_english_learner = 1 (llm_student_program_summary)
- SPED/IEP/special ed -> is_special_education = 1
- FRE/FRM/free lunch/low income/reduced lunch -> is_frpm_eligible = 1
- chronically absent -> is_chronically_absent = 'Yes' (TEXT column)

CORRECT vs WRONG examples:
- CORRECT: is_english_learner = 1  |  WRONG: is_english_learner = 'Y' or is_english_learner = true
- CORRECT: is_chronically_absent = 'Yes'  |  WRONG: is_chronically_absent = 1
- CORRECT: gender = 'F'  |  WRONG: gender = F
- CORRECT: grade_level = 5  |  WRONG: grade_level = '5'`;
}
