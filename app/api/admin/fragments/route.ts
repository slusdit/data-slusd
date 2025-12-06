import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/db';
import adminCheck from '@/lib/adminCheck';

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
