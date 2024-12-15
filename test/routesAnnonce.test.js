import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import app from '../server/index.js';

process.env.PORT = 3002;

describe("Tests des routes d'Annonce", async () => {
  const agent = request.agent(app); // définit un agent pour conserver les cookies entre les requêtes
  const agent2 = request.agent(app); // définit un autre agent pour conserver les cookies entre les requêtes

  let compteTest;
  let autreCompteTest;
  let idannonce;
  let idAutreAnnonce;
  let annonceTest =  {
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
  };

  beforeAll(async () => {
  
    // ajout d'un compte pour les tests
    const data = {
      email : "emailTEST2@TEST.com",
      motdepasse : "mot de passe TEST"
    };
    
    const response = await request(app).post("/compte").send(data).set("Content-Type", "application/json");
    compteTest = response.body;
    
    // login du compte test par l'agent
    await agent .post("/compte/login").send(data).set("Content-Type", "application/json");

    // ajout d'un 2ème compte pour tester le 403
    const data2 = {
      email : "emailTEST3@TEST.com",
      motdepasse : "mot de passe TEST"
    };
    const response2 = await request(app).post("/compte").send(data2).set("Content-Type", "application/json");
    autreCompteTest = response2.body;

    // login du compte test par l'agent2
    await agent2 .post("/compte/login").send(data2).set("Content-Type", "application/json");
    
  })

  it("Test de la route post", async () => {

    // Ajout d'une annonce
    const response = await agent
      .post("/annonce")
      .send(annonceTest)
      .set("Content-Type", "application/json");

    // Récupère l'annonce créée pour les tests suivants
    idannonce = response.body.idannonce;

    // Assertions
    expect(response.status).toBe(201); // Vérifier le statut HTTP
    expect(response.body.nomannonce).toBe(annonceTest.nomannonce); // Vérifier les données retournées

    // Ajout d'une autre annonce par l'agent2
    const response2 = await agent2
    .post("/annonce")
    .send(annonceTest)
    .set("Content-Type", "application/json");

    idAutreAnnonce = response2.body.idannonce;
  });

  it("Test de la route get:id", async () => {
    // test récupération d'une annonce appartenant à l'agent
     const response = await agent.get(`/annonce/${idannonce}`);
     expect(response.status).toBe(200);
     expect(response.body.urloriginale).toBe("https://www.test.com");

     // Test de la protection de la ressource (accès avec agent à une annonce de agent2)
     const response2 = await agent.get(`/annonce/${idAutreAnnonce}`);
     expect(response2.status).toBe(403);
     
     /**
      * A faire + modifier la route pour renvoyer un 403
      */
  })

  it("Test de la route get", async () => {
    const response = await agent.get(`/annonce`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ idannonce: idannonce}),
        expect.objectContaining({ nomannonce: 'Test Annonce'}),
      ])
    );
  })

  it("Test de la route update", async () => {
    // Modifier les données de l'annonce pour le test
   
    annonceTest.nomannonce = `Titre de l'annonce Mise à Jour`;
    annonceTest.description = `Description de l'annonce Mise à Jour`;
    annonceTest.prix = 800000;
    annonceTest.piscine = true;

    // Utiliser supertest pour simuler une requête PUT 
    const response = await agent
      .put(`/annonce/${idannonce}`) 
      .send(annonceTest)
      .set("Content-Type", "application/json");

    // Assertions
    expect(response.status).toBe(200); // Vérifier le statut HTTP
    expect(response.body.nomannonce).toBe("Titre de l'annonce Mise à Jour"); 
    expect(parseInt(response.body.prix)).toBe(800000); 
  });

  it("Test de la route delete", async () => {
    const response = await agent
    .delete(`/annonce/${idannonce}`)
    .set("Content-Type", "application/json");

    expect(response.status).toBe(200);

    // récupérer cette annonce doit maintenant provoquer une erreur 404
    const response2 = await agent.get(`/annonce/${idannonce}`);
    expect(response2.status).toBe(404);


    // suppression de l'annonce de l'agent2
    const response3 = await agent2
    .delete(`/annonce/${idAutreAnnonce}`)
    .set("Content-Type", "application/json");

    expect(response3.status).toBe(200);



  })

  afterAll(async () => {
    // supprimer le compte test
    await agent  
    .delete(`/compte/${compteTest.idcompte}`)
    .set("Content-Type", "application/json");

    await agent2
    .delete(`/compte/${autreCompteTest.idcompte}`)
    .set("Content-Type", "application/json");
  })

});
