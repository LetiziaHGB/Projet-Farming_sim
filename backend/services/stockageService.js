const StockageDAO = require('../dao/stockageDAO');

class StockageService {
  static async getAll() {
    return await StockageDAO.getAll();
  }

  static async ajouter(type, quantite) {
    await StockageDAO.ajouter(type_produit, quantite);
    return { message: `Ajouté : ${quantite}L de ${type}` };
  }

  static async vendre(type, quantite) {
    const stock = await StockageDAO.getAll()
    const produit = stock.find(item => item.type_produit === type_produit);

    if (!produit || produit.quantite < quantite) {
      return { erreur: 'Stock insuffisant.' };
    }

    await StockageDAO.vendre(type_produit, quantite);
    return { message: `${quantite}L de ${type} vendu pour ${gain} or` };
  }

  static async supprimer(type) {
    await StockageDAO.supprimer(type_produit);
    return { message: `${type} supprimé du stockage` };
  }

  static async getTotalQuantite() {
    return await StockageDAO.getTotalQuantite();
  } 
}

module.exports = StockageService;
