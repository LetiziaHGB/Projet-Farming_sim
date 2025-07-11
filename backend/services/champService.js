const db = require('../db');
const DELAI_ACTION = 30 * 1000;
const TEMPS_RECOLTE_MS = 2 * 60 * 1000;
class ChampService {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM champs');
    return rows;
  }

  static async getById(id) {
    const [[champ]] = await db.query('SELECT * FROM champs WHERE id = ?', [id]);
    return champ;
  }

  static async labourerChamp(id) {
    const champ = await ChampService.getById(id);
    if (champ.etat !== 'récolté') return { erreur: 'Le champ doit être récolté avant labourage.' };

    return new Promise(resolve => {
      setTimeout(async () => {
        await db.query('UPDATE champs SET etat = ? WHERE id = ?', ['labouré', id]);
        resolve({ message: `Champ ${id} labouré.` });
      }, DELAI_ACTION);
    });
  }

  static async semerChamp(id, culture) {
    const champ = await ChampService.getById(id);
    if (champ.etat !== 'labouré') return { erreur: 'Le champ doit être labouré avant semis.' };

    return new Promise(resolve => {
      setTimeout(async () => {
        await db.query('UPDATE champs SET etat = ?, culture = ?, date_semis = NOW() WHERE id = ?',
          ['semé', culture, id]);
        resolve({ message: `Champ ${id} semé avec la culture ${culture}.` });
      }, DELAI_ACTION);
    });
  }

  static async fertiliserChamp(id) {
    const champ = await ChampService.getById(id);
    if (champ.etat !== 'semé') return { erreur: 'Le champ doit être semé pour être fertilisé.' };

    return new Promise(resolve => {
      setTimeout(async () => {
        await db.query('UPDATE champs SET etat = ? WHERE id = ?', ['fertilisé', id]);
        resolve({ message: `Champ ${id} fertilisé. Rendement augmenté de 50%.` });
      }, DELAI_ACTION);
    });
  }

  static async recolterChamp(id) {
    const champ = await ChampService.getById(id);
    if (!['prêt', 'fertilisé'].includes(champ.etat)) return { erreur: 'Le champ n’est pas prêt à être récolté.' };

    const [[culture]] = await db.query('SELECT rendement FROM cultures WHERE nom = ?', [champ.culture]);
    let rendement = culture?.rendement || 0;
    if (champ.etat === 'fertilisé') rendement = Math.round(rendement * 1.5);

    const [[stock]] = await db.query('SELECT SUM(quantite) AS total FROM stockage');
    if (stock.total + rendement > 100000) return { blocage: true, message: 'Stockage saturé. Récolte suspendue.' };

    return new Promise(resolve => {
      setTimeout(async () => {
        await db.query('UPDATE champs SET etat = ?, culture = NULL, date_semis = NULL WHERE id = ?', ['récolté', id]);
        await db.query(
          'INSERT INTO stockage (type_produit, quantite) VALUES (?, ?) ON DUPLICATE KEY UPDATE quantite = quantite + ?',
          [champ.culture, rendement, rendement]
        );
        resolve({ message: `Champ ${id} récolté. ${rendement}L ajoutés au stockage.` });
      }, DELAI_ACTION);
    });
  }
}

module.exports = ChampService;
