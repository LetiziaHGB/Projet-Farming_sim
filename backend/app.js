const express = require('express');
const app = express();
const champsRoutes = require('./routes/champs');
const machinesRoutes = require('./routes/machines');
const stockageRoutes = require('./routes/stockage');
const usinesRoutes = require('./routes/usines');

app.use(express.json());
// Importation des routes
app.use('/champs', champsRoutes);
app.use('/machines', machinesRoutes);
app.use('/stockage', stockageRoutes);
app.use('/usines', usinesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
