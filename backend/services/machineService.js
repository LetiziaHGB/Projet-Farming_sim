const MachinesDAO = require('../dao/machinesDAO');

class MachineService {
  static async getAll() {
    return await MachinesDAO.getAll();
  }

  static async reserver(id) {
    await MachinesDAO.reserver(id);
    return { message: `Machine ${id} réservée.` };
  }
}

module.exports = MachineService;
