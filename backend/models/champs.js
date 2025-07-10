const db = require('../db');

const DELAI_ACTION_MS = 30 * 1000;
const TEMPS_RECOLTE_MS = 2 * 60 * 1000;

async function miseAJourEtat(id) {
  const [[champ]] = await db.query('SELECT * FROM champs WHERE id = ?', [id]);
  if (!champ) return null;

  let nouvelEtat = '';
  const maintenant = Date.now();

  switch (champ.etat) {
    case 'récolté':
      nouvelEtat = 'labouré';
      break;
    case 'labouré':
      nouvelEtat = 'semé';
      await db.query('UPDATE champs SET date_semis = NOW() WHERE id = ?', [id]);
      break;
    case 'semé':
      const semisDate = new Date(champ.date_semis).getTime();
      if (maintenant - semisDate >= TEMPS_RECOLTE_MS) {
        nouvelEtat = 'prêt';
      } else {
        return { message: 'Culture pas encore prête à récolter' };
      }
      break;
    case 'fertilisé':
      nouvelEtat = 'prêt';
      break;
    case 'prêt':
      nouvelEtat = 'récolté';

      const [[culture]] = await db.query('SELECT * FROM cultures WHERE nom = ?', [champ.culture]);
      if (!culture) return { message: 'Culture non trouvée' };

      let quantite = culture.rendement;
      if (champ.etat === 'fertilisé') {
        quantite = Math.round(quantite * 1.5);
      }

      const [[stock]] = await db.query('SELECT SUM(quantite) AS total FROM stockage');
      if (stock.total + quantite > 100000) {
        return { blocage: true, message: 'Stockage saturé, récolte en pause' };
      }

      await db.query(
        'INSERT INTO stockage (type_produit, quantite) VALUES (?, ?) ON DUPLICATE KEY UPDATE quantite = quantite + ?',
        [champ.culture, quantite, quantite]
      );
      break;
    default:
      return { message: 'État inconnu ou aucune transition possible' };
  }

  return new Promise(resolve => {
    setTimeout(async () => {
      await db.query('UPDATE champs SET etat = ? WHERE id = ?', [nouvelEtat, id]);
      resolve({ message: `Champ ${id} passé à l'état ${nouvelEtat}` });
    }, DELAI_ACTION_MS);
  });
}

module.exports = { miseAJourEtat };
