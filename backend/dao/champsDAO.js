const db = require('../db');

class ChampsDAO {
  static async getAll() {
    const result = await db.query('SELECT * FROM champs');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM champs WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async updateEtat(id, etat) {
    await db.query('UPDATE champs SET etat = $1 WHERE id = $2', [etat, id]);
  }

  static async updateCulture(id, culture) {
    await db.query('UPDATE champs SET culture = $1 WHERE id = $2', [culture, id]);
  }

  static async updateDateSemis(id) {
    await db.query('UPDATE champs SET date_semis = NOW() WHERE id = $1', [id]);
  }

  static async resetChamp(id) {
    await db.query('UPDATE champs SET etat = $1, culture = NULL, date_semis = NULL WHERE id = $2', ['récolté', id]);
  }
}

module.exports = ChampsDAO;
