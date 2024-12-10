import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../server/index.js';

process.env.PORT = 3002;

describe("Tests des routes d'Annonce", async () => {
  let compteTest;
  let annonceTest;
  
    const data = {
      email : "emailTEST2@TEST.com",
      motdepasse : "mot de passe TEST"
    };
    
    compteTest = await request(app) 
      .post("/compte")
      .send(data)
      .set("Content-Type", "application/json");
  
 
  it("Test de la route submit pour insérer une annonce", async () => {
    // Préparation des données de test
    const body = {
      nomannonce: 'Test Annonce',
      urloriginale: 'https://www.test.com',
      description: 'Test description',
      type: 'Maison',
      codep: '81000',
      ville: 'Albi',
      prix: 500000,
      m2_habitable: 120,
      m2_terrain: 200,
      meuble: true,
      particulier_pro: 'Particulier',
      garage: true,
      piscine: false,
      lecompte: "emailTEST2@TEST.com",
    };

    // Utiliser supertest pour simuler une requête POST
    const response = await request(app)
      .post("/annonce")
      .send(body)
      .set("Content-Type", "application/json");

    // Récupère l'annonce créée pour les tests suivants
    annonceTest = response.body;

    // Assertions
    expect(response.status).toBe(201); // Vérifier le statut HTTP
    expect(response.body.nomannonce).toBe(body.nomannonce); // Vérifier les données retournées
  });

  it("Test de la route update", async () => {
    // Modifier les données de l'annonce pour le test
    annonceTest.nomannonce = `Titre de l'annonce Mise à Jour`;
    annonceTest.description = `Description de l'annonce Mise à Jour`;
    annonceTest.prix = 800000;
    annonceTest.piscine = true;

    // Utiliser supertest pour simuler une requête PUT 
    const response = await request(app)
      .put("/annonce/update") 
      .send(annonceTest)
      .set("Content-Type", "application/json");

    // Assertions
    expect(response.status).toBe(200); // Vérifier le statut HTTP
    expect(response.body.nomannonce).toBe("Titre de l'annonce Mise à Jour"); 
    expect(parseInt(response.body.prix)).toBe(800000); 
  });


    await request(app)
    .delete(`/compte/delete/${compteTest.idcompte}`)
    .set("Content-Type", "application/json");

});
