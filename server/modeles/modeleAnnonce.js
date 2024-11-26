import { client } from '../bdd.js';

const Annonce = {
    getAll : async () => {
        const result = await client.query('SELECT * FROM Annonce');
        return result.rows;
    },
    getByID : async (id) =>{
        const result = await client.query('SELECT * FROM Annonce WHERE idAnnonce = $1', [id]);
        return result.rows[0];
    },
    getByAccount: async (email) => {
        const result = await client.query('SELECT * FROM Annonce WHERE lecompte = $1', [email]);
        return result.rows;
    },
    create : async(data) =>{
        const { titre, url_annonce, description, type, codep, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine, lecompte } = data;
    
        const result = await client.query(`INSERT INTO Annonce (NomAnnonce, URLOriginale, Description, TypeDeBien, CodePostal, NomVille, Prix, M2Habitable, M2Terrains, Meuble, ParticulierPro, Garage, Piscine, LeCompte) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`, [titre, url_annonce, description, type, codep, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine, lecompte]);
        return result.rows[0];
    },
    update : async(data) => {
        const { idAnnonce, titre, url_annonce, description, type, codep, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine } = data;
        const result = await client.query(`UPDATE Annonce
        SET NomAnnonce = $1, URLOriginale = $2, Description = $3, TypeDeBien = $4, codePostal = $5, NomVille = $6, Prix = $7, 
            M2Habitable = $8, M2Terrains = $9, Meuble = $10, ParticulierPro = $11, Garage = $12, Piscine = $13
        WHERE idAnnonce = $14 RETURNING *`, [titre, url_annonce, description, type, codep, ville, prix, m2_habitable, m2_terrain, meuble, particulier_pro, garage, piscine, idAnnonce]);
        return result.rows[0];
    },
    delete : async(id) => {
        const result = await client.query(`DELETE FROM Annonce WHERE idAnnonce = $1`, [id]);
        return result.rows[0];
    }

}

export default Annonce;