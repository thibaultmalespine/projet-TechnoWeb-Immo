import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../server/index.js';

process.env.PORT = 3001;

let compteTest = {};
describe("Tests de la table Compte", () => {

    
    it("Test route post /compte", async () => {
        const data = {
            email : "emailTEST@TEST.com",
            motdepasse : "mot de passe TEST"
        };
        
        const response = await request(app) 
            .post("/compte")
            .send(data)
            .set("Content-Type", "application/json");
        
        expect(response.status).toBe(201); 

        compteTest = response.body;

        expect(compteTest).toHaveProperty("idcompte");
        expect(compteTest.email).toBe(data.email);
        expect(compteTest.motdepasse).toBe(data.motdepasse);       
    });

    it("Test de la route post /compte/login", async () => {
        const response = await request(app)
            .post("/compte/login")
            .send({
                email: compteTest.email,
                motdepasse: compteTest.motdepasse
            })
            .set("Content-Type", "application/json");
        
        expect(response.status).toBe(200);

        const compteConnecté = response.body;
        expect(compteConnecté.idcompte).toBe(compteTest.idcompte);
    });

    it("Test de la route put /compte", async () => {
        const data = {
            nom : "nomTest",
            prenom : "prenomTest",
            email : "emailModifiéTEST@TEST.com",
            motdepasse : "mot de passe modifié TEST"
        };

        const response = await request(app)  
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
        const response = await request(app)
            .delete(`/compte/${compteTest.idcompte}`)
            .set("Content-Type", "application/json");
        
        expect(response.status).toBe(200);

        // Vérification qu'on ne peut plus récupérer le compte après suppression
        const response2 = await request(app)  // Vérification de la réponse 404 après suppression
            .post("/compte/login")
            .send({
                email: compteTest.email,
                motdepasse: compteTest.motdepasse
            })
            .set("Content-Type", "application/json");

        expect(response2.status).toBe(404);
    });

});