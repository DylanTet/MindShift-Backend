import pkg, { Client, QueryResult } from 'pg'
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

export async function createNewUserInDB(userData: User, client: Client): Promise<void> {
  const queryText = 'INSERT INTO users(id, name, email) VALUES($1, $2, $3) RETURNING *';
  await client.query(queryText, [userData.id, userData.name, userData.email]);
}

export async function createCustomerTable(client: Client): Promise<void> {
  const sql = "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL, name VARCHAR NOT NULL, email VARCHAR NOT NULL, PRIMARY KEY (id))";
  await client.query(sql);
}

export async function getCustomerFromDB(id: number, client: Client): Promise<User> {
  const sql = "SELECT * FROM users WHERE id = $1";
  const data = await client.query(sql, [id]);
  return data.rows[0];
}

export function removeDataFromDB() {}
