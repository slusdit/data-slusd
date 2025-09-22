// app/api/fastapi/token/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('Available env vars:', {
  FAST_API_URL: process.env.FAST_API_URL,
  // NEXT_PUBLIC_FAST_API_URL: process.env.NEXT_PUBLIC_FAST_API_URL
  });
  const body = {
    "username": process.env.FAST_API_USER,
    "password": process.env.FAST_API_PASSWORD
  }
  console.log("Body received in token route", JSON.stringify(body));
  try {
    const urlBase = process.env.FAST_API_URL;
    console.log("FastAPI URL:", urlBase);
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

