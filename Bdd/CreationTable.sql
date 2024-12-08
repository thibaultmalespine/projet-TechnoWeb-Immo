-- SUPPRIMER LES TABLES
DROP TABLE Compte CASCADE;
DROP TABLE Ville CASCADE;
DROP TABLE Annonce CASCADE;
DROP TABLE AnnoncesEnregistrees CASCADE;

-- Table Compte
CREATE TABLE Compte (
    idCompte SERIAL PRIMARY KEY,
    Nom VARCHAR(100),
    Prenom VARCHAR(100),
    Email VARCHAR(100) NOT NULL UNIQUE,
    MotDePasse VARCHAR(255) NOT NULL
);

-- Table Ville
CREATE TABLE Ville (
    CodePostal VARCHAR(5) NOT NULL,
    NomVille VARCHAR(100) NOT NULL,
    PRIMARY KEY (CodePostal, NomVille)
);


-- Table Annonce
CREATE TABLE Annonce (
    idAnnonce SERIAL PRIMARY KEY,
    URLOriginale VARCHAR NOT NULL,
    NomAnnonce VARCHAR NOT NULL,
    CodePostal VARCHAR(5),  -- Correspond au Code Postal
    NomVille VARCHAR(100),  -- Correspond au Nom de la Ville
    TypeDeBien VARCHAR(50),
    M2Habitable INT,
    M2Terrains INT,
    Prix DECIMAL(15, 2),
    ParticulierPro VARCHAR CHECK (ParticulierPro IN ('Particulier', 'Professionnel')),
    Garage BOOLEAN,
    Piscine BOOLEAN,
    Meuble BOOLEAN,
    LeCompte VARCHAR(100) NOT NULL REFERENCES Compte(email) ,
    Description TEXT,
    FOREIGN KEY (CodePostal, NomVille) REFERENCES Ville(CodePostal, NomVille)  -- Clé étrangère composée
);



