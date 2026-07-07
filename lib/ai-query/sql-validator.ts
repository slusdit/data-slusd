/**
 * SQL Validator for View-Based AI Queries
 *
 * Provides security validation to ensure LLM-generated SQL:
 * 1. Only queries allowed llm_* views (whitelist)
 * 2. Does not contain dangerous operations (blocklist)
 * 3. Is a SELECT query only
 *
 * View/column/type knowledge comes from view-schema.generated.ts (introspected
 * from the live database - regenerate with `npm run generate:view-schema`).
 */

import { VIEW_SCHEMAS, ViewColumn } from './view-schema.generated';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  referencedViews: string[];
}

// Allowed views (whitelist) - derived from the introspected database schema
const ALLOWED_VIEWS = Object.keys(VIEW_SCHEMAS);

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

// Flag-named columns whose comparisons get type-checked against the real
// database types. NOTE: these are NOT uniformly bit/int - several are varchar
// holding 'Yes'/'No' or 'Y'/'N' (e.g. is_chronically_absent), and
// llm_elpac_scores.is_english_learner even holds 'RFEP'. The generated schema
// carries the true type and sampled values per view.
const FLAG_COLUMN_NAME = /^(?:is_|has_)\w+$|^(?:lives_with_student|was_absent_all_day|all_day_counts_as_present|all_day_suspension_related)$/;

// Valid columns for each view - derived from the introspected database schema
const VIEW_COLUMNS: Record<string, string[]> = Object.fromEntries(
  Object.entries(VIEW_SCHEMAS).map(([view, cols]) => [view, cols.map((c) => c.name)])
);

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
 * Look up a column definition (type + sampled values) for a view
 */
function getColumnDef(view: string, column: string): ViewColumn | undefined {
  return VIEW_SCHEMAS[view]?.find((c) => c.name === column);
}

// Keywords/functions that look like identifiers in SQL text
const SQL_KEYWORDS = new Set([
  'select', 'from', 'where', 'and', 'or', 'not', 'in', 'like', 'between', 'is',
  'null', 'order', 'by', 'group', 'having', 'as', 'on', 'join', 'inner', 'left',
  'right', 'full', 'outer', 'cross', 'top', 'distinct', 'case', 'when', 'then',
  'else', 'end', 'asc', 'desc', 'exists', 'all', 'any', 'some', 'percent',
  'offset', 'fetch', 'next', 'rows', 'only', 'over', 'partition', 'true', 'false',
  'int', 'varchar', 'date', 'datetime', 'decimal', 'float', 'bit',
]);

/**
 * Validate UNQUALIFIED column references. Only judged when exactly one view is
 * referenced (no joins) - then every bare identifier that isn't a keyword,
 * function call, alias, or SELECT-list alias must be a real column of that view.
 * Catches hallucinated columns like "is_free_lunch_eligible" that the
 * alias.column check can't see.
 */
function validateUnqualifiedColumns(sql: string, viewAliases: Record<string, string>): { errors: string[], warnings: string[] } {
  const errors: string[] = [];
  const views = [...new Set(Object.values(viewAliases))];
  if (views.length !== 1) return { errors, warnings: [] };

  const view = views[0];
  const validColumns = VIEW_COLUMNS[view];
  if (!validColumns || validColumns.length === 0) return { errors, warnings: [] };
  const validSet = new Set(validColumns);

  // Strip string literals so their contents aren't treated as identifiers
  const stripped = sql.replace(/'[^']*'/g, "''");

  // SELECT-list aliases (COUNT(*) AS total) are legitimate references later on.
  // (Also matches CAST(x AS int) - harmless, 'int' is a keyword anyway.)
  const defined = new Set<string>();
  let aliasMatch;
  const asPattern = /\bAS\s+(\w+)/gi;
  while ((aliasMatch = asPattern.exec(stripped)) !== null) {
    defined.add(aliasMatch[1].toLowerCase());
  }

  const reported = new Set<string>();
  const idPattern = /\b([a-zA-Z_]\w*)\b/g;
  let match;
  while ((match = idPattern.exec(stripped)) !== null) {
    const word = match[1].toLowerCase();
    const before = stripped[match.index - 1];
    const after = stripped.slice(match.index + match[1].length).match(/^\s*(.)/)?.[1];

    if (before === '.' || after === '.') continue; // part of a qualified reference
    if (after === '(') continue; // function call
    if (SQL_KEYWORDS.has(word)) continue;
    if (viewAliases[word]) continue; // view name or alias
    if (defined.has(word)) continue; // SELECT-list alias
    if (validSet.has(word)) continue;
    if (reported.has(word)) continue;
    reported.add(word);

    let suggestions = validColumns.filter(c => c.includes(word) || word.includes(c)).slice(0, 3);
    if (suggestions.length === 0 && /^(?:is_|has_)/.test(word)) {
      suggestions = validColumns.filter(c => /^(?:is_|has_)/.test(c)).slice(0, 6);
    }
    let errorMsg = `Invalid column "${word}" - does not exist in ${view}`;
    if (suggestions.length > 0) {
      errorMsg += `. Did you mean: ${suggestions.join(', ')}?`;
    }
    errors.push(errorMsg);
  }

  return { errors, warnings: [] };
}

/**
 * Validate that flag-column comparisons match the column's REAL database type.
 * Numeric flags (int/bit) must compare to 1/0; text flags (varchar) must
 * compare to their actual string values ('Yes'/'No', 'Y'/'N', ...).
 */
function validateFlagComparisons(sql: string, viewAliases: Record<string, string>): { errors: string[], warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const referencedViews = [...new Set(Object.values(viewAliases))];

  // Match: (alias.)?column = value  where value is 'string' | number | true/false
  const cmpPattern = /\b(?:(\w+)\.)?(\w+)\s*(?:=|<>|!=)\s*('[^']*'|\d+(?:\.\d+)?|true\b|false\b)/gi;
  let match;
  const seen = new Set<string>();

  while ((match = cmpPattern.exec(sql)) !== null) {
    const alias = match[1]?.toLowerCase();
    const column = match[2].toLowerCase();
    const value = match[3];

    if (!FLAG_COLUMN_NAME.test(column)) continue;

    const key = `${alias ?? ''}.${column}=${value}`;
    if (seen.has(key)) continue;
    seen.add(key);

    // Resolve the column's definition: qualified -> that view; unqualified ->
    // every referenced view that has the column
    let defs: ViewColumn[] = [];
    if (alias) {
      const view = viewAliases[alias];
      const def = view ? getColumnDef(view, column) : undefined;
      if (def) defs = [def];
    } else {
      defs = referencedViews
        .map((v) => getColumnDef(v, column))
        .filter((d): d is ViewColumn => d !== undefined);
    }
    if (defs.length === 0) continue;

    const types = new Set(defs.map((d) => d.dataType));
    if (types.size > 1) continue; // same column name, different types across views - can't judge
    const type = defs[0].dataType;

    const isStringValue = value.startsWith("'");
    const isBoolLiteral = /^(?:true|false)$/i.test(value);

    if ((type === 'bit' || type === 'int') && (isStringValue || isBoolLiteral)) {
      errors.push(
        `Type mismatch: "${column}" is a numeric (${type}) flag - use = 1 or = 0, not ${value}`
      );
    } else if (type === 'varchar' && !isStringValue) {
      const examples = defs.find((d) => d.exampleValues?.length)?.exampleValues;
      const hint = examples
        ? ` Valid values: ${examples.map((v) => `'${v}'`).join(', ')}`
        : '';
      errors.push(
        `Type mismatch: "${column}" is a TEXT column, not a bit flag - compare to a quoted string, not ${value}.${hint}`
      );
    }
  }

  return { errors, warnings };
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
      let suggestions = validColumns.filter(c =>
        c.includes(columnName.replace('sped_', '').replace('primary_', '')) ||
        columnName.includes(c.replace('sped_', '').replace('primary_', ''))
      ).slice(0, 3);
      // Hallucinated flag names rarely substring-match the real one
      // (is_socioeconomically_disadvantaged vs is_sed) - offer the view's
      // actual flag columns instead
      if (suggestions.length === 0 && /^(?:is_|has_)/.test(columnName)) {
        suggestions = validColumns.filter(c => /^(?:is_|has_)/.test(c)).slice(0, 6);
      }

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
      // It starts with llm_ but doesn't exist in the database - hard error so
      // the repair loop gets the valid list instead of a wasted DB round trip
      errors.push(
        `View "${tableName}" does not exist. Use ONLY these views: ${ALLOWED_VIEWS.join(', ')}`
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

  // 7b. Validate unqualified columns (single-view queries only)
  const unqualifiedValidation = validateUnqualifiedColumns(sql, viewAliases);
  errors.push(...unqualifiedValidation.errors);

  // 8. Validate flag column comparisons against real database types
  const flagValidation = validateFlagComparisons(sql, viewAliases);
  errors.push(...flagValidation.errors);
  warnings.push(...flagValidation.warnings);

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
