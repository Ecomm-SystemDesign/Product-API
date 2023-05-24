const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'products',
  password: 'testing123',
  port: 5432
});

pool.connect()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log(error);
    console.log('Could not connect to database');
  })

  module.exports = pool;