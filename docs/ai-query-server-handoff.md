# AI Query (local LLM) — Server Debugging Handoff

Purpose: hand this to a Claude Code session **running on the production server**
(`administrator@IT-TOOLS:~/data-slusd`) to finish getting the AI Query Builder
working against the local Ollama model. Everything here can only be verified on
the server (it needs Ollama, the real `.env`, the systemd service, and the DB).

## System overview

- Next.js 15 app (App Router). Served in **production** via systemd unit
  `data-slusd` → `npm start` (`next start`) from `/home/administrator/data-slusd`,
  listening on `:3000`. Public URL `https://data.slusd.us` (TLS terminated by a
  reverse proxy in front of :3000 — confirm which: `nginx`/`caddy`).
- AI Query pipeline: `POST /api/ai-query/view-generate` →
  `lib/ai-query/generate-view-query.ts` (generate → validate → repair → execute)
  → `lib/llm-client.ts` (OpenAI-compatible HTTP client) → Ollama at
  `http://localhost:11434/v1`.
- Env is read at **runtime** by `next start`. Non-`NEXT_PUBLIC_` changes need
  only a service restart, **not** a rebuild. Env precedence in production:
  `.env.production.local` > `.env.local` > `.env.production` > `.env`.

## Current status (2026-07-07)

- ✅ Ollama reachable; models pulled: `qwen2.5-coder:7b`, `qwen2.5-coder:14b`.
- ✅ Generation works on **7B**: one recent run logged
  `attempts=1/4 valid=true executed=true rows=42 durationMs=104709` (~105s/call).
- ❌ **14B is too slow on CPU** — exceeded the 180s client timeout
  (`LLM request timed out after 180000ms`). Stay on **7B** unless a GPU is added.
  Relevant env: `LLM_PROVIDER=local`, `LLM_MODEL=qwen2.5-coder:7b`,
  `LLM_TIMEOUT_MS=180000`, `LLM_TEMPERATURE=0.1`. `LLM_BASE_URL` is unset →
  defaults to `http://localhost:11434/v1` (correct for local Ollama).
- ❌ **Streaming route crashes after a successful generation** (see Issue 1).

## Issue 1 — `TypeError: Invalid state: Controller is already closed`

Log:
```
[View AI Query] attempts=1/4 valid=true executed=true rows=42 durationMs=104709
[View AI Query] Error: TypeError: Invalid state: Controller is already closed
  code: 'ERR_INVALID_STATE'
```

Root cause (in `app/api/ai-query/view-generate/route.ts`, streaming branch,
`body.stream === true`): the single LLM call takes ~105s and emits **no stream
bytes during that window**, so the client (browser fetch and/or the reverse
proxy's `proxy_read_timeout`, nginx default 60s) closes the connection. When
`generate()` finally resolves, the code calls `send({type:'result'})`
(`controller.enqueue`) and then `finally { controller.close() }` on an
**already-closed** controller → throws `ERR_INVALID_STATE`.

Two independent fixes; do both.

### 1a. Guard controller writes (stops the crash)

In the `ReadableStream({ start(controller) {...} })` block, make `send` and the
final close no-ops once the controller is closed:

```ts
async start(controller) {
  let closed = false;
  const send = (obj: unknown) => {
    if (closed) return;
    try {
      controller.enqueue(encoder.encode(`${JSON.stringify(obj)}\n`));
    } catch {
      closed = true; // client already disconnected
    }
  };
  const safeClose = () => {
    if (closed) return;
    closed = true;
    try { controller.close(); } catch { /* already closed */ }
  };
  try {
    const result = await generate((event) => send({ type: 'progress', ...event }));
    const durationMs = Date.now() - startTime;
    logOutcome(result, durationMs);
    const { body: payload } = buildResponsePayload(result, { ...payloadOpts, durationMs });
    send({ type: 'result', payload });
  } catch (error) {
    console.error('[View AI Query] Error:', error);
    send({ type: 'error', error: error instanceof Error ? error.message : 'Query generation failed' });
  } finally {
    safeClose();
  }
},
cancel() { closed = true; }, // client went away
```

### 1b. Heartbeat so the long call doesn't idle-timeout (fixes the real cause)

The guard stops the crash but the user still loses the result if the connection
dropped. Keep the stream warm by emitting a ping every ~15s during generation:

```ts
// inside start(), after `send`/`safeClose` are defined:
const heartbeat = setInterval(() => send({ type: 'ping' }), 15000);
try {
  ...
} finally {
  clearInterval(heartbeat);
  safeClose();
}
```

Make sure the **client** (the AI Query UI component that reads this NDJSON
stream) ignores `{type:'ping'}` lines. Find it near `AIQueryClient` / wherever
`view-generate` is fetched with `stream: true`, and confirm the line parser
skips unknown/`ping` types.

### 1c. Reverse-proxy timeout (belt and suspenders)

Even with heartbeats, bump the proxy so a slow first call (model load) can't be
cut. For nginx, in the `location` proxying to `:3000`:
```
proxy_read_timeout 300s;
proxy_send_timeout 300s;
```
then `sudo nginx -t && sudo systemctl reload nginx`. (Adjust for caddy if that's
what's in front.)

### Verify Issue 1

1. `journalctl -u data-slusd -f` in one shell.
2. In the browser (signed in), run an AI query and watch the logs.
3. Expect: progress/ping lines flow, generation completes, **no**
   `ERR_INVALID_STATE`, and the result renders in the UI.
   (The endpoint requires an authenticated session, so test via the UI, not a
   bare curl — curl can't easily present the Auth.js session cookie.)

## Ops cheat-sheet

```bash
# Service
sudo systemctl restart data-slusd
sudo systemctl status data-slusd
journalctl -u data-slusd -f                 # live logs (SyslogIdentifier=data-slusd)
journalctl -u data-slusd -n 200 --no-pager  # recent

# Env (runtime; no rebuild needed for LLM_* changes)
grep -n LLM_ .env .env.production .env.production.local 2>/dev/null
#   fix the highest-precedence file if the value appears in more than one

# Ollama
ollama list                                  # exact model NAME must match LLM_MODEL
free -h                                       # 7B ~5GB, 14B ~10GB resident; avoid swap
time curl -s http://localhost:11434/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -d '{"model":"qwen2.5-coder:7b","messages":[{"role":"user","content":"return SELECT 1"}],"stream":false}'

# App
npm run build && sudo systemctl restart data-slusd   # only if you changed code
npx tsx --test lib/authorization.test.ts             # unit tests (node:test via tsx)
```

Enable verbose LLM/AI-query logging by setting `AI_QUERY_DEBUG=true` in the env
and restarting — adds prompt/model/base-url/SQL logging in the route and client.

## Key files

- `app/api/ai-query/view-generate/route.ts` — the streaming route (Issue 1 here).
- `lib/ai-query/generate-view-query.ts` — generate→validate→repair→execute loop;
  emits `GenerationProgressEvent`s via `onProgress`.
- `lib/llm-client.ts` — HTTP client; `LLM_TIMEOUT_MS`, transport retry, provider
  endpoints. Note it currently **retries on timeout** (doubles the wait on a slow
  model) — consider making timeouts fail-fast.
- `lib/ai-query/sql-validator.ts` — SELECT-only + `llm_*` view whitelist + blocked
  base tables. Also used by `app/api/custom-query/execute/route.ts`.
- Client UI: search for the component that fetches `view-generate` with
  `stream: true` (around `AIQueryClient`) to fix the `ping` handling.

## Guardrails / context

- `main` is current and has both the security hardening (PR #24) and the AI-query
  overhaul. Work on a branch, not directly on `main`.
- **Never commit secrets.** `.env*` is gitignored; keep it that way. Reference env
  var *names* in code/docs, never values.
- `next.config.mjs` has `typescript.ignoreBuildErrors: true` — the tree has ~128
  pre-existing type errors, so `npm run build` won't fail on types. Don't remove
  that flag without a dedicated cleanup pass.
- Pragmatic model choice on CPU is **7B**. If quality is insufficient, the
  alternative is Gemini (`LLM_PROVIDER=gemini`, `LLM_MODEL=gemini-2.5-flash`) —
  fast, but subject to the free-tier rate limits noted previously.
```
