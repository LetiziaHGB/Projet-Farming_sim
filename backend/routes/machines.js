const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM machines');
  res.json(rows);
});

router.post('/:id/reserver', async (req, res) => {
  const { id } = req.params;
  await db.query('UPDATE machines SET disponible = FALSE WHERE id = ?', [id]);
  res.json({ message: `Machine ${id} réservée.` });
});

module.exports = router;
