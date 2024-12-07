import { describe, expect, it } from 'vitest';
import { client } from '../server/bdd';
import Annonce from '../server/modeles/modeleAnnonce.js';
    

describe("Tests des routes d'Annonce", () => {

  it("Test de la route submit pour insérer une annonce", async () => {
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


    // Simuler une requête POST
    const response = await fetch("http://localhost:3000/annonce/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.text();
    //console.log(data);


    //const submitData = await response.json();
    //const annonceId = submitData.id; // Récupère l'ID de l'annonce créée pour le test update et delete

    //console.log(annonceId)
    
    expect(response.ok).toBe(true);
  }, 10000); // Augmentez le timeout à 10 secondes si nécessaire












  });