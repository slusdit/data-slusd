// Query Composer - Assembles SQL from fragment pieces
import {
  Fragment,
  FragmentLibrary,
  AIInterpretation,
  CompositionResult,
  CompositionError,
  QueryExplanation,
} from './types/query-builder';

export class QueryComposer {
  private library: FragmentLibrary;
  private index: Map<string, Fragment>;

  constructor(library: FragmentLibrary) {
    this.library = library;
    this.index = this.buildIndex(library);
  }

  private buildIndex(library: FragmentLibrary): Map<string, Fragment> {
    const index = new Map<string, Fragment>();
    for (const category of Object.values(library.fragments)) {
      for (const subcategory of Object.values(category)) {
        for (const fragment of subcategory as Fragment[]) {
          index.set(fragment.id, fragment);
        }
      }
    }
    console.log(`[QueryComposer] Built index with ${index.size} fragments`);
    return index;
  }

  public getFragment(id: string): Fragment | undefined {
    return this.index.get(id);
  }

  public compose(interpretation: AIInterpretation): CompositionResult {
    const errors: CompositionError[] = [];
    const warnings: string[] = [];
    const fragmentsUsed: string[] = [];

    // 1. Get base query
    const baseFragment = this.index.get(interpretation.fragments.base);
    if (!baseFragment) {
      // Try fallback to students_base
      const fallback = this.index.get('students_base');
      if (!fallback) {
        return {
          success: false,
          errors: [{ code: 'MISSING_BASE', message: `Base fragment not found: ${interpretation.fragments.base}` }],
          metadata: { fragmentsUsed: [], tablesReferenced: [], estimatedComplexity: 'simple', parametersApplied: {} }
        };
      }
      warnings.push(`Unknown base "${interpretation.fragments.base}" - using students_base`);
      interpretation.fragments.base = 'students_base';
    }
    fragmentsUsed.push(interpretation.fragments.base);

    // 2. Filter out invalid fragment IDs before collecting
    const filterValidIds = (ids: string[]): string[] => {
      const valid: string[] = [];
      for (const id of ids) {
        if (this.index.has(id)) {
          valid.push(id);
        } else {
          warnings.push(`Ignoring unknown fragment: ${id}`);
        }
      }
      return valid;
    };

    // 3. Collect all fragment IDs (only valid ones)
    const allFragmentIds = [
      interpretation.fragments.base,
      ...filterValidIds(interpretation.fragments.joins),
      ...filterValidIds(interpretation.fragments.filters),
      ...filterValidIds(interpretation.fragments.columns),
      ...filterValidIds(interpretation.fragments.aggregations),
      ...filterValidIds(interpretation.fragments.ordering)
    ].filter(Boolean);

    const allFragments = allFragmentIds
      .map(id => this.index.get(id))
      .filter((f): f is Fragment => f !== undefined);

    // 3. Check for conflicts
    for (const fragment of allFragments) {
      for (const conflictId of fragment.conflicts || []) {
        if (allFragmentIds.includes(conflictId)) {
          errors.push({
            code: 'CONFLICT',
            message: `Fragment "${fragment.id}" conflicts with "${conflictId}"`,
            fragmentId: fragment.id,
            suggestion: `Remove one of these fragments`
          });
        }
      }
    }

    if (errors.length > 0) {
      return { success: false, errors, metadata: { fragmentsUsed, tablesReferenced: [], estimatedComplexity: 'simple', parametersApplied: {} } };
    }

    // 4. Resolve dependencies
    const resolvedFragments = this.resolveDependencies(allFragments, errors);
    if (errors.length > 0) {
      return { success: false, errors, metadata: { fragmentsUsed, tablesReferenced: [], estimatedComplexity: 'simple', parametersApplied: {} } };
    }

    // 5. Build the query
    const query = this.assembleQuery(resolvedFragments, interpretation.parameters);

    // 6. Collect metadata
    const tablesReferenced = [...new Set(resolvedFragments.flatMap(f => f.tables || []))];
    const complexity = this.estimateComplexity(resolvedFragments);

    return {
      success: true,
      query: query,
      formattedQuery: this.formatQuery(query),
      explanation: this.generateExplanation(resolvedFragments, interpretation),
      warnings,
      metadata: {
        fragmentsUsed: resolvedFragments.map(f => f.id),
        tablesReferenced,
        estimatedComplexity: complexity,
        parametersApplied: interpretation.parameters
      }
    };
  }

  private resolveDependencies(fragments: Fragment[], errors: CompositionError[]): Fragment[] {
    const resolved = new Set<string>();
    const result: Fragment[] = [];

    const resolve = (fragment: Fragment) => {
      if (resolved.has(fragment.id)) return;

      // Resolve dependencies first
      for (const depId of fragment.dependencies || []) {
        // Skip base dependencies - they're already included
        if (depId === 'students_base' || depId === 'staff_base') {
          continue;
        }

        const dep = this.index.get(depId);
        if (!dep) {
          errors.push({
            code: 'MISSING_DEPENDENCY',
            message: `Fragment "${fragment.id}" requires "${depId}" which was not found`,
            fragmentId: fragment.id
          });
          continue;
        }
        // Recursively resolve the dependency (which will add it to result)
        resolve(dep);
      }

      resolved.add(fragment.id);
      result.push(fragment);
    };

    for (const fragment of fragments) {
      resolve(fragment);
    }

    return result;
  }

  private assembleQuery(fragments: Fragment[], parameters: Record<string, unknown>): string {
    // Group by type
    const byType = {
      base: fragments.filter(f => f.type === 'base'),
      column: fragments.filter(f => f.type === 'column'),
      join: fragments.filter(f => f.type === 'join'),
      filter: fragments.filter(f => f.type === 'filter'),
      aggregation: fragments.filter(f => f.type === 'aggregation'),
      order: fragments.filter(f => f.type === 'order')
    };

    // Start with base query
    const baseQuery = byType.base[0]?.snippet || '';

    // Parse the base query parts
    const selectMatch = baseQuery.match(/SELECT\s+([\s\S]*?)\s+FROM/i);
    const fromMatch = baseQuery.match(/FROM\s+([\s\S]*?)(?:\s+WHERE|\s+ORDER|\s+GROUP|\s*$)/i);
    const whereMatch = baseQuery.match(/WHERE\s+([\s\S]*?)(?:\s+ORDER|\s+GROUP|\s*$)/i);

    let selectClause = selectMatch ? selectMatch[1].trim() : '*';
    let fromClause = fromMatch ? fromMatch[1].trim() : '';
    const whereConditions: string[] = [];
    let groupByClause = '';
    let orderByClause = '';

    // Add base WHERE conditions if present
    if (whereMatch) {
      whereConditions.push(whereMatch[1].trim());
    }

    // Handle aggregations - if count is requested, modify SELECT
    const hasCountAgg = byType.aggregation.some(a => a.id.includes('count'));
    const hasGroupBy = byType.aggregation.some(a => a.snippet.toUpperCase().includes('GROUP BY'));

    if (hasCountAgg && !hasGroupBy) {
      // Simple count - replace SELECT with COUNT(*)
      selectClause = byType.aggregation.find(a => a.id === 'count_students')?.snippet || 'COUNT(*) as student_count';
    } else if (hasCountAgg && hasGroupBy) {
      // Group by count - add count to select and group by
      const groupByFrag = byType.aggregation.find(a => a.snippet.toUpperCase().includes('GROUP BY'));
      if (groupByFrag) {
        // Extract the field being grouped
        const groupByMatch = groupByFrag.snippet.match(/GROUP BY\s+(\S+)/i);
        if (groupByMatch) {
          const groupField = groupByMatch[1].replace(',', '');
          selectClause = `${groupField}, COUNT(*) as student_count`;
          groupByClause = groupByFrag.snippet;
        }
      }
    } else {
      // Add column fragments to SELECT
      for (const col of byType.column) {
        selectClause += ', ' + col.snippet;
      }
    }

    // Add JOINs to FROM
    for (const join of byType.join) {
      fromClause += '\n' + join.snippet;
    }

    // Collect WHERE conditions from filters
    // Group school filters together to use IN() instead of multiple AND conditions
    const schoolFilters = byType.filter.filter(f =>
      f.id.startsWith('school_') && f.snippet.includes('s.SC =')
    );
    const otherFilters = byType.filter.filter(f =>
      !f.id.startsWith('school_') || !f.snippet.includes('s.SC =')
    );

    // If multiple school filters, combine into IN clause
    if (schoolFilters.length > 1) {
      const schoolCodes = schoolFilters.map(f => {
        const match = f.snippet.match(/s\.SC\s*=\s*(\d+)/);
        return match ? match[1] : null;
      }).filter(Boolean);

      if (schoolCodes.length > 0) {
        whereConditions.push(`s.SC IN (${schoolCodes.join(', ')})`);
      }
    } else if (schoolFilters.length === 1) {
      // Single school - convert to IN() for consistency
      const match = schoolFilters[0].snippet.match(/s\.SC\s*=\s*(\d+)/);
      if (match) {
        whereConditions.push(`s.SC IN (${match[1]})`);
      } else {
        whereConditions.push(schoolFilters[0].snippet);
      }
    }

    // Add non-school filters
    for (const filter of otherFilters) {
      whereConditions.push(filter.snippet);
    }

    // Handle ordering (only if not doing aggregation that overrides it)
    if (!hasGroupBy) {
      for (const ord of byType.order) {
        orderByClause = ord.snippet;
      }
    } else {
      // Use the ordering from the aggregation fragment if present
      const orderMatch = groupByClause.match(/ORDER BY[\s\S]*/i);
      if (orderMatch) {
        orderByClause = '';
      } else {
        for (const ord of byType.order) {
          orderByClause = ord.snippet;
        }
      }
    }

    // Reassemble query
    let finalQuery = `SELECT ${selectClause}\nFROM ${fromClause}`;

    if (whereConditions.length > 0) {
      finalQuery += `\nWHERE ${whereConditions.join('\n  AND ')}`;
    }

    if (groupByClause && !groupByClause.includes('ORDER BY')) {
      finalQuery += `\n${groupByClause}`;
    } else if (groupByClause) {
      // GROUP BY with ORDER BY built in
      finalQuery += `\n${groupByClause}`;
    }

    if (orderByClause && !groupByClause.includes('ORDER BY')) {
      finalQuery += `\n${orderByClause}`;
    }

    // Substitute parameters
    finalQuery = this.substituteParameters(finalQuery, parameters);

    return finalQuery;
  }

  private substituteParameters(query: string, parameters: Record<string, unknown>): string {
    let result = query;

    for (const [name, value] of Object.entries(parameters)) {
      const placeholder = new RegExp(`\\{\\{${name}\\}\\}`, 'g');

      let substitution: string;
      if (typeof value === 'string') {
        // Escape single quotes for SQL safety
        substitution = `'${value.replace(/'/g, "''")}'`;
      } else if (typeof value === 'number') {
        substitution = String(value);
      } else if (Array.isArray(value)) {
        substitution = `(${value.map(v => typeof v === 'string' ? `'${v.replace(/'/g, "''")}'` : v).join(', ')})`;
      } else if (typeof value === 'boolean') {
        substitution = value ? '1' : '0';
      } else {
        substitution = String(value);
      }

      result = result.replace(placeholder, substitution);
    }

    return result;
  }

  private formatQuery(query: string): string {
    // More readable SQL formatting
    return query
      .replace(/\n\s*/g, '\n')
      .replace(/,\s*/g, ',\n       ')
      .replace(/\n(FROM|WHERE|AND|OR|LEFT JOIN|RIGHT JOIN|INNER JOIN|GROUP BY|ORDER BY|HAVING)/gi,
        (match, keyword) => `\n${keyword.toUpperCase()}`)
      .trim();
  }

  private estimateComplexity(fragments: Fragment[]): 'simple' | 'moderate' | 'complex' {
    const joinCount = fragments.filter(f => f.type === 'join').length;
    const filterCount = fragments.filter(f => f.type === 'filter').length;
    const hasAggregation = fragments.some(f => f.type === 'aggregation');

    if (joinCount >= 3 || (joinCount >= 2 && hasAggregation)) return 'complex';
    if (joinCount >= 1 || filterCount >= 3 || hasAggregation) return 'moderate';
    return 'simple';
  }

  private generateExplanation(fragments: Fragment[], interpretation: AIInterpretation): QueryExplanation {
    const sections: QueryExplanation['sections'] = [];

    const base = fragments.find(f => f.type === 'base');
    if (base) {
      sections.push({
        name: 'Data Source',
        description: base.description,
        sql: base.snippet
      });
    }

    const joins = fragments.filter(f => f.type === 'join');
    if (joins.length > 0) {
      sections.push({
        name: 'Additional Data',
        description: `Joining ${joins.map(j => j.name).join(', ')}`,
        sql: joins.map(j => j.snippet).join('\n')
      });
    }

    const filters = fragments.filter(f => f.type === 'filter');
    if (filters.length > 0) {
      sections.push({
        name: 'Filters',
        description: `Filtering by: ${filters.map(f => f.name).join(', ')}`,
        sql: filters.map(f => f.snippet).join(' AND ')
      });
    }

    const aggregations = fragments.filter(f => f.type === 'aggregation');
    if (aggregations.length > 0) {
      sections.push({
        name: 'Grouping/Counting',
        description: aggregations.map(a => a.name).join(', '),
        sql: aggregations.map(a => a.snippet).join('\n')
      });
    }

    return {
      summary: `Query for ${interpretation.interpretation.primaryEntity} with ${filters.length} filter(s) and ${joins.length} join(s)`,
      sections
    };
  }
}
