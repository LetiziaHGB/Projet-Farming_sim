const db = require('../db');

class StockageDAO {
  static async getAll() {
    const result = await db.query('SELECT * FROM stockage');
    return result.rows;
  }

  static async getTotalQuantite() {
    const result = await db.query('SELECT SUM(quantite) AS total FROM stockage');
    return result.rows[0]?.total || 0;
  }

  static async ajouter(type, quantite) {
    await db.query(
      `INSERT INTO stockage (type_produit, quantite)
       VALUES ($1, $2)
       ON CONFLICT (type_produit)
       DO UPDATE SET quantite = stockage.quantite + $2`,
      [type, quantite]
    );
  }

  static async retirer(type, quantite) {
    await db.query('UPDATE stockage SET quantite = quantite - $1 WHERE type_produit = $2', [quantite, type]);
  }

  static async supprimer(type) {
    await db.query('DELETE FROM stockage WHERE type_produit = $1', [type]);
  }

  static async vendre(type, quantite) {
    await StockageDAO.retirer(type, quantite);
  }
}

module.exports = StockageDAO;
