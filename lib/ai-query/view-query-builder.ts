/**
 * View Query Builder for AI Query System
 *
 * Handles:
 * 1. Injecting school_id security filters into LLM-generated SQL
 * 2. Injecting teacher roster filters for teacher users
 * 3. SQL validation via sql-validator
 */

import { validateSql, ValidationResult, extractViewNames } from './sql-validator';

export class ViewQueryBuilder {
  /**
   * Validate the SQL query
   */
  validate(sql: string): ValidationResult {
    return validateSql(sql);
  }

  /**
   * Inject school_id security filter into SQL
   *
   * @param sql - The SQL query to modify
   * @param schools - Array of school codes the user has access to
   * @returns Modified SQL with school filter
   */
  injectSecurityFilters(sql: string, schools: string[]): string {
    // If no schools specified, return as-is (admin/district-wide access)
    if (!schools || schools.length === 0) {
      return sql;
    }

    const schoolList = schools.join(', ');

    // Find the main view being queried (first FROM clause)
    const mainViewMatch = sql.match(/FROM\s+(\w+)/i);
    if (!mainViewMatch) {
      return sql;
    }

    const mainView = mainViewMatch[1];
    const alias = this.getViewAlias(sql, mainView);

    // Build the school filter
    const schoolFilter = `${alias}.school_id IN (${schoolList})`;

    // Determine where to inject the filter
    const hasWhere = /\bWHERE\b/i.test(sql);
    const hasGroupBy = /\bGROUP BY\b/i.test(sql);
    const hasOrderBy = /\bORDER BY\b/i.test(sql);
    const hasHaving = /\bHAVING\b/i.test(sql);

    if (hasWhere) {
      // Insert after WHERE keyword
      return sql.replace(/\bWHERE\b/i, `WHERE ${schoolFilter} AND`);
    } else if (hasGroupBy) {
      // Insert before GROUP BY
      return sql.replace(/\bGROUP BY\b/i, `WHERE ${schoolFilter}\nGROUP BY`);
    } else if (hasHaving) {
      // Insert before HAVING (shouldn't happen without GROUP BY, but just in case)
      return sql.replace(/\bHAVING\b/i, `WHERE ${schoolFilter}\nHAVING`);
    } else if (hasOrderBy) {
      // Insert before ORDER BY
      return sql.replace(/\bORDER BY\b/i, `WHERE ${schoolFilter}\nORDER BY`);
    } else {
      // Append at end
      return `${sql}\nWHERE ${schoolFilter}`;
    }
  }

  /**
   * Inject teacher roster filter for teacher users
   * This ensures teachers only see students on their roster
   *
   * @param sql - The SQL query to modify
   * @param teacherNumber - The teacher's TN (teacher number)
   * @returns Modified SQL with teacher roster join
   */
  injectTeacherFilter(sql: string, teacherNumber: number): string {
    // Find the main view and its alias
    const mainViewMatch = sql.match(/FROM\s+(\w+)/i);
    if (!mainViewMatch) {
      return sql;
    }

    const mainView = mainViewMatch[1];
    const alias = this.getViewAlias(sql, mainView);

    // Add JOIN with teacher roster view
    const rosterJoin = `JOIN llm_teacher_student_roster r ON ${alias}.student_id = r.student_id AND r.teacher_number = ${teacherNumber}`;

    // Find where to insert the JOIN (after FROM ... alias)
    const fromPattern = new RegExp(`(FROM\\s+${mainView}(?:\\s+(?:AS\\s+)?${alias})?)`, 'i');

    if (fromPattern.test(sql)) {
      return sql.replace(fromPattern, `$1\n${rosterJoin}`);
    }

    // Fallback: insert after FROM clause
    return sql.replace(/FROM\s+\w+/i, `$&\n${rosterJoin}`);
  }

  /**
   * Get the alias for a view in the query
   * e.g., "llm_student_demographics d" returns "d"
   * e.g., "llm_student_demographics AS demo" returns "demo"
   * e.g., "llm_student_demographics" (no alias) returns the view name
   */
  private getViewAlias(sql: string, viewName: string): string {
    // Pattern: viewName AS alias or viewName alias
    const aliasPattern = new RegExp(`${viewName}\\s+(?:AS\\s+)?(\\w+)`, 'i');
    const match = sql.match(aliasPattern);

    if (match && match[1]) {
      const potentialAlias = match[1].toUpperCase();
      // Make sure it's not a SQL keyword
      const keywords = ['WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'ORDER', 'GROUP', 'HAVING'];
      if (!keywords.includes(potentialAlias)) {
        return match[1];
      }
    }

    return viewName;
  }

  /**
   * Clean up LLM response - remove markdown code blocks, comments, and explanatory text
   */
  cleanLlmResponse(response: string): string {
    let sql = response.trim();

    // First, try to extract SQL from markdown code blocks (anywhere in the response)
    // This handles cases where LLM adds explanation before/after the code block
    const codeBlockMatch = sql.match(/```(?:sql)?\s*([\s\S]*?)```/i);
    if (codeBlockMatch && codeBlockMatch[1]) {
      sql = codeBlockMatch[1].trim();
    } else {
      // No code block found - try to extract just the SELECT statement
      // Handle case where LLM adds explanation text before/after raw SQL
      const selectMatch = sql.match(/(SELECT[\s\S]*?)(?:;?\s*\n\s*(?:###|This |The |Note:|Explanation:|Here|Make sure|You can|I |---)|$)/i);
      if (selectMatch && selectMatch[1]) {
        sql = selectMatch[1].trim();
      }
    }

    // Remove any leading/trailing whitespace
    sql = sql.trim();

    // Remove SQL single-line comments (-- comment)
    sql = sql.replace(/--.*$/gm, '').trim();

    // Remove SQL multi-line comments (/* comment */)
    sql = sql.replace(/\/\*[\s\S]*?\*\//g, '').trim();

    // Extract only the SQL query - stop at semicolon or explanatory text
    // Look for patterns that indicate end of SQL and start of explanation
    const explanationPatterns = [
      /;\s*\n\s*(?:This|The|Note|I |Here|You|It |###)/i,  // Semicolon followed by explanation
      /\n\s*(?:This query|This will|This SQL|The query|The above|Note:|Explanation:|###)/i,
    ];

    for (const pattern of explanationPatterns) {
      const match = sql.match(pattern);
      if (match && match.index !== undefined) {
        sql = sql.slice(0, match.index);
      }
    }

    // Remove any trailing semicolon (SQL Server doesn't require it)
    sql = sql.trim();
    if (sql.endsWith(';')) {
      sql = sql.slice(0, -1).trim();
    }

    // Clean up any double whitespace left from comment removal
    sql = sql.replace(/\n\s*\n/g, '\n').trim();

    return sql;
  }

  /**
   * Get the views referenced in a query
   */
  getReferencedViews(sql: string): string[] {
    return extractViewNames(sql);
  }

  /**
   * Format SQL for display (basic formatting)
   */
  formatSql(sql: string): string {
    return sql
      .replace(/\n\s*/g, '\n')
      .replace(/,\s*/g, ',\n       ')
      .replace(/\n(FROM|WHERE|AND|OR|LEFT JOIN|RIGHT JOIN|INNER JOIN|JOIN|GROUP BY|ORDER BY|HAVING)/gi,
        (match, keyword) => `\n${keyword.toUpperCase()}`)
      .trim();
  }
}

// Export singleton instance
export const viewQueryBuilder = new ViewQueryBuilder();
