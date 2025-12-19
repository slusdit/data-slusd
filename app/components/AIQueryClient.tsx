'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Copy, Play, Check, AlertCircle, ChevronDown, ChevronUp, Settings2, Database, Layers, Lock, Unlock, Wand2, Bug, RefreshCw } from 'lucide-react';
import { runQuery } from '@/lib/aeries';
import DataTableAgGrid from './DataTableAgGrid';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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
  canEditQueries?: boolean;
}

// Debug info for query attempts
interface QueryAttempt {
  attemptNumber: number;
  sql: string;
  rawResponse: string;
  validation: {
    valid: boolean;
    errors: string[];
    warnings: string[];
    referencedViews: string[];
  };
  correctionPrompt?: string;
}

interface DebugInfo {
  attempts: QueryAttempt[];
  totalAttempts: number;
}

// Query mode: 'fragment' uses existing system, 'view' uses new llm_* views
type QueryMode = 'fragment' | 'view';

// Data enhancement options - additional data to include via CTEs/JOINs
interface DataEnhancement {
  id: string;
  label: string;
  description: string;
  category: 'attendance' | 'academics' | 'programs' | 'demographics' | 'contacts';
}

const DATA_ENHANCEMENTS: DataEnhancement[] = [
  // Attendance
  { id: 'attendance_summary', label: 'Attendance Summary', description: 'Include attendance rate, chronic absence status', category: 'attendance' },
  { id: 'attendance_daily', label: 'Daily Attendance', description: 'Include individual attendance records', category: 'attendance' },
  // Academics
  { id: 'gpa', label: 'GPA & Academic Standing', description: 'Include current GPA, failing grades, honors', category: 'academics' },
  { id: 'grades', label: 'Course Grades', description: 'Include letter grades by course', category: 'academics' },
  { id: 'test_scores', label: 'Test Scores', description: 'Include SBAC, ELPAC, and other assessments', category: 'academics' },
  // Programs
  { id: 'program_flags', label: 'Program Flags', description: 'Include EL, SPED, foster, homeless flags', category: 'programs' },
  { id: 'special_ed', label: 'Special Education Details', description: 'Include IEP info, disability, placement', category: 'programs' },
  // Demographics
  { id: 'frpm', label: 'Free/Reduced Lunch', description: 'Include FRPM eligibility status', category: 'demographics' },
  { id: 'sed', label: 'Socioeconomically Disadvantaged', description: 'Include SED status and reason', category: 'demographics' },
  // Contacts
  { id: 'contacts', label: 'Parent/Guardian Contacts', description: 'Include parent email, phone, relationship', category: 'contacts' },
  // Discipline
  { id: 'discipline', label: 'Discipline Summary', description: 'Include suspensions, incidents', category: 'programs' },
];

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
  // View mode additions
  referencedViews: string[];
  warnings: string[];
  queryMode: QueryMode;
  // AI-suggested enhancements (from query analysis)
  suggestedEnhancements: string[];
  // Debug info for query attempts (only shown to editors)
  debugInfo: DebugInfo | null;
  attemptCount: number;
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
  canEditQueries = false,
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
    referencedViews: [],
    warnings: [],
    queryMode: 'view', // Default to view mode (simpler, more reliable)
    suggestedEnhancements: [],
    debugInfo: null,
    attemptCount: 0,
  });

  const [showDebugInfo, setShowDebugInfo] = useState(false);

  const [filtersOpen, setFiltersOpen] = useState(true);
  const [enhancementsOpen, setEnhancementsOpen] = useState(false);
  const [selectedEnhancements, setSelectedEnhancements] = useState<string[]>([]);
  const [lockedEnhancements, setLockedEnhancements] = useState(false); // When locked, AI suggestions won't auto-update selections
  const [filterByEnhancements, setFilterByEnhancements] = useState(false); // false = LEFT JOIN (all students), true = INNER JOIN (only matching)

  // Detect suggested enhancements from prompt keywords
  const detectSuggestedEnhancements = useCallback((prompt: string): string[] => {
    const lowerPrompt = prompt.toLowerCase();
    const suggestions: string[] = [];

    // Program-related keywords
    if (/\b(ieps|iep|special ed|sped|disability|individualized education)\b/.test(lowerPrompt)) {
      suggestions.push('special_ed');
      suggestions.push('program_flags');
    }
    if (/\b(504|504s|accommodation|plan)\b/.test(lowerPrompt)) {
      suggestions.push('program_flags');
    }
    if (/\b(english learner|english learners| el |ell|el student|elpac|lep|language)\b/.test(lowerPrompt)) {
      suggestions.push('program_flags');
    }
    if (/\b(foster|homeless|migrant|mckinney|unhoused)\b/.test(lowerPrompt)) {
      suggestions.push('program_flags');
    }

    // Attendance-related keywords
    if (/\b(absent|attendance|chronic|truant|tardy|missing school)\b/.test(lowerPrompt)) {
      suggestions.push('attendance_summary');
    }

    // Academic-related keywords
    if (/\b(gpa|grades?|failing|academic|credit|honor|at.?risk)\b/.test(lowerPrompt)) {
      suggestions.push('gpa');
    }
    if (/\b(test|score|sbac|caaspp|assessment|elpac)\b/.test(lowerPrompt)) {
      suggestions.push('test_scores');
    }

    // Discipline-related keywords
    if (/\b(suspend|suspension|discipline|expel|incident|behavior)\b/.test(lowerPrompt)) {
      suggestions.push('discipline');
    }

    // Demographics-related keywords
    if (/\b(lunch|frpm|free|reduced|low.?income|socioeconomic|sed)\b/.test(lowerPrompt)) {
      suggestions.push('frpm');
      suggestions.push('sed');
    }

    // Contact-related keywords
    if (/\b(parent|guardian|contact|phone|email|emergency)\b/.test(lowerPrompt)) {
      suggestions.push('contacts');
    }

    return [...new Set(suggestions)]; // Remove duplicates
  }, []);

  // Auto-detect and suggest enhancements when prompt changes (if not locked)
  useEffect(() => {
    if (state.queryMode !== 'view') return; // Only for view mode

    const detected = detectSuggestedEnhancements(state.prompt);

    // Update suggested enhancements in state
    setState(s => ({ ...s, suggestedEnhancements: detected }));

    // Auto-select detected enhancements if not locked
    if (!lockedEnhancements && detected.length > 0) {
      // Simply set to the detected enhancements when unlocked
      // User can manually add/remove after detection
      setSelectedEnhancements(detected);
      // Auto-open the enhancements panel if we detected something
      setEnhancementsOpen(true);
    }
  }, [state.prompt, state.queryMode, lockedEnhancements, detectSuggestedEnhancements]);

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

  // Toggle enhancement selection
  const toggleEnhancement = useCallback((id: string) => {
    setSelectedEnhancements(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  }, []);

  // Build enhanced prompt with data inclusion hints
  const buildEnhancedPrompt = useCallback((basePrompt: string, enhancements: string[], filterByData: boolean): string => {
    if (enhancements.length === 0) return basePrompt;

    const enhancementDescriptions = enhancements.map(id => {
      const enhancement = DATA_ENHANCEMENTS.find(e => e.id === id);
      return enhancement ? enhancement.label : id;
    });

    const joinType = filterByData
      ? 'Use INNER JOIN to filter to only students who have this data'
      : 'Use LEFT JOIN to include all students, with NULL for those without this data';

    return `${basePrompt}

(Include additional data: ${enhancementDescriptions.join(', ')}. ${joinType})`;
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
      referencedViews: [],
      warnings: [],
      debugInfo: null,
      attemptCount: 0,
    }));

    try {
      // Choose endpoint based on query mode
      const endpoint = state.queryMode === 'view'
        ? '/api/ai-query/view-generate'
        : '/api/ai-query/generate';

      // Build prompt with enhancements for view mode
      const enhancedPrompt = state.queryMode === 'view'
        ? buildEnhancedPrompt(state.prompt, selectedEnhancements, filterByEnhancements)
        : state.prompt;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: enhancedPrompt,
          execute: true, // Auto-execute for view mode
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details?.join(', ') || 'Failed to generate query');
      }

      if (state.queryMode === 'view') {
        // View mode response
        setState(s => ({
          ...s,
          isGenerating: false,
          generatedSql: data.sql,
          formattedSql: data.formattedSql,
          explanation: null, // View mode doesn't provide structured explanation
          parsedFilters: null,
          fragmentsUsed: [],
          referencedViews: data.metadata?.referencedViews || [],
          warnings: data.metadata?.warnings || [],
          results: data.data || null,
          debugInfo: data.debugInfo || null,
          attemptCount: data.metadata?.attemptCount || 1,
        }));
      } else {
        // Fragment mode response
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
          referencedViews: [],
          warnings: [],
        }));
      }

    } catch (error) {
      setState(s => ({
        ...s,
        isGenerating: false,
        error: error instanceof Error ? error.message : 'Generation failed',
      }));
    }
  }, [state.prompt, state.queryMode, categorizeFragments, selectedEnhancements, filterByEnhancements, buildEnhancedPrompt]);

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


  const placeholderTextEscaped = `Examples: Students with ... 
• Students with an IEP at Jefferson
• Students who are English Learners by grade level
• Students in 3rd grade at Madison who are foster youth
• Students who are Hispanic and homeless at each school
• Students who are female in middle school grades`
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
            <div className="flex items-center gap-2">
              {/* Query Mode Toggle */}
              <Select
                value={state.queryMode}
                onValueChange={(value: QueryMode) => setState(s => ({ ...s, queryMode: value }))}
              >
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5" />
                      View Mode
                    </div>
                  </SelectItem>
                  <SelectItem value="fragment">
                    <div className="flex items-center gap-1.5">
                      <Database className="h-3.5 w-3.5" />
                      Fragment Mode
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Badge variant={isDistrictWide ? "default" : "secondary"} className="text-xs">
                {isDistrictWide
                  ? `District-wide (${schoolOptions.length} schools)`
                  : schoolOptions.length === 1
                    ? schoolOptions[0]?.label
                    : 'Single School'}
              </Badge>
            </div>
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {state.queryMode === 'view'
              ? 'Uses optimized llm_* views for faster, more reliable queries'
              : 'Uses fragment-based SQL composition for complex queries'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* All/Filter toggle at top (View Mode Only) */}
          {state.queryMode === 'view' && (
            <div className="flex items-center justify-between p-2 rounded-lg border bg-muted/30">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">
                  {filterByEnhancements ? 'Filter to matching students only' : 'Include all students'}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${!filterByEnhancements ? 'font-medium' : 'text-muted-foreground'}`}>All</span>
                <Checkbox
                  checked={filterByEnhancements}
                  onCheckedChange={(checked) => setFilterByEnhancements(checked === true)}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={`text-xs ${filterByEnhancements ? 'font-medium' : 'text-muted-foreground'}`}>Filter</span>
              </div>
            </div>
          )}

          <div>
            <Textarea
              value={state.prompt}
              onChange={(e) => setState(s => ({ ...s, prompt: e.target.value }))}
              onKeyDown={handleKeyDown}
              placeholder={placeholderTextEscaped}
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

          {/* Data Enhancement Options (View Mode Only) */}
          {state.queryMode === 'view' && (
            <Collapsible open={enhancementsOpen} onOpenChange={setEnhancementsOpen}>
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1 justify-between">
                    <div className="flex items-center gap-2">
                      <Settings2 className="h-4 w-4" />
                      <span>Include Additional Data</span>
                      {selectedEnhancements.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {selectedEnhancements.length} selected
                        </Badge>
                      )}
                      {state.suggestedEnhancements.length > 0 && !lockedEnhancements && (
                        <Badge variant="outline" className="ml-1 text-yellow-600 border-yellow-400 bg-yellow-50">
                          <Wand2 className="h-3 w-3 mr-1" />
                          AI suggested
                        </Badge>
                      )}
                    </div>
                    {enhancementsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <Button
                  variant={lockedEnhancements ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLockedEnhancements(!lockedEnhancements)}
                  className="shrink-0"
                  title={lockedEnhancements ? "Unlock to let AI update selections based on prompt" : "Lock to prevent AI from changing selections"}
                >
                  {lockedEnhancements ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                </Button>
              </div>
              {lockedEnhancements && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Selections locked - AI won&apos;t auto-update based on prompt changes
                </p>
              )}
              <CollapsibleContent className="pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 border rounded-lg bg-muted/30">
                  {(['attendance', 'academics', 'programs', 'demographics', 'contacts'] as const).map(category => {
                    const categoryEnhancements = DATA_ENHANCEMENTS.filter(e => e.category === category);
                    if (categoryEnhancements.length === 0) return null;
                    return (
                      <div key={category} className="space-y-2">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {category}
                        </h4>
                        {categoryEnhancements.map(enhancement => {
                          const isAiSuggested = state.suggestedEnhancements.includes(enhancement.id);
                          const isSelected = selectedEnhancements.includes(enhancement.id);
                          return (
                            <div key={enhancement.id} className={`flex items-start gap-2 p-1.5 rounded ${isAiSuggested && isSelected ? 'bg-yellow-50 border border-yellow-200' : ''}`}>
                              <Checkbox
                                id={enhancement.id}
                                checked={isSelected}
                                onCheckedChange={() => toggleEnhancement(enhancement.id)}
                              />
                              <div className="grid gap-0.5 leading-none flex-1">
                                <Label htmlFor={enhancement.id} className="text-sm font-medium cursor-pointer flex items-center gap-1.5">
                                  {enhancement.label}
                                  {isAiSuggested && isSelected && (
                                    <span title="AI suggested based on your prompt">
                                      <Wand2 className="h-3 w-3 text-yellow-600" />
                                    </span>
                                  )}
                                </Label>
                                <p className="text-xs text-muted-foreground">{enhancement.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Error Display */}
          {state.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Query Metadata Card - Shows filters (fragment mode) or views (view mode) */}
      {state.generatedSql && (
        <Card>
          <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
            <CardHeader className="pb-3">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <CardTitle className="flex items-center gap-2 text-base">
                    {state.queryMode === 'view' ? (
                      <>
                        <Layers className="h-4 w-4" />
                        Views Used
                        {state.referencedViews.length > 0 && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            {state.referencedViews.length}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        Interpreted Filters
                        {hasFilters && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            {totalFilters}
                          </span>
                        )}
                      </>
                    )}
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    {filtersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </CollapsibleTrigger>
              <p className="text-sm text-muted-foreground">
                {state.queryMode === 'view'
                  ? 'Database views referenced in this query'
                  : 'These filters were detected from your query'}
              </p>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                {state.queryMode === 'view' ? (
                  <>
                    {/* View Mode: Show referenced views */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Referenced Views</label>
                      <div className="flex flex-wrap gap-2">
                        {state.referencedViews.length > 0 ? (
                          state.referencedViews.map(view => (
                            <Badge key={view} variant="secondary" className="font-mono text-xs">
                              {view}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground italic">No views detected</span>
                        )}
                      </div>
                    </div>
                    {/* Warnings */}
                    {state.warnings.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-amber-600">Warnings</label>
                        <div className="space-y-1">
                          {state.warnings.map((warning, i) => (
                            <p key={i} className="text-sm text-amber-600 flex items-center gap-2">
                              <AlertCircle className="h-3.5 w-3.5" />
                              {warning}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Fragment Mode: Show parsed filters */}
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
                  </>
                )}
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
              <div className="flex items-center gap-2">
                <span>Generated SQL</span>
                <Badge variant="outline" className="text-xs font-normal">
                  {state.queryMode === 'view' ? 'View Mode' : 'Fragment Mode'}
                </Badge>
              </div>
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
                  {state.results ? 'Re-run Query' : 'Run Query'}
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

            {/* Attempt count indicator (for editors) */}
            {canEditQueries && state.attemptCount > 1 && (
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <RefreshCw className="h-4 w-4" />
                  <span>Query succeeded after {state.attemptCount} attempts (validation errors were auto-corrected)</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Debug Info Card (only visible to query editors) */}
      {canEditQueries && state.debugInfo && state.debugInfo.attempts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-amber-500" />
                <span>Query Generation Debug Info</span>
                <Badge variant="outline" className="text-xs font-normal">
                  {state.debugInfo.totalAttempts} attempt{state.debugInfo.totalAttempts !== 1 ? 's' : ''}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDebugInfo(!showDebugInfo)}
              >
                {showDebugInfo ? (
                  <><ChevronUp className="h-4 w-4 mr-1" /> Hide</>
                ) : (
                  <><ChevronDown className="h-4 w-4 mr-1" /> Show</>
                )}
              </Button>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Shows all query generation attempts with validation results (visible only to query editors)
            </p>
          </CardHeader>
          {showDebugInfo && (
            <CardContent className="space-y-6">
              {state.debugInfo.attempts.map((attempt, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={attempt.validation.valid ? "default" : "destructive"}>
                      Attempt {attempt.attemptNumber}
                    </Badge>
                    {attempt.validation.valid ? (
                      <Badge variant="outline" className="text-green-600 border-green-400 bg-green-50">
                        <Check className="h-3 w-3 mr-1" /> Valid
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-red-600 border-red-400 bg-red-50">
                        <AlertCircle className="h-3 w-3 mr-1" /> Invalid
                      </Badge>
                    )}
                    {attempt.validation.referencedViews.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        Views: {attempt.validation.referencedViews.join(', ')}
                      </span>
                    )}
                  </div>

                  {/* Generated SQL for this attempt */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase">Generated SQL</label>
                    <pre className="bg-muted p-3 rounded-md overflow-x-auto text-xs font-mono whitespace-pre-wrap max-h-48">
                      {attempt.sql}
                    </pre>
                  </div>

                  {/* Validation errors */}
                  {attempt.validation.errors.length > 0 && (
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-red-600 uppercase">Validation Errors</label>
                      <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-md space-y-1">
                        {attempt.validation.errors.map((error, i) => (
                          <div key={i} className="text-xs text-red-600 flex items-start gap-2">
                            <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" />
                            <span>{error}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Validation warnings */}
                  {attempt.validation.warnings.length > 0 && (
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-600 uppercase">Warnings</label>
                      <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md space-y-1">
                        {attempt.validation.warnings.map((warning, i) => (
                          <div key={i} className="text-xs text-amber-600 flex items-start gap-2">
                            <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" />
                            <span>{warning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Correction prompt (for retry attempts) */}
                  {attempt.correctionPrompt && (
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-blue-600 uppercase">Correction Prompt Sent</label>
                      <pre className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-md overflow-x-auto text-xs font-mono whitespace-pre-wrap max-h-32 text-blue-800 dark:text-blue-200">
                        {attempt.correctionPrompt}
                      </pre>
                    </div>
                  )}

                  {/* Separator between attempts */}
                  {index < state.debugInfo!.attempts.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </CardContent>
          )}
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
