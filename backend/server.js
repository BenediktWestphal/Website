const express = require('express');
const cors = require('cors'); // Import cors
const { pool, createProjectsTable, query } = require('./db');
require('dotenv').config();

const app = express();
const frontendUrl = process.env.VITE_API_BASE_URL;

app.use(cors({
  origin: frontendUrl,
  methods: ['GET', 'POST'],
  credentials: true,
}));

 // Default CORS configuration allows all origins

// Middleware to parse JSON bodies
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample projects data
const sampleProjects = [
  { id: 1, name: 'Project Alpha', description: 'This is the first sample project.' },
  { id: 2, name: 'Project Beta', description: 'A description for Project Beta.' },
  { id: 3, name: 'Project Gamma', description: 'Exploring new ideas with Project Gamma.' },
];

// GET route for /api/projects
app.get('/api/projects', async (req, res) => {
  try {
    const result = await query('SELECT * FROM projects ORDER BY id ASC');
    if (result.rows.length === 0) {
      // If the table is empty, return sample projects
      // In a real application, you might want to insert these samples into the DB
      // or have a more sophisticated way to handle initial data.
      return res.json(sampleProjects);
    }
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server and connect to database
const startServer = async () => {
  try {
    // Test the database connection
    await pool.connect();
    console.log('Connected to PostgreSQL database.');
    // Create projects table if it doesn't exist
    await createProjectsTable();

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to the database or start server:', err);
    process.exit(1); // Exit if DB connection fails
  }
};

startServer();
