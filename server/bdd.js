// Import des modules nécessaires
import pg from 'pg';
const { Client } = pg
export const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'userpostgres',
  password: process.env.DB_PASSWORD || 'userpostgres',
  database: process.env.DB_NAME || 'userpostgres',
  port: process.env.DB_PORT || 5432,
})


/**
 * Fonction qui initialise la connexion à la base de donnée
 */
export async function initializeDatabase() {
  try {
    await client.connect();
    console.log("Connexion à la base de données réussie");
  } catch (err) {
    console.error("Erreur de connexion à la base de données :", err);
  }
}
