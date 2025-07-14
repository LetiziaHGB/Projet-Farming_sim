const ChampsDAO = require('../dao/champsDAO');
const StockageDAO = require('../dao/stockageDAO');

const DELAI_ACTION = 30000;
const TEMPS_RECOLTE_MS = 2 * 60 * 1000;

class ChampService {
  static async getAll() {
    return await ChampsDAO.getAll();;
  }

  static async getById(id) {
    return await ChampsDAO.getById(id);
  }

  static async updateEtat(id, nouvelEtat) {
    const avant = await ChampService.getById(id);
    await ChampsDAO.updateEtat(id, nouvelEtat);
    const apres = await ChampService.getById(id);
    return { avant, apres };
  }

  static async labourerChamp(id) {
    const champ = await ChampService.getById(id);
    if (champ.etat !== 'récolté') return { erreur: 'Le champ doit être récolté avant labourage.' };

    return new Promise(resolve => {
      setTimeout(async () => {
        await ChampsDAO.updateEtat(id, 'labouré');
        resolve({ message: `Champ ${id} labouré.` });
      }, DELAI_ACTION);
    });
  }

  static async semerChamp(id, culture) {
    const champ = await ChampService.getById(id);
    if (champ.etat !== 'labouré') return { erreur: 'Le champ doit être labouré avant semis.' };

    return new Promise(resolve => {
      setTimeout(async () => {
        await ChampsDAO.updateEtat(id, 'semé');
        await ChampsDAO.updateCulture(id, culture);
        await ChampsDAO.updateDateSemis(id);
        resolve({ message: `Champ ${id} semé avec la culture ${culture}.` });
      }, DELAI_ACTION);
    });
  }

  static async fertiliserChamp(id) {
    const champ = await ChampService.getById(id);
    if (champ.etat !== 'semé') return { erreur: 'Le champ doit être semé pour être fertilisé.' };

    return new Promise(resolve => {
      setTimeout(async () => {
        await ChampsDAO.updateEtat(id, 'fertilisé');
        resolve({ message: `Champ ${id} fertilisé. Rendement augmenté de 50%.` });
      }, DELAI_ACTION);
    });
  }

  static async recolterChamp(id) {
    const champ = await ChampService.getById(id);
    if (!['prêt', 'fertilisé'].includes(champ.etat)) return { erreur: 'Le champ n’est pas prêt à être récolté.' };

    const culture = await CulturesDAO.getByNom(champ.culture);
    let rendement = culture?.rendement || 0;
    if (champ.etat === 'fertilisé') rendement = Math.round(rendement * 1.5);

    const totalStock = await StockageDAO.getTotalQuantite();
    if (totalStock + rendement > 100000) return { blocage: true, message: 'Stockage saturé.' };

    return new Promise(resolve => {
      setTimeout(async () => {
        await ChampsDAO.resetChamp(id);
        await StockageDAO.ajouter(champ.culture, rendement);
        resolve({ message: `Champ ${id} récolté. ${rendement}L ajoutés au stockage.` });
      }, DELAI_ACTION);
    });
  }
}

module.exports = ChampService;
