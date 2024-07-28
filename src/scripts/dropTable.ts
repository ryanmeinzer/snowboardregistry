import 'dotenv/config'
import { sql } from '@vercel/postgres';

async function dropTable() {
  try {
    await sql`
      DROP TABLE IF EXISTS snowboards;
    `;
    console.log('Table "snowboards" dropped successfully');
  } catch (error) {
    console.error('Error dropping table:', error);
  }
}

dropTable();
