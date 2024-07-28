import 'dotenv/config'
import { sql } from '@vercel/postgres';

async function createSchema() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS snowboards (
        id SERIAL PRIMARY KEY,
        serial_number INTEGER UNIQUE NOT NULL,
        make VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        size INTEGER NOT NULL,
        email VARCHAR(255),
        claimed BOOLEAN DEFAULT FALSE,
        found BOOLEAN DEFAULT FALSE,
        found_by VARCHAR(255)
      );
    `;
    console.log('Table "snowboards" created successfully');
  } catch (error) {
    console.error('Error creating schema:', error);
  }
}

createSchema();
