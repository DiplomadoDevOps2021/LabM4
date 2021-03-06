const dotenv = require('dotenv');
const pgp = require('./pgp.js');

dotenv.config()

const connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
}

const db = pgp(connection); // database instance;
module.exports = db;
