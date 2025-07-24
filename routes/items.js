// routes/items.js
// routes/items.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'List of items' });
});



// GET all items
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create item
router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO items (name, quantity) VALUES ($1, $2) RETURNING *',
      [name, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add PUT & DELETE similarly...

export default router;
