const db = require('../db');

class MachinesDAO {
  static async getAll() {
    const result = await db.query('SELECT * FROM machines');
    return result.rows;
  }

  static async reserver(id) {
    await db.query('UPDATE machines SET disponible = FALSE WHERE id = $1', [id]);
  }
}

module.exports = MachinesDAO;
