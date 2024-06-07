import { sql } from '@vercel/postgres';
import { config } from 'dotenv';

config();

async function createSchema() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS snowboards (
        id SERIAL PRIMARY KEY,
        serial_number VARCHAR(255) UNIQUE NOT NULL,
        make VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Table "snowboards" created successfully');
  } catch (error) {
    console.error('Error creating schema:', error);
  }
}

createSchema();