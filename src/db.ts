import pkg, { Client } from 'pg'
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

export async function addDataToUser(id: number, journalData: JournalEntry,
                                    moodData: MoodEntry, energyData: EnergyEntry,
                                    client: Client): Promise<void> {
  const queryText = `
    UPDATE users
    SET
      journal_entries = COALESCE(journal_entries, '{}') || ARRAY[$2::jsonb],
      mood_entries = COALESCE(mood_entries, '{}') || ARRAY[$3::jsonb],
      energy_entries = COALESCE(energy_entries, '{}') || ARRAY[$4::jsonb]
    WHERE id = $1
  `;

  await client.query(queryText, [id, journalData, moodData, energyData]);
} 

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
