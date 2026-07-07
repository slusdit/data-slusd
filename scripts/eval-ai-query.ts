/**
 * Eval harness for the AI query builder (view mode).
 *
 * Runs the golden prompt set (scripts/eval/golden-prompts.json) through the
 * real generation engine (lib/ai-query/generate-view-query.ts) and reports:
 *   - first-attempt validation pass rate
 *   - final execution success rate
 *   - per-prompt failure stage (validation / execution / assertion)
 *   - mean attempts, latency, token usage
 *
 * Usage:
 *   npx tsx scripts/eval-ai-query.ts                # full run, executes SQL
 *   npx tsx scripts/eval-ai-query.ts --no-execute   # validation only (no DB)
 *   npx tsx scripts/eval-ai-query.ts --filter=elpac # only prompts whose id matches
 *   npx tsx scripts/eval-ai-query.ts --limit=5      # only the first N prompts
 *   npx tsx scripts/eval-ai-query.ts --ids=a,b,c    # only these exact prompt ids
 *   npx tsx scripts/eval-ai-query.ts --school=16    # school scope (default 16)
 *   npx tsx scripts/eval-ai-query.ts --delay=3000   # ms between prompts (default 2000)
 *   npx tsx scripts/eval-ai-query.ts --dbYear=25    # Aeries DB year (default: latest available)
 *
 * Exits non-zero if pass rates fall below thresholds (see THRESHOLDS).
 */

import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateViewQuery, GenerateViewQueryResult } from '../lib/ai-query/generate-view-query';
import { AVAILABLE_DB_YEARS } from '../lib/schoolYear';

const THRESHOLDS = {
  finalExecutionSuccessRate: 0.95,
  firstAttemptValidationRate: 0.75,
};

interface GoldenPrompt {
  id: string;
  prompt: string;
  /** ALL of these views must be referenced */
  expectViews?: string[];
  /** AT LEAST ONE of these views must be referenced */
  expectAnyViews?: string[];
  minRows?: number;
  notes?: string;
}

interface EvalResult {
  id: string;
  prompt: string;
  passed: boolean;
  failureStage?: 'validation' | 'execution' | 'assertion';
  failureDetail?: string;
  firstAttemptValid: boolean;
  attempts: number;
  rowCount: number;
  durationMs: number;
  referencedViews: string[];
  sql: string;
  completionTokens?: number;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (name: string) => {
    const arg = args.find((a) => a.startsWith(`--${name}=`));
    return arg ? arg.split('=')[1] : undefined;
  };
  return {
    execute: !args.includes('--no-execute'),
    filter: get('filter'),
    ids: get('ids')?.split(',').map((s) => s.trim()),
    limit: get('limit') ? parseInt(get('limit')!) : undefined,
    school: get('school') ?? '16',
    delayMs: parseInt(get('delay') ?? '2000'),
    // DEFAULT_DB_YEAR can point at a not-yet-provisioned database early in a
    // new school year, so default to the latest year known to exist
    dbYear: parseInt(get('dbYear') ?? String(AVAILABLE_DB_YEARS[0].year)),
  };
}

function checkAssertions(entry: GoldenPrompt, result: GenerateViewQueryResult): string | null {
  const views = result.validation.referencedViews;

  if (entry.expectViews) {
    const missing = entry.expectViews.filter((v) => !views.includes(v));
    if (missing.length > 0) {
      return `Expected views not referenced: ${missing.join(', ')} (got: ${views.join(', ') || 'none'})`;
    }
  }

  if (entry.expectAnyViews && !entry.expectAnyViews.some((v) => views.includes(v))) {
    return `Expected one of [${entry.expectAnyViews.join(', ')}] to be referenced (got: ${views.join(', ') || 'none'})`;
  }

  if (entry.minRows !== undefined && result.executed && result.rowCount < entry.minRows) {
    return `Expected at least ${entry.minRows} row(s), got ${result.rowCount}`;
  }

  return null;
}

async function main() {
  const opts = parseArgs();
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const goldenPath = path.join(scriptDir, 'eval', 'golden-prompts.json');
  const golden: { prompts: GoldenPrompt[] } = JSON.parse(fs.readFileSync(goldenPath, 'utf-8'));

  let prompts = golden.prompts;
  if (opts.filter) {
    prompts = prompts.filter((p) => p.id.includes(opts.filter!));
  }
  if (opts.ids) {
    prompts = prompts.filter((p) => opts.ids!.includes(p.id));
  }
  if (opts.limit) {
    prompts = prompts.slice(0, opts.limit);
  }

  console.log(`Running ${prompts.length} golden prompts (execute=${opts.execute}, school=${opts.school})...\n`);

  // Use the standalone runner (fake district-wide session) so no auth is needed.
  // Loaded lazily so --no-execute runs don't need the Next/auth/DB stack at all.
  let runner: ((sql: string) => Promise<unknown>) | undefined;
  if (opts.execute) {
    const { runQueryStandalone } = await import('../lib/aeries');
    runner = (sql: string) => runQueryStandalone(sql, true, { dbYear: opts.dbYear });
  }

  const results: EvalResult[] = [];

  for (const [i, entry] of prompts.entries()) {
    process.stdout.write(`[${i + 1}/${prompts.length}] ${entry.id} ... `);

    try {
      const result = await generateViewQuery({
        prompt: entry.prompt,
        schools: [opts.school],
        execute: opts.execute,
        runner,
      });

      const firstAttemptValid = result.attempts[0]?.validation.valid ?? false;
      let failureStage: EvalResult['failureStage'];
      let failureDetail: string | undefined;

      if (!result.validation.valid) {
        failureStage = 'validation';
        failureDetail = result.validation.errors.join('; ');
      } else if (opts.execute && !result.executed) {
        failureStage = 'execution';
        failureDetail = result.executeError;
      } else {
        const assertionFailure = checkAssertions(entry, result);
        if (assertionFailure) {
          failureStage = 'assertion';
          failureDetail = assertionFailure;
        }
      }

      const passed = !failureStage;
      results.push({
        id: entry.id,
        prompt: entry.prompt,
        passed,
        failureStage,
        failureDetail,
        firstAttemptValid,
        attempts: result.attempts.length,
        rowCount: result.rowCount,
        durationMs: result.durationMs,
        referencedViews: result.validation.referencedViews,
        sql: result.sql,
        completionTokens: result.llmUsage?.completionTokens,
      });

      console.log(
        passed
          ? `PASS (${result.attempts.length} attempt${result.attempts.length > 1 ? 's' : ''}, ${result.rowCount} rows, ${result.durationMs}ms)`
          : `FAIL [${failureStage}] ${failureDetail}`
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      results.push({
        id: entry.id,
        prompt: entry.prompt,
        passed: false,
        failureStage: 'execution',
        failureDetail: `Unhandled: ${message}`,
        firstAttemptValid: false,
        attempts: 0,
        rowCount: 0,
        durationMs: 0,
        referencedViews: [],
        sql: '',
      });
      console.log(`FAIL [unhandled] ${message}`);
    }

    // Pace requests to stay under Gemini RPM limits (worst case 4 calls/prompt)
    if (i < prompts.length - 1) {
      await new Promise((r) => setTimeout(r, opts.delayMs));
    }
  }

  // ---- Aggregates ----
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const firstAttemptValid = results.filter((r) => r.firstAttemptValid).length;
  const executionEligible = results.filter((r) => r.failureStage !== 'assertion');
  const executionSucceeded = results.filter((r) => r.passed || r.failureStage === 'assertion').length;
  const ran = results.filter((r) => r.attempts > 0);
  const meanAttempts = ran.length ? ran.reduce((s, r) => s + r.attempts, 0) / ran.length : 0;
  const meanLatency = ran.length ? ran.reduce((s, r) => s + r.durationMs, 0) / ran.length : 0;

  const firstAttemptRate = total ? firstAttemptValid / total : 0;
  const executionRate = total ? executionSucceeded / total : 0;

  console.log('\n========== EVAL SUMMARY ==========');
  console.log(`Overall pass:                 ${passed}/${total} (${(100 * passed / total).toFixed(0)}%)`);
  console.log(`First-attempt validation:     ${firstAttemptValid}/${total} (${(100 * firstAttemptRate).toFixed(0)}%)  [target >= ${100 * THRESHOLDS.firstAttemptValidationRate}%]`);
  console.log(`Final generation+execution:   ${executionSucceeded}/${total} (${(100 * executionRate).toFixed(0)}%)  [target >= ${100 * THRESHOLDS.finalExecutionSuccessRate}%]`);
  console.log(`Mean attempts:                ${meanAttempts.toFixed(2)}`);
  console.log(`Mean latency:                 ${Math.round(meanLatency)}ms`);

  const failures = results.filter((r) => !r.passed);
  if (failures.length > 0) {
    console.log('\nFailures:');
    for (const f of failures) {
      console.log(`  - ${f.id} [${f.failureStage}]: ${f.failureDetail}`);
    }
  }

  // Persist full results for diffing between runs
  const outPath = path.join(scriptDir, 'eval', `results-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  fs.writeFileSync(outPath, JSON.stringify({ opts, results }, null, 2));
  console.log(`\nFull results written to ${outPath}`);

  const belowThreshold =
    executionRate < THRESHOLDS.finalExecutionSuccessRate ||
    firstAttemptRate < THRESHOLDS.firstAttemptValidationRate;

  if (belowThreshold) {
    console.error('\nBelow acceptance thresholds.');
    process.exit(1);
  }
}

main().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
