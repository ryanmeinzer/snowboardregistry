import { config } from 'dotenv';
import { sql } from '@vercel/postgres';

config();

async function addSize() {
  try {
    await sql`
      ALTER TABLE snowboards
      ADD COLUMN size INTEGER NOT NULL DEFAULT 0;
    `;
    console.log('Column "size" added to "snowboards" table successfully');
  } catch (error) {
    console.error('Error altering schema:', error);
  }
}

addSize();
