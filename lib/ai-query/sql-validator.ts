/**
 * SQL Validator for View-Based AI Queries
 *
 * Provides security validation to ensure LLM-generated SQL:
 * 1. Only queries allowed llm_* views (whitelist)
 * 2. Does not contain dangerous operations (blocklist)
 * 3. Is a SELECT query only
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  referencedViews: string[];
}

// Allowed views (whitelist) - all llm_* views from the database
const ALLOWED_VIEWS = [
  // Student Information
  'llm_student_demographics',
  'llm_student_enrollment',
  'llm_student_program_summary',
  // Attendance
  'llm_attendance_daily',
  'llm_attendance_summary',
  // Special Programs & Special Education
  'llm_special_programs',
  'llm_special_education',
  // Grades & GPA
  'llm_student_grades',
  'llm_student_gpa',
  // Discipline
  'llm_discipline_incidents',
  'llm_suspension_summary',
  // Courses & Rosters
  'llm_course_enrollments',
  'llm_class_rosters',
  'llm_all_sections',
  // Staff
  'llm_staff_roster',
  'llm_teacher_courses',
  'llm_elementary_teachers',
  'llm_elementary_grades',
  'llm_teacher_student_roster',
  // Contacts & Demographics
  'llm_student_contacts',
  'llm_frpm_status',
  'llm_sed_status',
  // Testing
  'llm_test_scores',
  'llm_test_scores_current',
  'llm_elpac_scores',
];

// Blocked keywords (destructive/dangerous operations)
const BLOCKED_KEYWORDS = [
  // DDL operations
  'DROP',
  'DELETE',
  'INSERT',
  'UPDATE',
  'ALTER',
  'CREATE',
  'TRUNCATE',
  'MERGE',
  'REPLACE',
  // Stored procedures / dynamic SQL
  'EXEC',
  'EXECUTE',
  'xp_',
  'sp_',
  'OPENQUERY',
  'OPENROWSET',
  'OPENDATASOURCE',
  // SQL injection patterns
  '--',
  '/*',
  '*/',
  ';--',
  // UNION can be used for injection
  'UNION',
  // System tables
  'sys.',
  'INFORMATION_SCHEMA',
  // Dangerous functions
  'WAITFOR',
  'SHUTDOWN',
  'BACKUP',
  'RESTORE',
];

// Known Aeries base tables that should NOT be queried directly
const BLOCKED_TABLES = [
  'stu',
  'enr',
  'att',
  'tch',
  'mst',
  'sec',
  'crs',
  'cse',
  'fre',
  'dsc',
  'tst',
  'day',
  'loc',
  'cod',
  'grb',
  'grd',
  'pgu',
  'con',
  'std',
  'prg',
  'sse',
];

// Valid columns for each view - used to catch hallucinated column names
const VIEW_COLUMNS: Record<string, string[]> = {
  llm_student_demographics: [
    'student_id', 'state_student_id', 'student_number', 'school_id', 'last_name', 'first_name', 'middle_name',
    'school_name', 'grade_level', 'birth_date', 'age', 'gender', 'address', 'city', 'state', 'zip_code',
    'home_phone', 'parent_guardian_name', 'parent_email', 'student_email', 'home_language_code', 'home_language',
    'correspondence_language_code', 'correspondence_language', 'language_fluency_code', 'language_fluency',
    'english_learner_status', 'ethnicity_code', 'ethnicity', 'race_code_1', 'race_1', 'race_code_2', 'race_2',
    'race_code_3', 'race_3', 'race_code_4', 'race_4', 'race_code_5', 'race_5', 'primary_race_ethnicity',
    'birth_country_code', 'birth_city', 'birth_state', 'counselor_email', 'counselor_name', 'student_status_code',
    'student_status', 'special_program_status', 'entry_date', 'leave_date', 'interdistrict_transfer_code',
    'interdistrict_transfer_district', 'custom_field_u11', 'days_absent_ytd', 'days_enrolled_ytd',
    'days_present_ytd', 'attendance_rate_ytd'
  ],
  llm_student_enrollment: [
    'student_id', 'school_id', 'student_number', 'school_year', 'school_name', 'last_name', 'first_name',
    'entry_date', 'leave_date', 'enrollment_status', 'days_enrolled', 'grade_level_at_enrollment',
    'entry_reason_code', 'entry_reason', 'homeroom_teacher_number', 'homeroom_teacher_name',
    'homeroom_teacher_email', 'track', 'program', 'is_current_year'
  ],
  llm_student_program_summary: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name',
    'is_english_learner', 'language_fluency_code', 'language_fluency', 'is_special_education',
    'sped_disability_code', 'sped_primary_disability', 'is_foster_youth', 'is_homeless', 'is_migrant',
    'is_section_504', 'is_in_any_special_program'
  ],
  llm_attendance_daily: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name',
    'day_number', 'attendance_date', 'day_of_week', 'all_day_code', 'all_day_description', 'all_day_status',
    'all_day_counts_as_present', 'all_day_suspension_related', 'period_0_code', 'period_1_code', 'period_2_code',
    'period_3_code', 'period_4_code', 'period_5_code', 'period_6_code', 'period_absence_count',
    'overall_attendance_code', 'was_absent_all_day', 'is_suspension_absence'
  ],
  llm_attendance_summary: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name',
    'instructional_days', 'days_present', 'days_absent', 'suspension_days', 'unexcused_absences', 'tardies',
    'attendance_rate_percent', 'absence_rate_percent', 'is_chronically_absent', 'truancy_risk_level'
  ],
  llm_special_programs: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name',
    'program_code', 'program_description', 'program_category', 'program_start_date', 'program_end_date',
    'eligibility_start_date', 'eligibility_end_date', 'is_active', 'status'
  ],
  llm_special_education: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name',
    'sped_status', 'eligibility_date', 'exit_date', 'placement_code', 'placement_description',
    'primary_disability_code', 'primary_disability', 'last_assessment_date', 'assessment_date',
    'review_date', 'is_active_sped'
  ],
  llm_student_grades: [
    'student_id', 'school_id', 'student_number', 'section_number', 'course_number', 'period', 'last_name',
    'first_name', 'grade_level', 'school_name', 'course_name', 'course_description', 'department_name',
    'teacher_last_name', 'teacher_first_name', 'final_grade', 'credits_earned', 'mark_1', 'mark_2', 'mark_3',
    'mark_4', 'mark_5', 'mark_6', 'citizenship_1', 'citizenship_2', 'citizenship_3', 'citizenship_indicator',
    'grade_comments', 'is_failing', 'is_honor_grade', 'is_at_risk'
  ],
  llm_student_gpa: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name',
    'current_gpa', 'cumulative_credits', 'current_year_credits', 'failing_grade_count', 'at_risk_grade_count',
    'honor_grade_count', 'academic_standing', 'academic_risk_level'
  ],
  llm_discipline_incidents: [
    'student_id', 'sequence_number', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level',
    'incident_school_code', 'incident_school_name', 'incident_date', 'primary_discipline_code',
    'primary_discipline_description', 'secondary_code_1', 'secondary_description_1', 'secondary_code_2',
    'secondary_description_2', 'secondary_code_3', 'secondary_description_3', 'secondary_code_4',
    'secondary_description_4', 'incident_comment', 'disposition_code', 'disposition_description',
    'discipline_category', 'is_out_of_school_suspension', 'is_in_school_suspension', 'is_expulsion',
    'is_suspension', 'school_year_start'
  ],
  llm_suspension_summary: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name',
    'out_of_school_suspensions', 'in_school_suspensions', 'total_suspensions', 'expulsions',
    'most_recent_suspension_date', 'first_suspension_date', 'days_since_last_suspension', 'discipline_risk_level'
  ],
  llm_course_enrollments: [
    'student_id', 'school_id', 'student_number', 'section_number', 'last_name', 'first_name', 'grade_level',
    'school_name', 'course_number', 'course_name', 'course_description', 'department_code', 'department_name',
    'state_course_code', 'section_id', 'period', 'room_number', 'teacher_number', 'teacher_last_name',
    'teacher_first_name', 'teacher_email', 'schedule_mode', 'schedule_mode_description', 'enrollment_status',
    'credits', 'track', 'is_currently_enrolled'
  ],
  llm_class_rosters: [
    'school_id', 'section_number', 'school_name', 'course_number', 'course_name', 'course_description',
    'department_name', 'period', 'room_number', 'teacher_number', 'teacher_last_name', 'teacher_first_name',
    'teacher_email', 'student_id', 'student_number', 'student_last_name', 'student_first_name',
    'student_grade_level', 'student_email', 'enrollment_status', 'current_class_size'
  ],
  llm_all_sections: [
    'section_id', 'school_id', 'school_name', 'term', 'period', 'course_id', 'course_name', 'teacher_staff_id',
    'teacher_number', 'teacher_last_name', 'teacher_first_name', 'teacher_email', 'room_number', 'grade_high',
    'grade_low', 'school_level', 'student_count'
  ],
  llm_staff_roster: [
    'staff_id', 'teacher_number', 'school_id', 'school_name', 'last_name', 'first_name', 'middle_name', 'email',
    'room_number', 'low_grade', 'high_grade', 'grade_range', 'custom_field_1', 'custom_field_2', 'teacher_status',
    'school_level', 'sections_taught', 'total_students'
  ],
  llm_teacher_courses: [
    'staff_id', 'teacher_number', 'school_id', 'teacher_last_name', 'teacher_first_name', 'teacher_email',
    'teacher_room', 'school_name', 'section_number', 'period', 'section_room', 'course_number', 'course_name',
    'course_description', 'department_code', 'department_name', 'schedule_mode', 'schedule_mode_description',
    'current_enrollment', 'credits', 'state_course_code'
  ],
  llm_elementary_teachers: [
    'staff_id', 'teacher_number', 'school_id', 'last_name', 'first_name', 'email', 'room_number', 'school_name',
    'low_grade', 'high_grade', 'grade_range', 'homeroom_student_count'
  ],
  llm_elementary_grades: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name',
    'homeroom_teacher_number', 'teacher_last_name', 'teacher_first_name', 'teacher_email', 'room_number',
    'teacher_grade_low', 'teacher_grade_high', 'teacher_grade_range', 'school_level', 'pseudo_section_id'
  ],
  llm_teacher_student_roster: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'teacher_staff_id',
    'teacher_number', 'teacher_last_name', 'teacher_first_name', 'teacher_email', 'assignment_type',
    'section_number', 'course_name', 'period', 'teacher_section_id'
  ],
  llm_student_contacts: [
    'student_id', 'school_id', 'student_number', 'student_last_name', 'student_first_name', 'grade_level',
    'school_name', 'contact_sequence', 'contact_first_name', 'contact_last_name', 'relationship_code',
    'relationship', 'email', 'home_phone', 'work_phone', 'cell_phone', 'address', 'city', 'state', 'zip_code',
    'is_primary_contact', 'lives_with_student', 'notification_priority', 'notification_priority_description',
    'education_level_code', 'education_level'
  ],
  llm_frpm_status: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name',
    'frpm_code', 'frpm_status', 'eligibility_code', 'eligibility_method', 'effective_start_date',
    'is_frpm_eligible', 'is_free', 'is_reduced'
  ],
  llm_sed_status: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name',
    'frpm_code', 'is_frpm_eligible', 'lowest_parent_education_level', 'has_low_parent_education',
    'direct_certification_flag', 'is_sed', 'sed_reason'
  ],
  llm_test_scores: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name',
    'test_code', 'test_description', 'test_date', 'test_year', 'test_type', 'test_category', 'performance_level',
    'scale_score', 'raw_score', 'elpac_level_description', 'caaspp_level_description', 'part_type',
    'part_description', 'grade_at_test', 'recency_rank'
  ],
  llm_test_scores_current: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name',
    'test_code', 'test_description', 'test_date', 'test_year', 'test_category', 'performance_level',
    'scale_score', 'raw_score', 'elpac_level_description', 'caaspp_level_description', 'part_type',
    'part_description', 'grade_at_test'
  ],
  llm_elpac_scores: [
    'student_id', 'school_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name',
    'language_fluency_code', 'language_fluency', 'is_english_learner', 'test_code', 'test_date', 'test_year',
    'performance_level', 'scale_score', 'elpac_level_description', 'is_newcomer_el', 'is_long_term_el',
    'us_school_entry_date', 'us_entry_date', 'birth_country', 'years_in_us_schools'
  ],
};

/**
 * Extract view aliases from SQL (e.g., "llm_student_demographics d" -> { d: 'llm_student_demographics' })
 */
function extractViewAliases(sql: string): Record<string, string> {
  const aliases: Record<string, string> = {};
  // Match: FROM/JOIN view_name alias or FROM/JOIN view_name AS alias
  const pattern = /(?:FROM|JOIN)\s+(llm_\w+)(?:\s+(?:AS\s+)?(\w+))?/gi;
  let match;

  while ((match = pattern.exec(sql)) !== null) {
    const viewName = match[1].toLowerCase();
    const alias = match[2]?.toLowerCase();

    if (alias && !['on', 'where', 'left', 'right', 'inner', 'outer', 'join', 'and', 'or'].includes(alias)) {
      aliases[alias] = viewName;
    }
    // Also map view name to itself for unaliased references
    aliases[viewName] = viewName;
  }

  return aliases;
}

/**
 * Extract column references from SQL and validate them against view schemas
 */
function validateColumns(sql: string, viewAliases: Record<string, string>): { errors: string[], warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Pattern to match alias.column_name references
  const columnPattern = /\b(\w+)\.(\w+)\b/g;
  let match;
  const checkedColumns = new Set<string>(); // Avoid duplicate errors

  while ((match = columnPattern.exec(sql)) !== null) {
    const alias = match[1].toLowerCase();
    const columnName = match[2].toLowerCase();
    const key = `${alias}.${columnName}`;

    if (checkedColumns.has(key)) continue;
    checkedColumns.add(key);

    // Skip if alias is not a known view alias
    const viewName = viewAliases[alias];
    if (!viewName) continue;

    // Skip common SQL keywords that might look like columns
    if (['null', 'true', 'false', 'asc', 'desc'].includes(columnName)) continue;

    // Check if the view has a defined schema
    const validColumns = VIEW_COLUMNS[viewName];
    if (!validColumns) {
      warnings.push(`Unknown view "${viewName}" - cannot validate columns`);
      continue;
    }

    // Check if column exists in the view
    if (!validColumns.includes(columnName)) {
      // Find similar column names to suggest
      const suggestions = validColumns.filter(c =>
        c.includes(columnName.replace('sped_', '').replace('primary_', '')) ||
        columnName.includes(c.replace('sped_', '').replace('primary_', ''))
      ).slice(0, 3);

      let errorMsg = `Invalid column "${alias}.${columnName}" - does not exist in ${viewName}`;
      if (suggestions.length > 0) {
        errorMsg += `. Did you mean: ${suggestions.join(', ')}?`;
      }
      errors.push(errorMsg);
    }
  }

  return { errors, warnings };
}

/**
 * Validate SQL query for security
 */
export function validateSql(sql: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const referencedViews: string[] = [];

  if (!sql || typeof sql !== 'string') {
    return {
      valid: false,
      errors: ['No SQL provided'],
      warnings: [],
      referencedViews: [],
    };
  }

  const sqlUpper = sql.toUpperCase();
  const sqlLower = sql.toLowerCase();

  // 1. Check for blocked keywords (case-insensitive)
  for (const keyword of BLOCKED_KEYWORDS) {
    // Use word boundary check for most keywords to avoid false positives
    // (e.g., "placement_description" should not match "DELETE")
    // Exception: patterns with special chars like '--', '/*', 'xp_' etc.
    const hasSpecialChars = /[^a-zA-Z]/.test(keyword);
    const pattern = hasSpecialChars
      ? new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      : new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');

    if (pattern.test(sql)) {
      errors.push(`Blocked keyword detected: ${keyword}`);
    }
  }

  // 2. Check if it's a SELECT query
  const trimmedSql = sql.trim();
  if (!trimmedSql.toUpperCase().startsWith('SELECT')) {
    errors.push('Only SELECT queries are allowed');
  }

  // 3. Extract all table/view references from FROM and JOIN clauses
  // Pattern matches: FROM tablename, JOIN tablename, FROM tablename AS alias, etc.
  const fromJoinPattern = /(?:FROM|JOIN)\s+(\w+)(?:\s+(?:AS\s+)?(\w+))?/gi;
  let match;
  const referencedTables: string[] = [];

  while ((match = fromJoinPattern.exec(sql)) !== null) {
    const tableName = match[1].toLowerCase();
    referencedTables.push(tableName);

    // Check if it's an allowed view
    if (ALLOWED_VIEWS.includes(tableName)) {
      referencedViews.push(tableName);
    } else if (BLOCKED_TABLES.includes(tableName)) {
      errors.push(
        `Direct access to base table "${tableName}" is not allowed. Use llm_* views instead.`
      );
    } else if (!tableName.startsWith('llm_')) {
      errors.push(
        `Invalid table/view: "${tableName}". Only llm_* views are allowed.`
      );
    } else {
      // It starts with llm_ but isn't in our whitelist
      warnings.push(
        `Unknown view "${tableName}" - it may not exist. Valid views start with llm_`
      );
    }
  }

  // 4. Check for suspicious patterns
  // Multiple statements (semicolon followed by another statement)
  if (/;\s*\w/.test(sql)) {
    errors.push('Multiple statements detected - only single SELECT queries are allowed');
  }

  // 5. Check for subqueries in FROM (could be used to query base tables)
  if (/FROM\s*\(/i.test(sql)) {
    warnings.push('Subquery in FROM clause detected - ensure only llm_* views are used');
  }

  // 6. Warn if no views were referenced (might be incomplete query)
  if (referencedViews.length === 0 && errors.length === 0) {
    warnings.push('No llm_* views detected in query');
  }

  // 7. Validate column names against view schemas
  const viewAliases = extractViewAliases(sql);
  const columnValidation = validateColumns(sql, viewAliases);
  errors.push(...columnValidation.errors);
  warnings.push(...columnValidation.warnings);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    referencedViews,
  };
}

/**
 * Quick check if SQL contains only SELECT
 */
export function isSelectOnly(sql: string): boolean {
  if (!sql) return false;
  const trimmed = sql.trim().toUpperCase();
  return trimmed.startsWith('SELECT') && !trimmed.includes(';');
}

/**
 * Extract view names from SQL
 */
export function extractViewNames(sql: string): string[] {
  const views: string[] = [];
  const pattern = /(?:FROM|JOIN)\s+(\w+)/gi;
  let match;

  while ((match = pattern.exec(sql)) !== null) {
    const name = match[1].toLowerCase();
    if (name.startsWith('llm_') && !views.includes(name)) {
      views.push(name);
    }
  }

  return views;
}
