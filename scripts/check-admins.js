import "dotenv/config";
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkAdmins() {
  const client = await pool.connect();
  try {
    const admins = await client.query(
      'SELECT email, name, created_at FROM users WHERE role = $1 ORDER BY created_at',
      ['ADMIN']
    );

    console.log('Admin users by creation order:');
    admins.rows.forEach((u, i) => {
      console.log(`${i+1}. ${u.email} - ${u.name} (created: ${u.created_at})`);
    });

  } finally {
    client.release();
    await pool.end();
  }
}

checkAdmins();
