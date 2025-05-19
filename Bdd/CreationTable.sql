-- SUPPRIMER LES TABLES
DROP TABLE IF EXISTS compte CASCADE;
DROP TABLE IF EXISTS ville CASCADE;
DROP TABLE IF EXISTS annonce CASCADE;
DROP TABLE IF EXISTS annoncesenregistrees CASCADE;

-- Table Compte
CREATE TABLE compte (
    idcompte SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    motdepasse VARCHAR(255) NOT NULL
);

-- Table Ville
CREATE TABLE ville (
    codepostal VARCHAR(5) NOT NULL,
    nomville VARCHAR(100) NOT NULL,
    PRIMARY KEY (codepostal, nomville)
);

-- Table Annonce
CREATE TABLE annonce (
    idannonce SERIAL PRIMARY KEY,
    urloriginale VARCHAR NOT NULL,
    nomannonce VARCHAR NOT NULL,
    codepostal VARCHAR(5),  -- Correspond au Code Postal
    nomville VARCHAR(100),  -- Correspond au Nom de la Ville
    typedebien VARCHAR(50),
    m2habitable INT,
    m2terrains INT,
    prix INT,
    particulierpro VARCHAR CHECK (particulierpro IN ('Particulier', 'Professionnel')),
    garage BOOLEAN,
    piscine BOOLEAN,
    meuble BOOLEAN,
    lecompte VARCHAR(100) NOT NULL REFERENCES compte(email),
    descriptionbien TEXT,
    cheminsimages TEXT[],
    FOREIGN KEY (codepostal, nomville) REFERENCES ville(codepostal, nomville)  -- Clé étrangère composée
);
