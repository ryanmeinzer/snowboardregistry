import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const { serial_number, make, model, size, email } = await req.json();

  try {
    // Upsert query to handle both new registration and updating existing records
    const result = await sql`
      INSERT INTO snowboards (serial_number, make, model, size, email)
      VALUES (${serial_number}, ${make}, ${model}, ${size}, ${email})
      ON CONFLICT (serial_number) DO UPDATE
      SET make = EXCLUDED.make,
          model = EXCLUDED.model,
          size = EXCLUDED.size,
          email = EXCLUDED.email
      RETURNING *
    `;
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error registering or updating the snowboard' }, { status: 500 });
  }
}
