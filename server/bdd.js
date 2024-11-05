// Import des modules nécessaires
import mysql from 'mysql2/promise';

let connection;

export async function initializeDatabase() {
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'userpostgres',
      password: 'userpostgres',
      database: 'userpostgres',
    });
    console.log("Connexion à la base de données réussie");
  } catch (err) {
    console.error("Erreur de connexion à la base de données :", err);
    process.exit(1); // Arrête le serveur si la connexion échoue
  }
}

export function getConnection() {
  if (!connection) {
    throw new Error("La base de données n'est pas encore connectée.");
  }
  return connection;
}
