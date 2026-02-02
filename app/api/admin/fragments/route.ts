import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/db';
import adminCheck from '@/lib/adminCheck';

/**
 * Validates SQL fragment for safety
 * Ensures fragment only contains SELECT statements
 */
function validateFragmentSQL(snippet: string, fragmentType: string): { valid: boolean; error?: string } {
  // Normalize SQL
  const normalized = snippet.trim().toLowerCase();

  if (!normalized) {
    return { valid: false, error: 'SQL snippet cannot be empty' };
  }

  // For base queries, must start with SELECT
  if (fragmentType === 'base') {
    if (!normalized.startsWith('select') && !normalized.startsWith('with')) {
      return { valid: false, error: 'Base queries must start with SELECT or WITH (CTE)' };
    }
  }

  // Check for dangerous SQL keywords
  const dangerousKeywords = [
    'drop', 'delete', 'insert', 'update', 'alter', 'create', 'truncate',
    'exec', 'execute', 'xp_cmdshell', 'sp_executesql', 'merge', 'grant',
    'revoke', 'deny', 'backup', 'restore', 'bulk'
  ];

  for (const keyword of dangerousKeywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(snippet)) {
      return { valid: false, error: `Dangerous keyword detected: ${keyword.toUpperCase()}. Fragments must be read-only.` };
    }
  }

  // Check for SQL injection patterns
  const injectionPatterns = [
    /;\s*(drop|delete|insert|update|create)/i,
    /--\s*$/m, // SQL comments at end of line (potential comment-out attack)
    /\/\*.*\*\//s, // Block comments (can hide malicious code)
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(snippet)) {
      return { valid: false, error: 'SQL snippet contains potentially unsafe patterns' };
    }
  }

  // Validate no multiple statements (semicolon-separated)
  const statements = snippet.split(';').filter(s => s.trim().length > 0);
  if (statements.length > 1) {
    return { valid: false, error: 'Fragments cannot contain multiple SQL statements (semicolon-separated)' };
  }

  return { valid: true };
}

// GET all fragments
export async function GET() {
  try {
    const isAdmin = await adminCheck();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const fragments = await prisma.aIFragment.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { category: true },
    });

    return NextResponse.json(fragments);
  } catch (error) {
    console.error('[Fragments API] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch fragments' }, { status: 500 });
  }
}

// POST create new fragment
export async function POST(request: Request) {
  try {
    const isAdmin = await adminCheck();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.fragmentId || !data.name || !data.snippet || !data.categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields: fragmentId, name, snippet, categoryId' },
        { status: 400 }
      );
    }

    // Validate SQL fragment for safety
    const validation = validateFragmentSQL(data.snippet, data.type || 'filter');
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Invalid SQL fragment',
          details: validation.error,
        },
        { status: 400 }
      );
    }

    // Validate fragmentId format (alphanumeric and underscores only)
    if (!/^[a-zA-Z0-9_]+$/.test(data.fragmentId)) {
      return NextResponse.json(
        { error: 'Fragment ID must contain only alphanumeric characters and underscores' },
        { status: 400 }
      );
    }

    // Check for duplicate fragmentId
    const existing = await prisma.aIFragment.findUnique({
      where: { fragmentId: data.fragmentId },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Fragment ID already exists' },
        { status: 400 }
      );
    }

    // Get max sort order
    const maxSortOrder = await prisma.aIFragment.aggregate({
      _max: { sortOrder: true },
    });

    const fragment = await prisma.aIFragment.create({
      data: {
        fragmentId: data.fragmentId,
        name: data.name,
        description: data.description || '',
        snippet: data.snippet,
        type: data.type || 'filter',
        categoryId: data.categoryId,
        subcategory: data.subcategory || '',
        tables: JSON.stringify(data.tables || []),
        dependencies: JSON.stringify(data.dependencies || []),
        conflicts: JSON.stringify(data.conflicts || []),
        parameters: JSON.stringify(data.parameters || []),
        outputColumns: JSON.stringify(data.outputColumns || []),
        tags: JSON.stringify(data.tags || []),
        sortOrder: (maxSortOrder._max.sortOrder || 0) + 1,
      },
      include: { category: true },
    });

    return NextResponse.json(fragment);
  } catch (error) {
    console.error('[Fragments API] POST error:', error);
    return NextResponse.json({ error: 'Failed to create fragment' }, { status: 500 });
  }
}
