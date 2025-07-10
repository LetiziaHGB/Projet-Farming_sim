import { useEffect, useState } from 'react';
import axios from 'axios';

function Champs() {
  const [champs, setChamps] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/champs')
      .then(res => setChamps(res.data));
  }, []);

  return (
    <div>
      <h2>Gestion des Champs</h2>
      <ul>
        {champs.map(champ => (
          <li key={champ.id}>
            Champ #{champ.id} — État : {champ.etat} — Culture : {champ.culture}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Champs;
