// lib/fastAPI.ts - browser-side client for the /api/fastapi/* proxy routes.
// The FastAPI service token is minted server-side (lib/fastapi-server.ts);
// the browser never sees credentials or tokens.

export async function uploadIEP(files: File[]) {
  return postFiles("/api/fastapi/upload", files);
}

export async function uploadRFEP(files: File[]) {
  return postFiles("/api/fastapi/rfep-upload", files);
}

async function postFiles(url: string, files: File[]) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file", file);
  });

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let message = `Upload failed (HTTP ${response.status})`;
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
    } catch {
      // non-JSON error body; keep the generic message
    }
    throw new Error(message);
  }

  return response.json();
}
