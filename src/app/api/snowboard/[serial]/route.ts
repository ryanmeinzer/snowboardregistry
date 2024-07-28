import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const serial = pathname.split('/').pop();

  try {
    const result = await sql`
      SELECT * FROM snowboards WHERE serial_number = ${serial}
    `;
    if (result.rowCount > 0) {
      return NextResponse.json(result.rows[0]);
    } else {
      return NextResponse.json({ message: 'Snowboard not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving snowboard' }, { status: 500 });
  }
}
