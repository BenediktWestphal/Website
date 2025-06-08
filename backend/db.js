const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createProjectsTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT
    );
  `;
  try {
    await pool.query(queryText);
    console.log('Projects table created or already exists.');
  } catch (err) {
    console.error('Error creating projects table:', err);
    throw err; // Rethrow to be caught by server start
  }
};

module.exports = {
  pool,
  createProjectsTable,
  query: (text, params) => pool.query(text, params),
};
