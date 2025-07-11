const db = require('../db');

class MachineService {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM machines');
    return rows;
  }
  static async reserver(id) {
    await db.query('UPDATE machines SET disponible = FALSE WHERE id = ?', [id]);
    return { message: `Machine ${id} réservée.` };
  }
}

module.exports = MachineService;
