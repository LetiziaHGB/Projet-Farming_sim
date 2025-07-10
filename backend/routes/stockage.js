const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM stockage');
  res.json(rows);
});

router.post('/ajouter', async (req, res) => {
  const { type_produit, quantite } = req.body;
  await db.query(
    'INSERT INTO stockage (type_produit, quantite) VALUES (?, ?) ON DUPLICATE KEY UPDATE quantite = quantite + ?',
    [type_produit, quantite, quantite]
  );
  res.json({ message: 'Produit ajouté au stockage.' });
});

router.delete('/supprimer', async (req, res) => {
  const { type_produit } = req.body;

  await db.query('DELETE FROM stockage WHERE type_produit = ?', [type_produit]);

  res.json({ message: `${type_produit} supprimé du stockage.` });
});

router.post('/vendre', async (req, res) => {
  const { type_produit, quantite } = req.body;

  const [[stock]] = await db.query('SELECT quantite FROM stockage WHERE type_produit = ?', [type_produit]);
  if (!stock || stock.quantite < quantite) {
    return res.status(400).json({ erreur: 'Quantité insuffisante à vendre.' });
  }

  const or_gagne = quantite; // 1L = 1 or
  await db.query('UPDATE stockage SET quantite = quantite - ? WHERE type_produit = ?', [quantite, type_produit]);

  await db.query('INSERT INTO historique (action, quantite, or_gagne) VALUES (?, ?, ?)', ['vente', quantite, or_gagne]);

  res.json({ message: `${quantite}L de ${type_produit} vendu pour ${or_gagne} pièces d’or.` });
});

module.exports = router;
