const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db",
  waitForConnections: true,
  connectionLimit: 10,
  port: 3306,
  queueLimit: 0
});

module.exports = pool;  // ✅ this was missing
