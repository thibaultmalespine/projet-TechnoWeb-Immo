// Import des modules nécessaires
import pg from 'pg';
const { Client } = pg
export const client = new Client({
  host: 'localhost',
  user: 'userpostgres',
  password: 'userpostgres',
  database: 'userpostgres',
  port: 5433,
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
