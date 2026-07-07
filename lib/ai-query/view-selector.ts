/**
 * Dynamic view selection for the AI query prompt.
 *
 * Instead of documenting all 25 llm_* views (~530 columns) on every request,
 * pick the handful relevant to the question. Small local models recall column
 * placement far more reliably from 3-6 views than from 25, and the shorter
 * prompt also cuts CPU prefill time roughly in half.
 *
 * This is a prompt-level optimization only - the validator still accepts every
 * real view, so a query using an unlisted (but real) view still works.
 */

import { VIEW_SCHEMAS } from './view-schema.generated';

// Keyword -> relevant views. A prompt can match multiple rules; the union is used.
const SELECTION_RULES: [RegExp, string[]][] = [
  [/absen|attendance|chronic|truan|tard|missing school/i, ['llm_attendance_summary', 'llm_attendance_daily']],
  [/gpa|grade point|failing|academic|credit|honor|at.?risk|\bmarks?\b|report card|\bgrades\b/i, ['llm_student_gpa', 'llm_student_grades']],
  [/\btest|score|sbac|caaspp|assessment/i, ['llm_test_scores', 'llm_test_scores_current']],
  [/elpac|english learner|\bell?\b|\blep\b|newcomer|long.?term|rfep|fluency|language/i, ['llm_elpac_scores', 'llm_student_program_summary']],
  [/\biep|sped|special ed|disabilit|placement/i, ['llm_special_education', 'llm_student_program_summary']],
  [/\b504\b|foster|homeless|unhoused|migrant|mckinney|\bgate\b|title.?(1|i\b)|program/i, ['llm_student_program_summary', 'llm_special_programs']],
  [/lunch|frpm|\bfree\b|reduced|low.?income/i, ['llm_frpm_status', 'llm_sed_status']],
  [/\bsed\b|socioeconomic|disadvantaged/i, ['llm_sed_status']],
  [/suspen|disciplin|expul|expel|incident|behavior|referral/i, ['llm_discipline_incidents', 'llm_suspension_summary']],
  [/teacher|staff|instructor/i, ['llm_staff_roster', 'llm_teacher_courses', 'llm_all_sections', 'llm_teacher_student_roster']],
  [/roster|\bclass(es)?\b|section|course|period|schedule/i, ['llm_class_rosters', 'llm_course_enrollments', 'llm_all_sections', 'llm_teacher_courses']],
  [/elementary|homeroom/i, ['llm_elementary_teachers', 'llm_elementary_grades']],
  [/contact|parent|guardian|phone|email|emergency/i, ['llm_student_contacts']],
  [/enroll|entry date|withdraw|left school|exit date/i, ['llm_student_enrollment']],
];

// Demographic questions the base view alone answers - if the text matches one
// of these (or a selection rule), demographics-only is a confident selection
const DEMOGRAPHIC_TERMS = /student|demographic|ethnicit|race|gender|\bage\b|birth|address|grade level|counselor|kid|pupil/i;

/**
 * Pick the views relevant to a natural-language request.
 * Falls back to ALL views when the request matches nothing we recognize -
 * better a big haystack than a missing view.
 */
export function selectRelevantViews(text: string): string[] {
  const selected = new Set<string>(['llm_student_demographics']);

  for (const [pattern, views] of SELECTION_RULES) {
    if (pattern.test(text)) {
      views.forEach((v) => selected.add(v));
    }
  }

  // Nothing topical matched and it doesn't read like a plain demographics
  // question -> unknown territory, show everything
  if (selected.size === 1 && !DEMOGRAPHIC_TERMS.test(text)) {
    return Object.keys(VIEW_SCHEMAS);
  }

  return [...selected].filter((v) => VIEW_SCHEMAS[v]);
}
