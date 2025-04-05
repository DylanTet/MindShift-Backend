import pkg from 'pg'
const { Pool } = pkg;
import dotenv from 'dotenv'

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 3000
});

function createNewUserInDB(userName: string, userEmail: string) {
  try {
    const queryText = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *';
    const res = pool.query(queryText, [userName, userEmail]);
  } catch {
    console.log("There was an error trying to create user")
  }
  
}

function addToDatabase() {}

function removeDataFromDB() {}
