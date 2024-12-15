import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../server/index.js';

process.env.PORT = 3001;

describe("Tests de la table Compte", () => {
    const agent = request.agent(app); // définit un agent pour conserver les cookies entre les requêtes
    let compteTest = {};
    const data = {
        email : "emailTEST@TEST.com",
        motdepasse : "mot de passe TEST"
    };

    
    it("Test de la route post /compte", async () => {

        const response = await agent 
            .post("/compte")
            .send(data)
            .set("Content-Type", "application/json");
        
        expect(response.status).toBe(201); 

        expect(response.body).toHaveProperty("idcompte");
        expect(response.body.email).toBe(data.email);
        expect(response.body.motdepasse).toBe(data.motdepasse);       
    });

    it("Test de la route post /compte/login", async () => {
        // Test 401 accès non authentifié
        // Une requête sur une ressource devrait renvoyer un 401 
        const accesNonAuthorisé = await request(app).get('/pages/mesAnnonces.html');
        expect(accesNonAuthorisé.status).toBe(401)

        // Authentification
        const response = await agent
            .post("/compte/login")
            .send(data)
            .set("Content-Type", "application/json");
        
        expect(response.status).toBe(200);
        compteTest = response.body;

        const compteConnecté = response.body;
        expect(compteConnecté.idcompte).toBe(compteTest.idcompte);

        // Une requête sur une ressource doit fonctionner maintenant
        const accesAuthorisé = await agent.get('/pages/mesAnnonces.html');
        expect(accesAuthorisé.status).toBe(200)
    });

    it("Test de la route put /compte", async () => {
        const data = {
            nom : "nomTest",
            prenom : "prenomTest",
            email : "emailModifiéTEST@TEST.com",
            motdepasse : "mot de passe modifié TEST"
        };

        const response = await agent  
            .put(`/compte/${compteTest.idcompte}`)
            .send(data)
            .set("Content-Type", "application/json");
        
        expect(response.status).toBe(200);
        
        const compteModifié = response.body;
   
        expect(compteModifié.idcompte).toBe(compteTest.idcompte);
        expect(compteModifié.nom).toBe(data.nom);
        expect(compteModifié.prenom).toBe(data.prenom);
        expect(compteModifié.email).toBe(data.email);
        expect(compteModifié.motdepasse).toBe(data.motdepasse);
    });

    it("Test de la route delete /compte", async () => {
        const response = await agent
            .delete(`/compte/${compteTest.idcompte}`)
            .set("Content-Type", "application/json");
        
        expect(response.status).toBe(200);

        // Vérification qu'on ne peut plus récupérer le compte après suppression
        const response2 = await agent  // Vérification de la réponse 404 après suppression
            .post("/compte/login")
            .send({
                email: compteTest.email,
                motdepasse: compteTest.motdepasse
            })
            .set("Content-Type", "application/json");

        expect(response2.status).toBe(404);
    });

});