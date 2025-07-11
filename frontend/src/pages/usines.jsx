import { useEffect, useState } from 'react';
import axios from 'axios';

function Usines() {
  const [usines, setUsines] = useState([]);

  const actualiser = () => {
    axios.get('http://localhost:3000/usines')
      .then(res => setUsines(res.data));
  };

  const transformer = (id) => {
    axios.post(`http://localhost:3000/usines/${id}/transformer`)
      .then(res => alert(res.data.message))
      .catch(err => alert(err.response.data.erreur));
  };

  useEffect(actualiser, []);

  return (
    <div>
      <h2>Usines de transformation</h2>
      <ul>
        {usines.map(usine => (
          <li key={usine.id}>
            {usine.nom} — Produit : {usine.produit_sortie} ×{usine.multiplicateur}
            <button onClick={() => transformer(usine.id)}>Transformer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usines;
