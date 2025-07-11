const db = require('../db');

class StockageService {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM stockage');
    return rows;
  }

  static async ajouter(type, quantite) {
    await db.query(
      'INSERT INTO stockage (type_produit, quantite) VALUES (?, ?) ON DUPLICATE KEY UPDATE quantite = quantite + ?',
      [type, quantite, quantite]
    );
    return { message: `Ajouté : ${quantite}L de ${type}` };
  }

  static async vendre(type, quantite) {
    const [[stock]] = await db.query('SELECT quantite FROM stockage WHERE type_produit = ?', [type]);
    if (!stock || stock.quantite < quantite) return { erreur: 'Stock insuffisant' };

    const gain = quantite;
    await db.query('UPDATE stockage SET quantite = quantite - ? WHERE type_produit = ?', [quantite, type]);
    await db.query('INSERT INTO historique (action, quantite, or_gagne) VALUES (?, ?, ?)', ['vente', quantite, gain]);

    return { message: `${quantite}L de ${type} vendu pour ${gain} or` };
  }

  static async supprimer(type) {
    await db.query('DELETE FROM stockage WHERE type_produit = ?', [type]);
    return { message: `${type} supprimé du stockage` };
  }

  static async getTotalQuantite() {
    const [[result]] = await db.query('SELECT SUM(quantite) AS total FROM stockage');
    return result.total || 0;
  } 
}

module.exports = StockageService;
