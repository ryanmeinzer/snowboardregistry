import { config } from 'dotenv';
import { sql } from '@vercel/postgres';

config();

async function alterSchema() {
  try {
    await sql`
      ALTER TABLE snowboards
      ALTER COLUMN make DROP NOT NULL,
      ALTER COLUMN model DROP NOT NULL,
      ALTER COLUMN size DROP NOT NULL,
      ALTER COLUMN email DROP NOT NULL;
    `;
    console.log('Table "snowboards" altered successfully');
  } catch (error) {
    console.error('Error altering schema:', error);
  }
}

alterSchema();

