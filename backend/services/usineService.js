const db = require('../db');

class UsineService {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM usines');
    return rows;
  }

  static async transformer(id) {
    const [[usine]] = await db.query('SELECT * FROM usines WHERE id = ?', [id]);
    const intrants = usine.intrants.split(',').map(i => i.trim());
    const produit = usine.produit_sortie;
    const sortie = 100 * usine.multiplicateur;

    for (const item of intrants) {
      const [[stock]] = await db.query('SELECT quantite FROM stockage WHERE type_produit = ?', [item]);
      if (!stock || stock.quantite < 100) return { erreur: `Intrant insuffisant : ${item}` };
    }

    const total = await StockageService.getTotalQuantite();
    if (total + sortie > 100000) return { erreur: 'Stockage saturé, usine en pause' };


    for (const item of intrants) {
      await db.query('UPDATE stockage SET quantite = quantite - 100 WHERE type_produit = ?', [item]);
    }

    await db.query(
      'INSERT INTO stockage (type_produit, quantite) VALUES (?, ?) ON DUPLICATE KEY UPDATE quantite = quantite + ?',
      [produit, sortie, sortie]
    );

    return { message: `${usine.nom} a produit ${sortie}L de ${produit}` };
  }
}

module.exports = UsineService;
