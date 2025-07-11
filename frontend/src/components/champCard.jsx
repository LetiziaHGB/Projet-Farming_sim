import React from 'react';
import axios from 'axios';

function ChampCard({ champ, onUpdate }) {
  const { id, etat, culture } = champ;

  const handleAction = async (action, payload = {}) => {
    try {
      const res = await axios.post(`http://localhost:3000/champs/${id}/${action}`, payload);
      alert(res.data.message);
      onUpdate(); // actualise la liste des champs
    } catch (err) {
      alert(err.response?.data?.erreur || 'Erreur inconnue');
    }
  };

  const boutonAction = () => {
    switch (etat) {
      case 'récolté':
        return <button onClick={() => handleAction('labourer')}>🚜 Labourer</button>;
      case 'labouré':
        return (
          <button onClick={() => handleAction('semer', { culture: 'Blé' })}>
            🌱 Semer (Blé)
          </button>
        );
      case 'semé':
        return <button onClick={() => handleAction('fertiliser')}>🧪 Fertiliser</button>;
      case 'fertilisé':
      case 'prêt':
        return <button onClick={() => handleAction('recolter')}>🌾 Récolter</button>;
      default:
        return <span>⏳ En attente...</span>;
    }
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '12px',
      margin: '10px',
      borderRadius: '8px',
      backgroundColor: '#f8f8f8'
    }}>
      <h4>Champ #{id}</h4>
      <p>État actuel : <strong>{etat}</strong></p>
      <p>Culture : {culture || 'aucune'}</p>
      {boutonAction()}
    </div>
  );
}

export default ChampCard;
