import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/authGuard";
import { userCanUploadIep } from "@/lib/authorization";
import { checkRateLimit } from "@/lib/rateLimit";
import { postFastApiForm } from "@/lib/fastapi-server";

/**
 * IEP upload proxy (finding S6).
 *
 * Requires the SPED / IEPUPLOAD role, mints the FastAPI token server-side, and
 * validates every file (PDF MIME type, .pdf name, %PDF- magic bytes, size,
 * count) before forwarding. The browser never supplies credentials.
 */

const MAX_FILES = 10;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // matches the dropzone's maxSize
const UPLOADS_PER_MINUTE = 5;

async function isPdf(file: File): Promise<boolean> {
  if (file.type !== "application/pdf") return false;
  if (!file.name.toLowerCase().endsWith(".pdf")) return false;
  const head = Buffer.from(await file.slice(0, 5).arrayBuffer());
  return head.toString("latin1") === "%PDF-";
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!userCanUploadIep(user)) {
    return NextResponse.json({ error: "IEP upload access required" }, { status: 403 });
  }

  const limit = checkRateLimit(`iep-upload:${user.id}`, {
    maxRequests: UPLOADS_PER_MINUTE,
    windowSeconds: 60,
  });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many uploads. Please wait a minute and try again." },
      {
        status: 429,
        headers: { "Retry-After": Math.ceil((limit.reset - Date.now()) / 1000).toString() },
      }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const files = formData.getAll("file").filter((v): v is File => v instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "No files were uploaded" }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: `At most ${MAX_FILES} files per upload` }, { status: 400 });
  }

  const upstream = new FormData();
  for (const file of files) {
    if (file.size === 0 || file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: `"${file.name}" must be between 1 byte and 10 MB` },
        { status: 400 }
      );
    }
    if (!(await isPdf(file))) {
      return NextResponse.json({ error: `"${file.name}" is not a PDF file` }, { status: 400 });
    }
    upstream.append("file", file, file.name);
  }

  try {
    const data = await postFastApiForm("/sped/uploadIepAtAGlance/", upstream);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Upload proxy error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 502 });
  }
}
