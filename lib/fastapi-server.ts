import "server-only";

/**
 * Server-side client for the FastAPI service. The service credentials and the
 * minted token never leave the server (finding S6); browser code talks only to
 * the /api/fastapi/* proxy routes.
 */

function serviceUrl(): string {
  const base = process.env.FAST_API_URL;
  if (!base) throw new Error("FAST_API_URL is not configured");
  return base.replace(/\/+$/, "");
}

/** Mint a short-lived service token using the server-only credentials. */
export async function getFastApiToken(): Promise<string> {
  const response = await fetch(`${serviceUrl()}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: process.env.FAST_API_USER,
      password: process.env.FAST_API_PASSWORD,
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`FastAPI token request failed: ${response.status}`);
  }
  const data = (await response.json()) as { token?: string };
  if (!data.token) {
    throw new Error("FastAPI token response did not include a token");
  }
  return data.token;
}

/** POST multipart form data to a FastAPI endpoint with a fresh service token. */
export async function postFastApiForm(path: string, form: FormData): Promise<unknown> {
  const token = await getFastApiToken();
  const response = await fetch(`${serviceUrl()}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`FastAPI error: ${response.status}`);
  }
  return response.json();
}
