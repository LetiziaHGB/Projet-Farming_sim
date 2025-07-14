const UsinesDAO = require('../dao/usinesDAO');
const StockageDAO = require('../dao/stockageDAO');

class UsineService {
  static async getAll() {
    return await UsinesDAO.getAll();
  }

  static async transformer(id) {
    const usine = await UsinesDAO.getById(id);
    const intrants = usine.intrants.split(',').map(i => i.trim());
    const produit = usine.produit_sortie;
    const sortie = 100 * usine.multiplicateur;

    for (const item of intrants) {
      const stock = await StockageDAO.getAll();
      const ligne = stock.find(s => s.type_produit === item);
      if (!ligne || ligne.quantite < 100) {
        return { erreur: `Intrant insuffisant : ${item}` };
      }
    }

    const total = await StockageDAO.getTotalQuantite();
    if (total + sortie > 100000) return { erreur: 'Stockage saturé, usine en pause' };


    for (const item of intrants) {
      await StockageDAO.retirer(item, 100);
    }

    await StockageDAO.ajouter(produit, sortie);
    return { message: `${usine.nom} a produit ${sortie}L de ${produit}` };
  }
}

module.exports = UsineService;
