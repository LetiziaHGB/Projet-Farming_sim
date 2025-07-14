const { Pool } = require('pg');

const pool = new Pool({
  host: 'pgpool',    
  user: 'postgres',
  password: 'postgrespass',
  database: 'ferme_db',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
