import React from 'react';

function BarreStockage({ quantiteTotale, capaciteMax = 100000 }) {
  const pourcentage = Math.min(100, (quantiteTotale / capaciteMax) * 100);

  return (
    <div style={{ margin: '20px 0' }}>
      <p> Remplissage du stockage : {quantiteTotale} / {capaciteMax} L ({pourcentage.toFixed(1)}%)</p>
      <div style={{
        width: '100%',
        height: '20px',
        backgroundColor: '#eee',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${pourcentage}%`,
          height: '100%',
          backgroundColor: pourcentage > 90 ? 'red' : '#4caf50',
          transition: 'width 0.5s ease'
        }}></div>
      </div>
    </div>
  );
}

export default BarreStockage;
