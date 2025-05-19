import { client } from '../bdd.js';

const Annonce = {
    getByID : async (id) =>{
        const result = await client.query('SELECT * FROM annonce WHERE idannonce = $1', [id]);
        return result.rows[0];
    },
    getByAccount: async (email) => {
        const result = await client.query('SELECT * FROM annonce WHERE lecompte = $1', [email]);
        return result.rows;
    },
    create : async(data) =>{
        
        const { nomannonce, urloriginale, descriptionbien, typedebien, codepostal, nomville, prix, m2habitable, m2terrains, meuble, particulierpro, garage, piscine, lecompte, cheminsimages } = data;

        const result = await client.query(`INSERT INTO annonce (nomannonce, urloriginale, descriptionbien, typedebien, codepostal, nomville, prix, m2habitable, m2terrains, meuble, particulierpro, garage, piscine, lecompte, cheminsimages) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`, [nomannonce, urloriginale, descriptionbien, typedebien, codepostal, nomville, prix, m2habitable, m2terrains, meuble, particulierpro, garage, piscine, lecompte, cheminsimages]);
        return result.rows[0];
    },
    update : async(data) => {        
        const { idannonce, nomannonce, urloriginale, descriptionbien, typedebien, codepostal, nomville, prix, m2habitable, m2terrains, meuble, particulierpro, garage, piscine, lecompte, cheminsimages } = data;
        const result = await client.query(`UPDATE annonce
        SET nomannonce = $1, urloriginale = $2, descriptionbien = $3, typedebien = $4, codepostal = $5, nomville = $6, prix = $7, 
            m2habitable = $8, m2terrains = $9, meuble = $10, particulierpro = $11, garage = $12, piscine = $13, lecompte = $14,
            cheminsimages = $15
        WHERE idannonce = $16 RETURNING *`, [nomannonce, urloriginale, descriptionbien, typedebien, codepostal, nomville, prix, m2habitable, m2terrains, meuble, particulierpro, garage, piscine, lecompte, cheminsimages, idannonce]);
        return result.rows[0];
    },
    delete : async(id) => {
        const result = await client.query(`DELETE FROM annonce WHERE idannonce = $1`, [id]);
        return result.rowCount;
    }
}

export default Annonce;