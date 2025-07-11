const ChampService = require('../services/champService');

exports.getAllChamps = async (req, res) => {
  const champs = await ChampService.getAll();
  res.json(champs);
};

exports.labourerChamp = async (req, res) => {
  res.json(await ChampService.labourerChamp(req.params.id));
};

exports.semerChamp = async (req, res) => {
  const { culture } = req.body;
  res.json(await ChampService.semerChamp(req.params.id, culture));
};

exports.fertiliserChamp = async (req, res) => {
  res.json(await ChampService.fertiliserChamp(req.params.id));
};

exports.recolterChamp = async (req, res) => {
  res.json(await ChampService.recolterChamp(req.params.id));
};
