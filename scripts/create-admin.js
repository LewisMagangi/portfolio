// Quick script to create admin user from ENV variables
import "dotenv/config";
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createAdmin() {
  const client = await pool.connect();
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || 'Admin User';

    if (!email || !password) {
      console.error('❌ Please set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file');
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists
    const existing = await client.query('SELECT id FROM users WHERE email = $1', [email]);
    
    if (existing.rows.length > 0) {
      // Update existing
      await client.query(
        `UPDATE users SET password = $1, role = 'ADMIN', "is_active" = true, "updated_at" = NOW()
         WHERE email = $2`,
        [hashedPassword, email]
      );
      console.log('✅ Admin user updated!');
    } else {
      // Create new
      await client.query(
        `INSERT INTO users (id, email, name, password, role, "is_active", "email_verified", "created_at", "updated_at")
         VALUES (gen_random_uuid(), $1, $2, $3, 'ADMIN', true, true, NOW(), NOW())`,
        [email, name, hashedPassword]
      );
      console.log('✅ Admin user created!');
    }
    
    console.log('📧 Email:', email);
    console.log('\nYou can now login at /admin/login');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

createAdmin();
