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
    CodePostal VARCHAR(5) PRIMARY KEY,
    NomVille VARCHAR(100) NOT NULL
);

-- Table Annonce
CREATE TABLE Annonce (
    idAnnonce SERIAL PRIMARY KEY,
    URLOriginale VARCHAR NOT NULL,
    NomAnnonce VARCHAR NOT NULL,
    laVille VARCHAR(5), -- correspond au Code Postal
    TypeDeBien VARCHAR(50),
    M2Habitable INT,
    M2Terrains INT,
    Prix DECIMAL(15, 2),
    ParticulierPro VARCHAR CHECK (ParticulierPro IN ('Particulier', 'Professionnel')),
    Garage BOOLEAN,
    Piscine BOOLEAN,
    Meuble BOOLEAN,
    Description TEXT,
    FOREIGN KEY (laVille) REFERENCES Ville(CodePostal)
);

-- Table AnnoncesEnregistrees (association entre Compte et Annonce)
CREATE TABLE AnnoncesEnregistrees (
    leCompte INT,
    lAnnonce INT,
    FOREIGN KEY (leCompte) REFERENCES Compte(idCompte),
    FOREIGN KEY (lAnnonce) REFERENCES Annonce(idAnnonce),
    PRIMARY KEY (leCompte, lAnnonce)
);


