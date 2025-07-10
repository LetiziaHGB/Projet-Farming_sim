const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/:id/transformer', async (req, res) => {
  const { id } = req.params;
  const [[usine]] = await db.query('SELECT * FROM usines WHERE id = ?', [id]);

  const intrants = usine.intrants.split(',');
  const sortie = 100 * usine.multiplicateur;
  const produit = usine.produit_sortie;

  for (const item of intrants) {
    const [[stock]] = await db.query('SELECT quantite FROM stockage WHERE type_produit = ?', [item.trim()]);
    if (!stock || stock.quantite < 100) {
      return res.status(400).json({ erreur: `Intrant insuffisant : ${item}` });
    }
  }

  const [[totalStock]] = await db.query('SELECT SUM(quantite) AS total FROM stockage');
  if (totalStock.total + sortie > 100000) {
    return res.status(400).json({ erreur: 'Stockage plein, usine en pause.' });
  }

  for (const item of intrants) {
    await db.query('UPDATE stockage SET quantite = quantite - 100 WHERE type_produit = ?', [item.trim()]);
  }

  await db.query(
    'INSERT INTO stockage (type_produit, quantite) VALUES (?, ?) ON DUPLICATE KEY UPDATE quantite = quantite + ?',
    [produit, sortie, sortie]
  );

  res.json({ message: `${usine.nom} a produit ${sortie}L de ${produit}` });
});

module.exports = router;
