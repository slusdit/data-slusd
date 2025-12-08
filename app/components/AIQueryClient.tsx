'use client';

import { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Copy, Play, Check, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { runQuery } from '@/lib/aeries';
import DataTableAgGrid from './DataTableAgGrid';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FilterOption {
  id: string;
  label: string;
  logo?: string;
  code?: string;
}

interface AIQueryClientProps {
  schoolOptions: FilterOption[];
  gradeOptions: FilterOption[];
  gradeGroupOptions: FilterOption[];
  genderOptions: FilterOption[];
  ethnicityOptions: FilterOption[];
  programOptions: FilterOption[];
  activeSchool?: string;
  isDistrictWide?: boolean;
}

interface ParsedFilters {
  schools: string[];
  grades: string[];
  gradeGroups: string[];
  gender: string[];
  ethnicity: string[];
  programs: string[];
}

interface AIQueryState {
  prompt: string;
  isGenerating: boolean;
  generatedSql: string | null;
  formattedSql: string | null;
  explanation: {
    summary: string;
    sections: { name: string; description: string; sql: string }[];
  } | null;
  error: string | null;
  isExecuting: boolean;
  results: Record<string, unknown>[] | null;
  copied: boolean;
  parsedFilters: ParsedFilters | null;
  fragmentsUsed: string[];
}

// Read-only filter display component
function FilterDisplay({
  label,
  items,
  selectedIds,
  allOptions
}: {
  label: string;
  items: FilterOption[];
  selectedIds: string[];
  allOptions: FilterOption[];
}) {
  const selectedItems = allOptions.filter(opt => selectedIds.includes(opt.id));

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <div className="min-h-[40px] p-2 rounded-md border bg-muted/30 flex flex-wrap gap-1 items-center">
        {selectedItems.length > 0 ? (
          selectedItems.map(item => (
            <Badge key={item.id} variant="secondary" className="flex items-center gap-1">
              {item.logo && (
                <img src={item.logo} alt="" className="h-4 w-4 rounded-sm object-contain" />
              )}
              {item.label}
            </Badge>
          ))
        ) : (
          <span className="text-sm text-muted-foreground italic">None detected</span>
        )}
      </div>
    </div>
  );
}

export function AIQueryClient({
  schoolOptions,
  gradeOptions,
  gradeGroupOptions,
  genderOptions,
  ethnicityOptions,
  programOptions,
  activeSchool,
  isDistrictWide,
}: AIQueryClientProps) {
  const [state, setState] = useState<AIQueryState>({
    prompt: '',
    isGenerating: false,
    generatedSql: null,
    formattedSql: null,
    explanation: null,
    error: null,
    isExecuting: false,
    results: null,
    copied: false,
    parsedFilters: null,
    fragmentsUsed: [],
  });

  const [filtersOpen, setFiltersOpen] = useState(true);

  // Parse fragment IDs into categorized filters
  const categorizeFragments = useCallback((fragmentIds: string[]): ParsedFilters => {
    const filters: ParsedFilters = {
      schools: [],
      grades: [],
      gradeGroups: [],
      gender: [],
      ethnicity: [],
      programs: [],
    };

    for (const id of fragmentIds) {
      if (id.startsWith('school_')) {
        filters.schools.push(id);
      } else if (id.startsWith('grade_')) {
        if (['grade_elementary', 'grade_middle', 'grade_high'].includes(id)) {
          filters.gradeGroups.push(id);
        } else {
          filters.grades.push(id);
        }
      } else if (id.startsWith('gender_')) {
        filters.gender.push(id);
      } else if (id.startsWith('ethnicity_')) {
        filters.ethnicity.push(id);
      } else if (id.startsWith('has_') || id.startsWith('is_')) {
        filters.programs.push(id);
      }
    }

    return filters;
  }, []);

  const generateQuery = useCallback(async () => {
    if (!state.prompt.trim()) return;

    setState(s => ({
      ...s,
      isGenerating: true,
      error: null,
      generatedSql: null,
      results: null,
      parsedFilters: null,
      fragmentsUsed: [],
    }));

    try {
      const response = await fetch('/api/ai-query/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: state.prompt }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate query');
      }

      // Extract fragments used from the response
      const fragmentsUsed = data.metadata?.fragmentsUsed || [];
      const parsedFilters = categorizeFragments(fragmentsUsed);

      setState(s => ({
        ...s,
        isGenerating: false,
        generatedSql: data.sql,
        formattedSql: data.formattedSql,
        explanation: data.explanation,
        parsedFilters,
        fragmentsUsed,
      }));

    } catch (error) {
      setState(s => ({
        ...s,
        isGenerating: false,
        error: error instanceof Error ? error.message : 'Generation failed',
      }));
    }
  }, [state.prompt, categorizeFragments]);

  const executeQuery = useCallback(async () => {
    if (!state.generatedSql) return;

    setState(s => ({ ...s, isExecuting: true, error: null }));

    try {
      const results = await runQuery(state.generatedSql);
      setState(s => ({
        ...s,
        isExecuting: false,
        results: results || [],
      }));
    } catch (error) {
      setState(s => ({
        ...s,
        isExecuting: false,
        error: error instanceof Error ? error.message : 'Query execution failed'
      }));
    }
  }, [state.generatedSql]);

  const copyToClipboard = useCallback(() => {
    if (state.generatedSql) {
      navigator.clipboard.writeText(state.generatedSql);
      setState(s => ({ ...s, copied: true }));
      setTimeout(() => setState(s => ({ ...s, copied: false })), 2000);
    }
  }, [state.generatedSql]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      generateQuery();
    }
  }, [generateQuery]);

  const hasFilters = state.parsedFilters && (
    state.parsedFilters.schools.length > 0 ||
    state.parsedFilters.grades.length > 0 ||
    state.parsedFilters.gradeGroups.length > 0 ||
    state.parsedFilters.gender.length > 0 ||
    state.parsedFilters.ethnicity.length > 0 ||
    state.parsedFilters.programs.length > 0
  );

  const totalFilters = state.parsedFilters ? (
    state.parsedFilters.schools.length +
    state.parsedFilters.grades.length +
    state.parsedFilters.gradeGroups.length +
    state.parsedFilters.gender.length +
    state.parsedFilters.ethnicity.length +
    state.parsedFilters.programs.length
  ) : 0;

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              AI Query Builder
            </div>
            <Badge variant={isDistrictWide ? "default" : "secondary"} className="text-xs">
              {isDistrictWide
                ? `District-wide (${schoolOptions.length} schools)`
                : schoolOptions.length === 1
                  ? schoolOptions[0]?.label
                  : 'Single School'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Textarea
              value={state.prompt}
              onChange={(e) => setState(s => ({ ...s, prompt: e.target.value }))}
              onKeyDown={handleKeyDown}
              placeholder="Describe what data you need...

Examples:
• Give me all students at Jefferson with an IEP
• Count of ELL students by grade level at Bancroft
• Show me 3rd graders at Madison who are foster youth
• How many Hispanic students are homeless at each school?
• List all female students in middle school grades"
              className="min-h-[140px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl</kbd>+<kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> to generate
            </p>
          </div>

          <Button
            onClick={generateQuery}
            disabled={state.isGenerating || !state.prompt.trim()}
            className="w-full sm:w-auto"
          >
            {state.isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate SQL
              </>
            )}
          </Button>

          {/* Error Display */}
          {state.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Parsed Filters Card - Only show after query generation */}
      {state.generatedSql && (
        <Card>
          <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
            <CardHeader className="pb-3">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <CardTitle className="flex items-center gap-2 text-base">
                    Interpreted Filters
                    {hasFilters && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                        {totalFilters}
                      </span>
                    )}
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    {filtersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </CollapsibleTrigger>
              <p className="text-sm text-muted-foreground">
                These filters were detected from your query
              </p>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                {/* Row 1: Schools */}
                <FilterDisplay
                  label="Schools"
                  items={schoolOptions}
                  selectedIds={state.parsedFilters?.schools || []}
                  allOptions={schoolOptions}
                />

                {/* Row 2: Grades */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FilterDisplay
                    label="Grade Level"
                    items={gradeGroupOptions}
                    selectedIds={state.parsedFilters?.gradeGroups || []}
                    allOptions={gradeGroupOptions}
                  />
                  <FilterDisplay
                    label="Specific Grades"
                    items={gradeOptions}
                    selectedIds={state.parsedFilters?.grades || []}
                    allOptions={gradeOptions}
                  />
                </div>

                {/* Row 3: Demographics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FilterDisplay
                    label="Gender"
                    items={genderOptions}
                    selectedIds={state.parsedFilters?.gender || []}
                    allOptions={genderOptions}
                  />
                  <FilterDisplay
                    label="Ethnicity"
                    items={ethnicityOptions}
                    selectedIds={state.parsedFilters?.ethnicity || []}
                    allOptions={ethnicityOptions}
                  />
                </div>

                {/* Row 4: Programs */}
                <FilterDisplay
                  label="Programs"
                  items={programOptions}
                  selectedIds={state.parsedFilters?.programs || []}
                  allOptions={programOptions}
                />
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}

      {/* Generated SQL Display */}
      {state.generatedSql && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated SQL</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  {state.copied ? (
                    <Check className="h-4 w-4 mr-1 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1" />
                  )}
                  {state.copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button size="sm" onClick={executeQuery} disabled={state.isExecuting}>
                  {state.isExecuting ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4 mr-1" />
                  )}
                  Run Query
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">
              {state.formattedSql || state.generatedSql}
            </pre>

            {/* Explanation */}
            {state.explanation && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Query Explanation</h4>
                <p className="text-sm text-muted-foreground mb-3">{state.explanation.summary}</p>
                <div className="space-y-2">
                  {state.explanation.sections.map((section, i) => (
                    <div key={i} className="text-sm">
                      <span className="font-medium">{section.name}:</span>{' '}
                      <span className="text-muted-foreground">{section.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {state.results && (
        <Card>
          <CardHeader>
            <CardTitle>Results ({state.results.length} rows)</CardTitle>
          </CardHeader>
          <CardContent>
            {state.results.length > 0 ? (
              <div className="h-[500px]">
                <DataTableAgGrid
                  data={state.results}
                />
              </div>
            ) : (
              <p className="text-muted-foreground">No results found</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
