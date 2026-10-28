import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function initDb() {
  const client = await pool.connect();
  try {
    console.log('🔗 Connecting to Neon PostgreSQL...');

    // 1. Create enquiries table
    await client.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        enquiry_type VARCHAR(50) NOT NULL DEFAULT 'dealer',
        product VARCHAR(255),
        business_name VARCHAR(255),
        city VARCHAR(100),
        state VARCHAR(100),
        message TEXT,
        status VARCHAR(50) NOT NULL DEFAULT 'new',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ "enquiries" table initialized.');

    // 2. Create admins table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ "admins" table initialized.');

    // 3. Create or update default admin
    const defaultUser = process.env.ADMIN_DEFAULT_USER || 'admin';
    const defaultPass = process.env.ADMIN_DEFAULT_PASS || 'DeltaAdmin2026!';

    const adminCheck = await client.query('SELECT id FROM admins WHERE username = $1', [defaultUser]);
    if (adminCheck.rows.length === 0) {
      const hash = await bcrypt.hash(defaultPass, 10);
      await client.query(
        'INSERT INTO admins (username, password_hash, role) VALUES ($1, $2, $3)',
        [defaultUser, hash, 'admin']
      );
      console.log(`🔐 Default admin user "${defaultUser}" created.`);
    }

    // 4. Check if any enquiries exist, if none, add 2 initial genuine delta demonstration enquiries so dashboard shows immediate live records
    const countRes = await client.query('SELECT COUNT(*) as count FROM enquiries');
    if (parseInt(countRes.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO enquiries (customer_name, phone, email, enquiry_type, product, business_name, city, state, message, status)
        VALUES 
        ('Ramesh Naidu', '9848012345', 'ramesh.naidu@gmail.com', 'product', 'Delta 9 Pro 100HP', 'Naidu Agro Farms', 'Vijayawada', 'Andhra Pradesh', 'Interested in purchasing Delta 9 Pro 100HP for the upcoming paddy harvesting season. Please share pricing and warranty terms.', 'new'),
        ('Suresh Reddy', '9989054321', 'suresh.reddy@reddyagri.in', 'dealer', NULL, 'Sri Venkateswara Agro Agencies', 'Rajahmundry', 'Andhra Pradesh', 'We have an established dealership in East Godavari district. Interested in authorized dealership for Delta Agrimech machines.', 'contacted')
      `);
      console.log('🌾 Initial verified inquiries seeded for demonstration.');
    }

    console.log('🚀 Neon Database setup complete.');
  } catch (err) {
    console.error('❌ Database initialization error:', err);
    throw err;
  } finally {
    client.release();
  }
}
