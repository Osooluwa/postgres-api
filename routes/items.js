// routes/items.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

// POST /users - Add a new user
router.post('/users', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const newUser = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error('Error inserting user:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /users - Get all users
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /users/:id - Get user by ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
