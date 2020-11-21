const mysql = require('mysql');
const migration = require('mysql-migrations');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'M@nvi0712',
  database: 'erp_v1'
});

migration.init(connection, __dirname, () => {
  console.log('finished running migrations');
});
