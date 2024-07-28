import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const { serial_number, found_by } = await req.json();

  try {
    console.log('Received data:', { serial_number, found_by });

    // Update the snowboard if it exists, otherwise, create a new record with minimal fields
    const result = await sql`
      INSERT INTO snowboards (serial_number, found, found_by)
      VALUES (${serial_number}, TRUE, ${found_by})
      ON CONFLICT (serial_number) DO UPDATE
      SET found = TRUE, found_by = ${found_by}
      RETURNING *
    `;
    console.log('Database response:', result.rows[0]);

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error updating snowboard:', error);
    return NextResponse.json({ error: 'Error updating snowboard' }, { status: 500 });
  }
}
