import { describe, expect, it } from 'vitest';
import { client } from '../server/bdd';
import Annonce from '../server/modeles/modeleAnnonce.js';
    

describe("Tests des fonctions de la BDD", () => {

  // Annule la transaction après chaque test pour isoler les données
  afterEach(async () => {
    await client.query('ROLLBACK');
  });

  it("create devrait insérer une nouvelle annonce", async () => {
    // Préparation des données de test
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
      lecompte: "armandlecourt2003@gmail.com",
    };

    // Appelle la méthode create pour insérer les données
    const result = await Annonce.create(body);

    // Vérifie que l'annonce a bien été créée avec les bonnes données
    expect(result).toBeDefined();
    expect(result.NomAnnonce).toBe(body.titre);
    expect(result.URLOriginale).toBe(body.url_annonce);
    expect(result.Description).toBe(body.description);
    expect(result.TypeDeBien).toBe(body.type);
    expect(result.CodePostal).toBe(body.codep);
    expect(result.NomVille).toBe(body.ville);
    expect(result.Prix).toBe(body.prix);
    expect(result.M2Habitable).toBe(body.m2_habitable);
    expect(result.M2Terrains).toBe(body.m2_terrain);
    expect(result.Meuble).toBe(body.meuble);
    expect(result.ParticulierPro).toBe(body.particulier_pro);
    expect(result.Garage).toBe(body.garage);
    expect(result.Piscine).toBe(body.piscine);
    expect(result.LeCompte).toBe(body.lecompte);
  });
});















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