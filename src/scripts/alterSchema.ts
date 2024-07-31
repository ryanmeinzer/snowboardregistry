import 'dotenv/config'
import { sql } from '@vercel/postgres';

async function alterSchema() {
  try {
    await sql`
      ALTER TABLE snowboards
      DROP COLUMN found
    `;
    console.log('Table "snowboards" altered successfully');
  } catch (error) {
    console.error('Error altering schema:', error);
  }
}

alterSchema();

