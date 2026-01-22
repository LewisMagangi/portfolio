import "dotenv/config";
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkDB() {
  const client = await pool.connect();
  try {
    // List tables
    const tables = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('📋 Tables in database:', tables.rows.map(r => r.table_name).join(', ') || 'NONE');
    
    // Check education table
    try {
      const education = await client.query('SELECT * FROM education ORDER BY "start_date" DESC');
      console.log('\n📚 Education records:', education.rows.length);
      education.rows.forEach(e => console.log(`  - ${e.degree} at ${e.institution}`));
    } catch (e) {
      console.log('\n❌ Education table error:', e.message);
    }
    
    // Check users table  
    try {
      const users = await client.query('SELECT id, email, role FROM users');
      console.log('\n👤 Users:', users.rows.length);
      users.rows.forEach(u => console.log(`  - ${u.email} (${u.role})`));
    } catch (e) {
      console.log('\n❌ Users table error:', e.message);
    }
    
  } finally {
    client.release();
    await pool.end();
  }
}

checkDB();
