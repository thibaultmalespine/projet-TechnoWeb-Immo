import { describe, expect, it } from 'vitest';

describe("Tests de la table Compte", () => {
    let compteTest = {};
    it("insertion dans la table", async () => {
        const data = {
            email : "emailTEST@TEST.com",
            motdepasse : "mot de passe TEST"
        }
        const response = await fetch("http://localhost:3000/compte/create", {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        });
        expect(response.status).toBe(201); 

        compteTest = await response.json();

        expect(compteTest).toHaveProperty("idcompte");
        expect(compteTest.email).toBe(data.email);
        expect(compteTest.motdepasse).toBe(data.motdepasse);       
    })

    it("connection au compte nouvellement crée", async () =>{
        const response = await fetch("http://localhost:3000/compte/login", {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                email : compteTest.email,
                motdepasse : compteTest.motdepasse
            })
        })

        expect(response.status).toBe(200);

        const compteConnecté = await response.json();
        expect(compteConnecté.idcompte).toBe(compteTest.idcompte);
    })

    it("modification du compte crée", async ()=>{
        const data = {
            idCompte : compteTest.idcompte,
            nom : "nomTest",
            prenom : "prenomTest",
            email : "emailModifiéTEST@TEST.com",
            motdepasse : "mot de passe modifé TEST"
        }

        const response = await fetch(`http://localhost:3000/compte/update`, {
            method : "PUT",
            headers : {"content-type" : "application/json"},
            body : JSON.stringify(data)
        })
        
        expect(response.status).toBe(200);
        
        const compteModifié = await response.json();
        //console.log(compteModifié);
        //console.log(data);
        expect(compteModifié.idcompte).toBe(data.idCompte);
        expect(compteModifié.nom).toBe(data.nom);
        expect(compteModifié.prenom).toBe(data.prenom);
        expect(compteModifié.email).toBe(data.email);
        expect(compteModifié.motdepasse).toBe(data.motdepasse);

    })
    
    it("suppression du compte crée", async () => {
        const response = await fetch(`http://localhost:3000/compte/delete/${compteTest.idcompte}`, {
            method : "DELETE",
            headers : {"content-type" : "application/json"}
        })

        expect(response.status).toBe(200);

        const compteSupprimé = await response.json();

        expect(compteSupprimé.idcompte).toBe(compteTest.idcompte);

        // on ne doit pas pouvoir récupérer le compte une fois supprimé
        const response2 = await fetch("http://localhost:3000/compte/login", {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                email : compteTest.email,
                motdepasse : compteTest.motdepasse
            })
        })

        expect(response2.status).toBe(404);
    })


});