// app/api/fastapi/token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/authGuard';

export async function POST(request: NextRequest) {
  // Only authenticated users may mint a FastAPI service token.
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Credentials come from server-only env vars and are never logged or echoed.
  const body = {
    "username": process.env.FAST_API_USER,
    "password": process.env.FAST_API_PASSWORD
  }
  try {
    const urlBase = process.env.FAST_API_URL;
    const response = await fetch(`${urlBase}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`FastAPI error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Auth proxy error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

