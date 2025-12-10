// Prompt Builder for AI SQL Query Builder
import { FragmentLibrary, AIInterpretation } from './types/query-builder';

// Extract all fragment IDs for validation
function extractAllFragmentIds(library: FragmentLibrary): string[] {
  const ids: string[] = [];
  for (const category of Object.values(library.fragments)) {
    for (const subcategory of Object.values(category)) {
      for (const fragment of subcategory as any[]) {
        ids.push(fragment.id);
      }
    }
  }
  return ids;
}

// Extract all base fragment IDs (type === 'base')
function extractBaseFragmentIds(library: FragmentLibrary): string[] {
  const baseIds: string[] = [];
  for (const category of Object.values(library.fragments)) {
    for (const subcategory of Object.values(category)) {
      for (const fragment of subcategory as any[]) {
        if (fragment.type === 'base') {
          baseIds.push(fragment.id);
        }
      }
    }
  }
  return baseIds;
}

// Generate base query descriptions for the prompt
function generateBaseQueryList(library: FragmentLibrary): string {
  const lines: string[] = [];
  for (const category of Object.values(library.fragments)) {
    for (const subcategory of Object.values(category)) {
      for (const fragment of subcategory as any[]) {
        if (fragment.type === 'base') {
          lines.push(`   - "${fragment.id}" - ${fragment.description}`);
        }
      }
    }
  }
  return lines.join('\n');
}

export function buildSystemPrompt(library: FragmentLibrary): string {
  const fragmentList = generateFragmentList(library);
  const validIds = extractAllFragmentIds(library);
  const baseQueryList = generateBaseQueryList(library);

  return `You are a SQL query builder for the Aeries Student Information System at San Leandro USD. You MUST ONLY use the fragment IDs listed below - NEVER invent or hallucinate fragment IDs.

## CRITICAL RULES - READ CAREFULLY

1. **ONLY use fragment IDs from the list below** - If a fragment ID is not in the list, DO NOT use it
2. **fragments.filters must be STRING IDs** like ["school_jefferson", "has_iep", "grade_4"] - NOT objects
3. Choose the correct base query from the available options:
${baseQueryList}
4. For transcript queries (grades, credits, course history), use "transcripts_base" with transcript_* filters
5. ONLY use base queries listed above - do NOT invent base queries like "sections_base", "teachers_data", "courses_base"

## VALID FRAGMENT IDs (ONLY use these exact strings)

${validIds.join(', ')}

## Response Format (JSON only, no markdown)

{
  "interpretation": {
    "primaryEntity": "students",
    "entities": ["students"],
    "filters": [{"field": "school", "operator": "equals", "value": "Jefferson"}],
    "dataPoints": ["all"],
    "aggregations": [],
    "sorting": null,
    "limit": null
  },
  "fragments": {
    "base": "students_base",
    "joins": [],
    "filters": ["school_jefferson", "has_iep"],
    "columns": [],
    "aggregations": [],
    "ordering": ["order_by_name"]
  },
  "parameters": {},
  "confidence": 0.95,
  "clarifications": [],
  "warnings": []
}

NOTE: fragments.filters is an array of STRINGS (fragment IDs), not filter objects!

## SLUSD School Codes

- 2: Garfield Elementary
- 3: Jefferson Elementary
- 4: Madison Elementary
- 5: McKinley Elementary
- 6: Monroe Elementary
- 7: Roosevelt Elementary
- 8: Washington Elementary
- 9: Halkin Elementary
- 11: Bancroft Middle School
- 12: Muir Middle School
- 15: Lincoln High School
- 16: San Leandro High School (SLHS)
- 60: SLVA Elementary (Virtual)
- 61: SLVA Middle (Virtual)
- 62: SLVA High (Virtual)

## Interpretation Guidelines

1. **School Names**: Map school names to their fragment IDs:
   - "Jefferson" → school_jefferson
   - "Bancroft" → school_bancroft
   - "San Leandro High" or "SLHS" → school_slhs
   - "Lincoln" → school_lincoln
   - etc.

2. **Program References**:
   - "IEP", "special ed", "SPED" → has_iep filter + iep_data join
   - "504", "504 plan" → has_504 filter + plan_504_data join
   - "ELL", "English learner", "EL" → is_ell filter
   - "GATE", "gifted" → is_gate filter
   - "homeless", "McKinney-Vento" → is_homeless filter
   - "foster" → is_foster filter
   - "free lunch", "reduced lunch", "FRL" → is_free_reduced_lunch filter

3. **Grade Levels**:
   - "elementary" → grade_elementary (TK-5)
   - "middle school" → grade_middle (6-8)
   - "high school" → grade_high (9-12)
   - "3rd grade", "third graders" → grade_3
   - "seniors" → grade_12
   - "freshmen" → grade_9

4. **Counting/Aggregation**:
   - "how many", "count", "total number" → count_students aggregation
   - "by grade" → count_by_grade aggregation
   - "by school" → count_by_school aggregation
   - "by ethnicity" → count_by_ethnicity aggregation

5. **Demographics**:
   - "male", "boys" → gender_male filter
   - "female", "girls" → gender_female filter
   - "Hispanic", "Latino" → ethnicity_hispanic filter
   - etc.

## Available Fragments

${fragmentList}

## Example Interpretations

Request: "all students at Jefferson with an IEP"
{
  "interpretation": {
    "primaryEntity": "students",
    "entities": ["students"],
    "filters": [{"field": "school", "operator": "equals", "value": "Jefferson"}, {"field": "iep", "operator": "equals", "value": true}],
    "dataPoints": ["all"],
    "aggregations": [],
    "sorting": null,
    "limit": null
  },
  "fragments": {
    "base": "students_base",
    "joins": ["iep_data"],
    "filters": ["school_jefferson", "has_iep"],
    "columns": [],
    "aggregations": [],
    "ordering": ["order_by_name"]
  },
  "parameters": {},
  "confidence": 0.95,
  "clarifications": [],
  "warnings": []
}

Request: "count of ELL students by grade level at Bancroft"
{
  "interpretation": {
    "primaryEntity": "students",
    "entities": ["students"],
    "filters": [{"field": "school", "operator": "equals", "value": "Bancroft"}, {"field": "ell", "operator": "equals", "value": true}],
    "dataPoints": ["count"],
    "aggregations": ["count", "group by grade"],
    "sorting": null,
    "limit": null
  },
  "fragments": {
    "base": "students_base",
    "joins": [],
    "filters": ["school_bancroft", "is_ell"],
    "columns": [],
    "aggregations": ["count_students", "count_by_grade"],
    "ordering": []
  },
  "parameters": {},
  "confidence": 0.92,
  "clarifications": [],
  "warnings": []
}`;
}

function generateFragmentList(library: FragmentLibrary): string {
  const lines: string[] = [];

  for (const [category, subcategories] of Object.entries(library.fragments)) {
    lines.push(`\n### ${formatCategoryName(category)}`);
    for (const [subcategory, fragments] of Object.entries(subcategories as Record<string, any[]>)) {
      for (const fragment of fragments) {
        lines.push(`- ${fragment.id}: ${fragment.description} (tags: ${fragment.tags.join(', ')})`);
      }
    }
  }

  return lines.join('\n');
}

function formatCategoryName(name: string): string {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Normalize filter array - LLM sometimes returns objects instead of strings
function normalizeFilters(filters: any[]): string[] {
  if (!Array.isArray(filters)) return [];

  return filters
    .map(f => {
      // If it's already a string, keep it
      if (typeof f === 'string') return f;
      // If it's an object with an id field, extract the id
      if (f && typeof f === 'object' && f.id) return f.id;
      // If it's an object with a fragmentId field, extract it
      if (f && typeof f === 'object' && f.fragmentId) return f.fragmentId;
      // Otherwise skip it
      return null;
    })
    .filter((f): f is string => f !== null);
}

export function parseInterpretation(content: string, library?: FragmentLibrary): AIInterpretation | null {
  try {
    // Handle markdown code blocks if present
    let jsonStr = content.trim();
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.slice(7);
    } else if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.slice(3);
    }
    if (jsonStr.endsWith('```')) {
      jsonStr = jsonStr.slice(0, -3);
    }

    // Try to extract JSON from LLM response that may have extra text
    // Look for the first { and last } to extract just the JSON object
    const firstBrace = jsonStr.indexOf('{');
    const lastBrace = jsonStr.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(jsonStr.trim());

    // Validate required fields
    if (!parsed.fragments?.base) {
      console.error('[parseInterpretation] Missing base fragment');
      return null;
    }

    // Get valid bases dynamically from library, or use fallback list
    const validBases = library
      ? extractBaseFragmentIds(library)
      : ['students_base', 'staff_base', 'transcripts_base', 'schedule_base', 'lac_base'];

    // Fallback: if LLM used an invalid base, try to fix it
    let base = parsed.fragments.base;
    if (!validBases.includes(base)) {
      console.warn(`[parseInterpretation] Invalid base "${base}", defaulting to students_base`);
      base = 'students_base';
    }

    // Normalize filters in case LLM returned objects instead of strings
    const filters = normalizeFilters(parsed.fragments.filters);

    // Ensure all arrays exist and contain only strings
    return {
      interpretation: parsed.interpretation || {},
      fragments: {
        base,
        joins: (parsed.fragments.joins || []).filter((j: any) => typeof j === 'string'),
        filters,
        columns: (parsed.fragments.columns || []).filter((c: any) => typeof c === 'string'),
        aggregations: (parsed.fragments.aggregations || []).filter((a: any) => typeof a === 'string'),
        ordering: (parsed.fragments.ordering || []).filter((o: any) => typeof o === 'string'),
      },
      parameters: parsed.parameters || {},
      confidence: parsed.confidence || 0.5,
      clarifications: parsed.clarifications || [],
      warnings: parsed.warnings || [],
    };
  } catch (error) {
    console.error('[parseInterpretation] Failed to parse LLM response:', error);
    console.error('[parseInterpretation] Raw content:', content);
    return null;
  }
}
