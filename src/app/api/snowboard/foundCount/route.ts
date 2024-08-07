import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM snowboards WHERE found_by IS NOT NULL
    `;
    const count = result.rows[0].count;
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Failed to fetch count:', error);
    return NextResponse.json({ error: 'Failed to fetch count' }, { status: 500 });
  }
}