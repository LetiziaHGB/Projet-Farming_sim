const db = require('../db');

class UsinesDAO {
  static async getAll() {
    const result = await db.query('SELECT * FROM usines');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM usines WHERE id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = UsinesDAO;
