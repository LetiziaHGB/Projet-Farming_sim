import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChampCard from '../composants/ChampCard';

function Champs() {
  const [champs, setChamps] = useState([]);

  const chargerChamps = () => {
    axios.get('http://localhost:3000/champs')
      .then(res => setChamps(res.data));
  };

  useEffect(chargerChamps, []);

  return (
    <div>
      <h2>🌿 Gestion des Champs</h2>
      {champs.length === 0 && <p>Aucun champ enregistré.</p>}
      {champs.map(champ => (
        <ChampCard key={champ.id} champ={champ} onUpdate={chargerChamps} />
      ))}
    </div>
  );
}

export default Champs;
