// Import des modules nécessaires
import pg from 'pg'
const { Client } = pg
export const client = new Client({
  host: 'localhost',
  user: 'userpostgres',
  password: 'userpostgres',
  database: 'userpostgres',
  port: 5433,
})



export async function initializeDatabase() {
  try {
    await client.connect();
    console.log("Connexion à la base de données réussie");
  } catch (err) {
    console.error("Erreur de connexion à la base de données :", err);
    process.exit(1); // Arrête le serveur si la connexion échoue
  }
}
