import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const { serial_number, found_by, make, model, size } = await req.json();

  try {
    console.log('Received data:', { serial_number, found_by, make, model, size });

    // Update the snowboard if it exists, otherwise, create a new record with all available fields
    const result = await sql`
      INSERT INTO snowboards (serial_number, found_by, make, model, size)
      VALUES (${serial_number}, ${found_by}, ${make}, ${model}, ${size})
      ON CONFLICT (serial_number) DO UPDATE
      SET found_by = ${found_by}, make = COALESCE(EXCLUDED.make, snowboards.make), model = COALESCE(EXCLUDED.model, snowboards.model), size = COALESCE(EXCLUDED.size, snowboards.size)
      RETURNING *
    `;
    console.log('Database response:', result.rows[0]);

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error updating snowboard:', error);
    return NextResponse.json({ error: 'Error updating snowboard' }, { status: 500 });
  }
}
