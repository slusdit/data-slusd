// AI SQL Query Builder Type Definitions

export interface Parameter {
  name: string;
  type: 'string' | 'number' | 'date' | 'array' | 'boolean';
  description: string;
  required: boolean;
  default?: string | number | boolean;
  validation?: string;
  options?: string[];
}

export interface Fragment {
  id: string;
  name: string;
  description: string;
  snippet: string;
  type: 'base' | 'join' | 'filter' | 'column' | 'aggregation' | 'order';
  category: string;
  subcategory: string;
  tags: string[];
  tables: string[];
  dependencies: string[];
  conflicts: string[];
  parameters: Parameter[];
  outputColumns?: string[];
  requiresAuth?: string[];
}

export interface FragmentLibrary {
  version: string;
  lastUpdated: string;
  fragments: {
    [category: string]: {
      [subcategory: string]: Fragment[];
    };
  };
  _index?: Map<string, Fragment>;
}

export interface FilterIntent {
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less' | 'between' | 'in' | 'not_null' | 'is_null';
  value: string | number | string[];
  fragmentId?: string;
}

export interface SortIntent {
  field: string;
  direction: 'asc' | 'desc';
}

export interface Clarification {
  type: 'ambiguous_entity' | 'missing_parameter' | 'multiple_matches' | 'unknown_term';
  message: string;
  options?: string[];
  context: string;
}

export interface AIInterpretation {
  interpretation: {
    primaryEntity: string;
    entities: string[];
    filters: FilterIntent[];
    dataPoints: string[];
    aggregations?: string[];
    sorting?: SortIntent;
    limit?: number;
  };
  fragments: {
    base: string;
    joins: string[];
    filters: string[];
    columns: string[];
    aggregations: string[];
    ordering: string[];
  };
  parameters: {
    [paramName: string]: string | number | boolean | string[];
  };
  confidence: number;
  clarifications: Clarification[];
  warnings: string[];
}

export interface CompositionError {
  code: string;
  message: string;
  fragmentId?: string;
  suggestion?: string;
}

export interface QueryExplanation {
  summary: string;
  sections: {
    name: string;
    description: string;
    sql: string;
  }[];
}

export interface CompositionResult {
  success: boolean;
  query?: string;
  formattedQuery?: string;
  explanation?: QueryExplanation;
  errors?: CompositionError[];
  warnings?: string[];
  metadata: {
    fragmentsUsed: string[];
    tablesReferenced: string[];
    estimatedComplexity: 'simple' | 'moderate' | 'complex';
    parametersApplied: Record<string, unknown>;
  };
}

export interface GenerateRequest {
  prompt: string;
  context?: {
    schoolYear?: string;
    defaultSchool?: string;
    userRole?: string;
  };
  options?: {
    outputFormat: 'sql' | 'explained' | 'preview';
    includeRowCount: boolean;
    maxRows?: number;
  };
  clarificationResponses?: {
    [questionId: string]: string;
  };
}

export interface GenerateResponse {
  success: boolean;
  result?: CompositionResult;
  needsClarification?: boolean;
  clarifications?: Clarification[];
  partialInterpretation?: AIInterpretation;
  error?: string;
  errorCode?: string;
}
