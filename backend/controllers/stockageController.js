const StockageService = require('../services/stockageService');

exports.afficherStockage = async (req, res) => {
  res.json(await StockageService.getAll());
};

exports.ajouterProduit = async (req, res) => {
  const { type_produit, quantite } = req.body;
  res.json(await StockageService.ajouter(type_produit, quantite));
};

exports.vendreProduit = async (req, res) => {
  const { type_produit, quantite } = req.body;
  res.json(await StockageService.vendre(type_produit, quantite));
};

exports.supprimerProduit = async (req, res) => {
  const { type_produit } = req.body;
  res.json(await StockageService.supprimer(type_produit));
};

exports.getTotalQuantiteProduit = async (req, res) => {
  const { quantite } = req.body;
  res.json(await StockageService.getTotalQuantite(quantite));
};
