const UsineService = require('../services/usineService');

exports.transformerUsine = async (req, res) => {
  res.json(await UsineService.transformer(req.params.id));
};

exports.listerUsines = async (req, res) => {
  res.json(await UsineService.getAll());
};
