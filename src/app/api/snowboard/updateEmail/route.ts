import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const { serial_number, email } = await req.json();

  try {
    const result = await sql`
      UPDATE snowboards
      SET email = ${email}
      WHERE serial_number = ${serial_number}
      RETURNING *
    `;
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating email' }, { status: 500 });
  }
}
