import { describe, expect, it } from 'vitest';

describe("Tests de la table Compte", () => {
    let compteTest = {};
    it("insertion dans la table", async () => {
        const data = {
            email : "emailTEST@TEST.com",
            motDePasse : "mot de passe TEST"
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
        expect(compteTest.motdepasse).toBe(data.motDePasse);       
    })

    it("connection au compte nouvellement crée", async () =>{
        const response = await fetch("http://localhost:3000/compte/login", {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                email : compteTest.email,
                motDePasse : compteTest.motdepasse
            })
        })

        expect(response.status).toBe(200);

        const compteConnecté = await response.json();
        expect(compteConnecté.idcompte).toBe(compteTest.idcompte);

    })
    
    it("suppression du compte crée", async () => {
        const response = await fetch(`http://localhost:3000/compte/delete/${compteTest.idcompte}`, {
            method : "DELETE",
            headers : {"content-type" : "application/json"}
        })

        expect(response.status).toBe(200);

        const compteSupprimé = await response.json();

        expect(compteSupprimé.idcompte).toBe(compteTest.idcompte);
    })


});