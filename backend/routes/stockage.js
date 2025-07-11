const express = require('express');
const router = express.Router();
const controller = require('../controllers/stockageController');

router.get('/', controller.afficherStockage);
router.post('/ajouter', controller.ajouterProduit);
router.post('/vendre', controller.vendreProduit);
router.delete('/supprimer', controller.supprimerProduit);
router.get('/getTotalQuantite', controller.getTotalQuantiteProduit);

module.exports = router;
