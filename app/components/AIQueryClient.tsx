'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Loader2, Sparkles, Copy, Play, Check, AlertCircle, ChevronDown, ChevronUp,
  Bug, RefreshCw, Search, ShieldCheck, Database, X, History, Save, CircleDashed,
} from 'lucide-react';
import DataTableAgGrid from './DataTableAgGrid';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { saveAiQuery } from '@/lib/ai-query/save-ai-query';

interface FilterOption {
  id: string;
  label: string;
  logo?: string;
  code?: string;
}

interface AIQueryClientProps {
  schoolOptions: FilterOption[];
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
  executedSql?: string;
  executionError?: string;
  correctionPrompt?: string;
}

interface DebugInfo {
  attempts: QueryAttempt[];
  totalAttempts: number;
}

// One row in the live progress stepper
interface ProgressStep {
  key: string;
  label: string;
  detail?: string;
  status: 'active' | 'done' | 'failed';
  isRepair: boolean;
}

interface QueryResultState {
  sql: string;
  originalSql: string;
  formattedSql: string;
  data: Record<string, unknown>[] | null;
  rowCount: number;
  executeError: string | null;
  referencedViews: string[];
  warnings: string[];
  schoolScope: string;
  appliedSchools: string[];
  attemptCount: number;
  debugInfo: DebugInfo | null;
}

const RECENT_PROMPTS_KEY = 'ai-query-recent';
const RECENT_PROMPTS_MAX = 10;

function stageIcon(step: ProgressStep) {
  if (step.status === 'failed') return <AlertCircle className="h-4 w-4 text-amber-600" />;
  if (step.status === 'done') return <Check className="h-4 w-4 text-green-600" />;
  return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
}

export function AIQueryClient({
  schoolOptions,
  activeSchool,
  isDistrictWide,
  canEditQueries = false,
}: AIQueryClientProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [steps, setSteps] = useState<ProgressStep[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const [result, setResult] = useState<QueryResultState | null>(null);
  const [recentPrompts, setRecentPrompts] = useState<string[]>([]);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRerunning, setIsRerunning] = useState(false);

  // Save-as-Query dialog
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [saveDescription, setSaveDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  // Load recent prompts (client only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_PROMPTS_KEY);
      if (stored) setRecentPrompts(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  // Elapsed-seconds ticker while generating
  useEffect(() => {
    if (!isGenerating) return;
    const startedAt = Date.now();
    setElapsed(0);
    const interval = setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 1000);
    return () => clearInterval(interval);
  }, [isGenerating]);

  const rememberPrompt = useCallback((text: string) => {
    setRecentPrompts((prev) => {
      const next = [text, ...prev.filter((p) => p !== text)].slice(0, RECENT_PROMPTS_MAX);
      try { localStorage.setItem(RECENT_PROMPTS_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const handleProgressEvent = useCallback((event: { stage: string; attempt: number; message: string; detail?: string }) => {
    setSteps((prev) => {
      // Previous in-flight step completes when the next stage starts
      const settled = prev.map((s) => (s.status === 'active' ? { ...s, status: 'done' as const } : s));
      const failed = event.stage.endsWith('_failed');
      return [
        ...settled,
        {
          key: `${event.stage}-${event.attempt}-${prev.length}`,
          label: event.message,
          detail: event.detail,
          status: failed ? 'failed' : 'active',
          isRepair: event.attempt > 1 || failed,
        },
      ];
    });
  }, []);

  const finishSteps = useCallback((success: boolean) => {
    setSteps((prev) =>
      prev.map((s) => (s.status === 'active' ? { ...s, status: success ? 'done' : 'failed' } : s))
    );
  }, []);

  const applyResultPayload = useCallback((payload: any) => {
    if (!payload.success) {
      finishSteps(false);
      setError(payload.error || payload.details?.join(', ') || 'Failed to generate query');
      return;
    }
    finishSteps(!payload.executeError);
    setResult({
      sql: payload.sql,
      originalSql: payload.originalSql,
      formattedSql: payload.formattedSql,
      data: payload.data ?? null,
      rowCount: payload.rowCount ?? 0,
      executeError: payload.executeError ?? null,
      referencedViews: payload.metadata?.referencedViews ?? [],
      warnings: payload.metadata?.warnings ?? [],
      schoolScope: payload.metadata?.schoolScope ?? '',
      appliedSchools: payload.metadata?.appliedSchools ?? [],
      attemptCount: payload.metadata?.attemptCount ?? 1,
      debugInfo: payload.debugInfo ?? null,
    });
    if (payload.executeError) {
      setError(`Query generated but failed to execute: ${payload.executeError}`);
    }
  }, [finishSteps]);

  const generateQuery = useCallback(async (promptOverride?: string) => {
    const text = (promptOverride ?? prompt).trim();
    if (!text || isGenerating) return;
    if (promptOverride) setPrompt(promptOverride);

    setIsGenerating(true);
    setError(null);
    setCancelled(false);
    setResult(null);
    setSteps([]);
    setDetailsOpen(false);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/ai-query/view-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text, execute: true, stream: true }),
        signal: controller.signal,
      });

      // Auth/validation failures come back as plain JSON, not a stream
      const contentType = response.headers.get('content-type') ?? '';
      if (!response.ok || !contentType.includes('ndjson')) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || `Request failed (${response.status})`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex;
        while ((newlineIndex = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, newlineIndex).trim();
          buffer = buffer.slice(newlineIndex + 1);
          if (!line) continue;

          const event = JSON.parse(line);
          if (event.type === 'progress') {
            handleProgressEvent(event);
          } else if (event.type === 'result') {
            applyResultPayload(event.payload);
            rememberPrompt(text);
          } else if (event.type === 'error') {
            throw new Error(event.error);
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setCancelled(true);
        setSteps((prev) => prev.map((s) => (s.status === 'active' ? { ...s, status: 'failed' } : s)));
      } else {
        finishSteps(false);
        const message = err instanceof Error ? err.message : 'Query generation failed';
        setError(`${message}. Try rephrasing your question.`);
      }
    } finally {
      setIsGenerating(false);
      abortRef.current = null;
    }
  }, [prompt, isGenerating, handleProgressEvent, applyResultPayload, rememberPrompt, finishSteps]);

  const cancelGeneration = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  // Re-run the generated SQL through the validated/scoped execution API
  const rerunQuery = useCallback(async () => {
    if (!result?.sql) return;
    setIsRerunning(true);
    setError(null);
    try {
      const response = await fetch('/api/custom-query/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: result.sql }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Query execution failed');
      }
      setResult((r) => (r ? { ...r, data: data.data ?? [], rowCount: data.rowCount ?? 0, executeError: null } : r));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query execution failed');
    } finally {
      setIsRerunning(false);
    }
  }, [result?.sql]);

  const copyToClipboard = useCallback(() => {
    if (!result?.sql) return;
    navigator.clipboard.writeText(result.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result?.sql]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      generateQuery();
    }
  }, [generateQuery]);

  const handleSave = useCallback(async () => {
    if (!result?.originalSql) return;
    setIsSaving(true);
    try {
      const saved = await saveAiQuery({
        name: saveName,
        description: saveDescription,
        sql: result.originalSql,
      });
      if (saved.success) {
        toast.success(`Saved as "${saveName}"`);
        setSaveOpen(false);
        setSaveName('');
        setSaveDescription('');
      } else {
        toast.error(saved.error ?? 'Failed to save query');
      }
    } finally {
      setIsSaving(false);
    }
  }, [result?.originalSql, saveName, saveDescription]);

  const placeholderText = `Examples:
• Students with an IEP at Jefferson
• English learners who are chronically absent, with parent contacts
• Count of suspensions by grade level
• Class rosters for period 3`;

  const singleSchoolScope = !isDistrictWide && (result?.appliedSchools.length ?? 0) <= 1;

  return (
    <div className="space-y-4">
      {/* Compact prompt bar */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-base font-semibold">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              AI Query Builder
            </div>
            <Badge variant={isDistrictWide ? 'default' : 'secondary'} className="text-xs shrink-0">
              {isDistrictWide
                ? `District-wide (${schoolOptions.length} schools)`
                : schoolOptions[0]?.label ?? 'Single School'}
            </Badge>
          </div>

          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholderText}
            className="min-h-[90px] font-mono text-sm"
            disabled={isGenerating}
          />

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Button onClick={() => generateQuery()} disabled={isGenerating || !prompt.trim()}>
                {isGenerating ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating…</>
                ) : (
                  <><Sparkles className="h-4 w-4 mr-2" /> Generate & Run</>
                )}
              </Button>
              {isGenerating && (
                <Button variant="outline" onClick={cancelGeneration}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
              )}
              <span className="text-xs text-muted-foreground hidden sm:inline">
                <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl</kbd>+<kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd>
              </span>
            </div>
          </div>

          {/* Recent prompts */}
          {recentPrompts.length > 0 && !isGenerating && (
            <div className="flex items-start gap-2 flex-wrap">
              <History className="h-3.5 w-3.5 text-muted-foreground mt-1 shrink-0" />
              {recentPrompts.slice(0, 5).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => generateQuery(p)}
                  className="text-xs px-2 py-1 rounded-full border bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground max-w-[280px] truncate"
                  title={p}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {cancelled && !error && (
            <p className="text-sm text-muted-foreground">Cancelled.</p>
          )}
        </CardContent>
      </Card>

      {/* Live progress stepper */}
      {(isGenerating || (steps.length > 0 && !result && !cancelled)) && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Working on it…</span>
              <span className="text-xs text-muted-foreground tabular-nums">{elapsed}s elapsed</span>
            </div>
            <div className="space-y-2">
              {steps.length === 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CircleDashed className="h-4 w-4 animate-spin" /> Contacting the AI model…
                </div>
              )}
              {steps.map((step) => (
                <div key={step.key} className={`flex items-start gap-2 text-sm ${step.isRepair ? 'text-amber-700 dark:text-amber-400' : ''}`}>
                  <span className="mt-0.5 shrink-0">{stageIcon(step)}</span>
                  <div className="min-w-0">
                    <span>{step.label}</span>
                    {step.detail && (
                      <p className="text-xs text-muted-foreground truncate" title={step.detail}>{step.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Queries run on a local AI model and typically take 15–90 seconds. Fix-up attempts add time.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Results - the hero */}
      {result && !result.executeError && result.data !== null && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <span>Results ({result.rowCount.toLocaleString()} rows)</span>
              <div className="flex items-center gap-2">
                {canEditQueries && result.attemptCount > 1 && (
                  <Badge variant="outline" className="text-amber-600 border-amber-400 font-normal">
                    <RefreshCw className="h-3 w-3 mr-1" /> auto-repaired ({result.attemptCount} attempts)
                  </Badge>
                )}
                <Badge variant="secondary" className="font-normal">{result.schoolScope}</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result.rowCount > 0 ? (
              <div className="h-[600px]">
                <DataTableAgGrid data={result.data as Record<string, unknown>[]} />
              </div>
            ) : (
              <div className="py-10 text-center space-y-2">
                <p className="text-muted-foreground">No matches within {result.schoolScope}.</p>
                {singleSchoolScope && (
                  <p className="text-sm text-muted-foreground">
                    You&apos;re scoped to a single school - switch to &quot;District&quot; in the school picker to search all of your schools.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Query details drawer */}
      {result && (
        <Card>
          <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
            <CardHeader className="py-3">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    <Database className="h-4 w-4" />
                    Query details
                    <span className="flex gap-1 ml-2">
                      {result.referencedViews.map((view) => (
                        <Badge key={view} variant="secondary" className="font-mono text-[10px]">{view}</Badge>
                      ))}
                    </span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {canEditQueries && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); setSaveName(''); setSaveOpen(true); }}
                      >
                        <Save className="h-4 w-4 mr-1" /> Save as Query
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      {detailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4 mr-1 text-green-500" /> : <Copy className="h-4 w-4 mr-1" />}
                    {copied ? 'Copied!' : 'Copy SQL'}
                  </Button>
                  <Button size="sm" onClick={rerunQuery} disabled={isRerunning}>
                    {isRerunning ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Play className="h-4 w-4 mr-1" />}
                    Re-run
                  </Button>
                </div>

                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                  {result.formattedSql || result.sql}
                </pre>

                {result.warnings.length > 0 && (
                  <div className="space-y-1">
                    {result.warnings.map((warning, i) => (
                      <p key={i} className="text-sm text-amber-600 flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5" /> {warning}
                      </p>
                    ))}
                  </div>
                )}

                {/* Debug attempts (query editors only) */}
                {canEditQueries && result.debugInfo && result.debugInfo.attempts.length > 0 && (
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        <Bug className="h-4 w-4 text-amber-500" />
                        Generation attempts ({result.debugInfo.totalAttempts})
                      </span>
                      <Button variant="outline" size="sm" onClick={() => setShowDebugInfo(!showDebugInfo)}>
                        {showDebugInfo ? 'Hide' : 'Show'}
                      </Button>
                    </div>
                    {showDebugInfo && result.debugInfo.attempts.map((attempt, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={attempt.validation.valid && !attempt.executionError ? 'default' : 'destructive'}>
                            Attempt {attempt.attemptNumber}
                          </Badge>
                          {!attempt.validation.valid && (
                            <Badge variant="outline" className="text-red-600 border-red-400">
                              <AlertCircle className="h-3 w-3 mr-1" /> Invalid
                            </Badge>
                          )}
                          {attempt.executionError && (
                            <Badge variant="outline" className="text-red-600 border-red-400">
                              <AlertCircle className="h-3 w-3 mr-1" /> Execution failed
                            </Badge>
                          )}
                        </div>
                        <pre className="bg-muted p-3 rounded-md overflow-x-auto text-xs font-mono whitespace-pre-wrap max-h-48">
                          {attempt.sql}
                        </pre>
                        {attempt.validation.errors.length > 0 && (
                          <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-md space-y-1">
                            {attempt.validation.errors.map((e, i) => (
                              <p key={i} className="text-xs text-red-600">{e}</p>
                            ))}
                          </div>
                        )}
                        {attempt.executionError && (
                          <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-md">
                            <p className="text-xs text-red-600">{attempt.executionError}</p>
                          </div>
                        )}
                        {index < result.debugInfo!.attempts.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}

      {/* Save as Query dialog */}
      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save as Query</DialogTitle>
            <DialogDescription>
              Adds this query to the saved-query system. The school filter becomes dynamic
              (@@sc), so it scopes to whoever runs it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="save-query-name">Name</Label>
              <Input
                id="save-query-name"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="e.g. Chronically absent English learners"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="save-query-description">Description</Label>
              <Input
                id="save-query-description"
                value={saveDescription}
                onChange={(e) => setSaveDescription(e.target.value)}
                placeholder="Optional"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving || !saveName.trim()}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
