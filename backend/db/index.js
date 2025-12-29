const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'user',
  host: 'postgres',
  database: process.env.POSTGRES_DB || 'portfolio',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};