const MachineService = require('../services/machineService');

exports.getAllMachines = async (req, res) => {
  res.json(await MachineService.getAll());
};

exports.reserverMachine = async (req, res) => {
  res.json(await MachineService.reserver(req.params.id));
};
