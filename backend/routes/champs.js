const express = require('express');
const router = express.Router();
const { miseAJourEtat } = require('../models/champs');
const db = require('../db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM champs');
  res.json(rows);
});

router.post('/:id/action', async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  await db.query('UPDATE champs SET etat = ? WHERE id = ?', [action, id]);
  res.json({ message: `Action '${action}' appliquée au champ ${id}` });
});

router.post('/:id/evoluer', async (req, res) => {
  const { id } = req.params;
  const result = await miseAJourEtat(id);
  res.json(result);
});

router.post('/:id/fertiliser', async (req, res) => {
  const { id } = req.params;
  await db.query('UPDATE champs SET etat = ? WHERE id = ?', ['fertilisé', id]);
  res.json({ message: `Champ ${id} fertilisé, rendement augmenté de 50%` });
});


module.exports = router;
