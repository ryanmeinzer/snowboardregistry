import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const { serial_number, make, model, size, email } = await req.json();

  try {
    const result = await sql`
      INSERT INTO snowboards (serial_number, make, model, size, email)
      VALUES (${serial_number}, ${make}, ${model}, ${size}, ${email})
      RETURNING *
    `;
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error registering snowboard' }, { status: 500 });
  }
}
