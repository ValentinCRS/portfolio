// Import PostgreSQL connection pool
const { Pool } = require('pg');

// Load environment variables from the .env file
require('dotenv').config();

// Create a new PostgreSQL connection pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// DO NOT call process.exit() here!
// This test query ensures the database connection is working
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database test error:', err.message);
  } else {
    console.log('✅ Database connection confirmed at:', res.rows[0].now);
  }
});

// Export a reusable query function
module.exports = {
  query: (text, params) => pool.query(text, params),
};
