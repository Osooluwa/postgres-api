// db.js
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Remove if local only
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL DB');
});

pool.on('error', (err) => {
  console.error('PostgreSQL connection error:', err.message);
});

export default pool;
