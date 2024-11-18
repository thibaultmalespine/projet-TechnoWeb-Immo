import { describe, it, expect, afterEach, vi } from 'vitest';
import { client } from '../server/bdd.js';
import { getAllAnnonces, getAnnonceById, createAnnonce, updateAnnonce, deleteAnnonce } from '../server/controllers/annonceControllers.js';


describe("Tests des fonctions de la BDD", () => {

  it("createAnnonce devrait insérer une nouvelle annonce", async () => {
      // Données factices pour tester la fonction
      const body = {
            titre: 'Test Annonce',
            url_annonce: 'https://www.test.com',
            description: 'Test description',
            type: 'Maison',
            codep: '75000',
            ville: 'Paris',
            prix: 500000,
            m2_habitable: 120,
            m2_terrain: 200,
            meuble: true,
            particulier_pro: 'Particulier',
            garage: true,
            piscine: false,
          };
    
    await fetch("http://localhost:3000/annonce/submit", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
    })

    
    const data = await fetch("http://localhost:3000/annonce/getAll")
    console.log(data);
  });
  











/*
  it("getAllAnnonces devrait retourner une liste d'annonces", async () => {


    console.log("Debut du test");

    // Insérer une annonce test
    const query = `
      INSERT INTO annonce (NomAnnonce, URLOriginale, Description, TypeDeBien, CodePostal, NomVille, Prix, M2Habitable, M2Terrains, Meuble, ParticulierPro, Garage, Piscine) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;

    const values = [
        'Test Annonce',
        'http://example.com',
        'Description',
        'Maison',
        '75000', // Code postal pour Paris
        'Paris',
        500000,
        120,
        300,
        true,
        'Particulier',
        true,
        false
      ];

    await client.query(query, values);

    console.log("Connexion à la base de données réussie et insertion effectuée.");

    const req = {}; // Pas de paramètres requis pour cette fonction
    const res = {
      json: vi.fn(),
    };

    await getAllAnnonces(req, res);

    console.log("Résultat de la fonction getAllAnnonces : ", res.json.mock.calls);

    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ NomAnnonce: 'Test Annonce' }),
      ])
    );
  });







  it("getAnnonceById devrait retourner une annonce spécifique", async () => {
    // Insérer une annonce test
    const result = await client.query(
      `INSERT INTO Annonce (NomAnnonce, URLOriginale, Description, TypeDeBien, laVille, Prix, M2Habitable, M2Terrains, Meuble, ParticulierPro, Garage, Piscine) 
       VALUES ('Test Annonce', 'http://example.com', 'Description', 'Maison', 'Paris', 500000, 120, 300, true, 'Particulier', true, false) RETURNING idAnnonce`
    );
    const idAnnonce = result.rows[0].idAnnonce;

    const req = { params: { id: idAnnonce } };
    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    await getAnnonceById(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ NomAnnonce: 'Test Annonce' })
    );
  });


  it("updateAnnonce devrait mettre à jour une annonce existante", async () => {
    // Insérer une annonce test
    const result = await client.query(
      `INSERT INTO Annonce (NomAnnonce, URLOriginale, Description, TypeDeBien, laVille, Prix, M2Habitable, M2Terrains, Meuble, ParticulierPro, Garage, Piscine) 
       VALUES ('Test Annonce', 'http://example.com', 'Description', 'Maison', 'Paris', 500000, 120, 300, true, 'Particulier', true, false) RETURNING idAnnonce`
    );
    const idAnnonce = result.rows[0].idAnnonce;

    const req = {
      params: { id: idAnnonce },
      body: {
        titre: "Annonce mise à jour",
        url_annonce: "http://new-url.com",
        description: "Nouvelle description",
        type: "Appartement",
        ville: "Marseille",
        prix: 400000,
        m2_habitable: 100,
        m2_terrain: 50,
        meuble: true,
        particulier_pro: "Pro",
        garage: true,
        piscine: true,
      },
    };
    const res = {
      send: vi.fn(),
      status: vi.fn().mockReturnThis(),
    };

    await updateAnnonce(req, res);

    const updatedAnnonce = await client.query(
      `SELECT * FROM Annonce WHERE idAnnonce = $1`,
      [idAnnonce]
    );

    expect(updatedAnnonce.rows[0].NomAnnonce).toBe("Annonce mise à jour");
    expect(res.send).toHaveBeenCalledWith("Annonce mise à jour avec succès");
  });

  it("deleteAnnonce devrait supprimer une annonce", async () => {
    // Insérer une annonce test
    const result = await client.query(
      `INSERT INTO Annonce (NomAnnonce, URLOriginale, Description, TypeDeBien, laVille, Prix, M2Habitable, M2Terrains, Meuble, ParticulierPro, Garage, Piscine) 
       VALUES ('Test Annonce', 'http://example.com', 'Description', 'Maison', 'Paris', 500000, 120, 300, true, 'Particulier', true, false) RETURNING idAnnonce`
    );
    const idAnnonce = result.rows[0].idAnnonce;

    const req = { params: { id: idAnnonce } };
    const res = {
      send: vi.fn(),
      status: vi.fn().mockReturnThis(),
    };

    await deleteAnnonce(req, res);

    const resultAfterDelete = await client.query(
      `SELECT * FROM Annonce WHERE idAnnonce = $1`,
      [idAnnonce]
    );

    expect(resultAfterDelete.rowCount).toBe(0);
    expect(res.send).toHaveBeenCalledWith("Annonce supprimée avec succès");
  }); */
});
