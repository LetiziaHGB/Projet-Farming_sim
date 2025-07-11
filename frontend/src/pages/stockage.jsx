import { useEffect, useState } from 'react';
import axios from 'axios';
import barreStockage from '../composants/barreStockage';

function Stockage() {
  const [stock, setStock] = useState([]);
  const totalQuantite = stock.reduce((acc, item) => acc + item.quantite, 0);

  useEffect(() => {
    axios.get('http://localhost:3000/stockage')
      .then(res => setStock(res.data));
  }, []);

  return (
    <div>
      <h2> État du Stockage</h2>
      <ul>
        {stock.map((item, index) => (
          <li key={index}>
            {item.type_produit} : {item.quantite} L
          </li>
          <barreStockage quantiteTotale={totalQuantite} />
        ))}
      </ul>
    </div>
  );
}

export default Stockage;
