import { describe, expect, it } from 'vitest';
import { client } from '../server/bdd';
    

describe("Tests des fonctions de la BDD", () => {

  it("createAnnonce devrait insérer une nouvelle annonce", async () => {

    // Données factices pour tester la fonction
    const body = {
      titre: 'Test Annonce',
      url_annonce: 'https://www.test.com',
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
      lecompte: "thibault.malespine@orange.fr"
    };

    // Simuler une requête POST
    const response = await fetch("http://localhost:3000/annonce/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.text();
    console.log(data);
    
    expect(response.ok).toBe(true);
  }, 10000); // Augmentez le timeout à 10 secondes si nécessaire


  it("getAllAnnonces devrait retourner une liste non vide", async () => {
    console.log("Debut du test");
  
    // Simuler une requête GET
    const response = await fetch("http://localhost:3000/annonce/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    // Vérifier si la réponse est réussie (status 200)
    expect(response.ok).toBe(true);

  
    // Convertir la réponse en JSON
    const data = await response.json();
  
    // Vérifier que la liste d'annonces n'est pas vide
    expect(data.length).toBeGreaterThan(0);
    
    await client.connect();
    await client.query("DELETE FROM Annonce WHERE NomAnnonce = 'Test Annonce'");
    await client.end(); 
  }, 10000); // Augmentez le timeout à 10 secondes si nécessaire
});