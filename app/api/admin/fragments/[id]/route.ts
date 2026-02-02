import { NextResponse } from 'next/server';
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

// GET single fragment
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await adminCheck();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const fragment = await prisma.aIFragment.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!fragment) {
      return NextResponse.json({ error: 'Fragment not found' }, { status: 404 });
    }

    return NextResponse.json(fragment);
  } catch (error) {
    console.error('[Fragments API] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch fragment' }, { status: 500 });
  }
}

// PUT update fragment
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await adminCheck();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    // Check fragment exists
    const existing = await prisma.aIFragment.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Fragment not found' }, { status: 404 });
    }

    // Validate SQL snippet if it's being updated
    if (data.snippet !== undefined) {
      const fragmentType = data.type !== undefined ? data.type : existing.type;
      const validation = validateFragmentSQL(data.snippet, fragmentType);
      if (!validation.valid) {
        return NextResponse.json(
          {
            error: 'Invalid SQL fragment',
            details: validation.error,
          },
          { status: 400 }
        );
      }
    }

    // Build update data
    const updateData: any = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.snippet !== undefined) updateData.snippet = data.snippet;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
    if (data.subcategory !== undefined) updateData.subcategory = data.subcategory;
    if (data.tables !== undefined) updateData.tables = JSON.stringify(data.tables);
    if (data.dependencies !== undefined) updateData.dependencies = JSON.stringify(data.dependencies);
    if (data.conflicts !== undefined) updateData.conflicts = JSON.stringify(data.conflicts);
    if (data.parameters !== undefined) updateData.parameters = JSON.stringify(data.parameters);
    if (data.outputColumns !== undefined) updateData.outputColumns = JSON.stringify(data.outputColumns);
    if (data.tags !== undefined) updateData.tags = JSON.stringify(data.tags);
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;

    const fragment = await prisma.aIFragment.update({
      where: { id },
      data: updateData,
      include: { category: true },
    });

    return NextResponse.json(fragment);
  } catch (error) {
    console.error('[Fragments API] PUT error:', error);
    return NextResponse.json({ error: 'Failed to update fragment' }, { status: 500 });
  }
}

// DELETE fragment
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await adminCheck();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check fragment exists
    const existing = await prisma.aIFragment.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Fragment not found' }, { status: 404 });
    }

    // Hard delete
    await prisma.aIFragment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Fragments API] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete fragment' }, { status: 500 });
  }
}
