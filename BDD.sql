-- Table Compte
CREATE TABLE Compte (
    idCompte INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(100) NOT NULL,
    Prenom VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    MotDePasse VARCHAR(255) NOT NULL
);


-- Table AnnoncesEnregistrees (association entre Compte et Annonce)
CREATE TABLE AnnoncesEnregistrees (
    leCompte INT,
    lAnnonce INT,
    FOREIGN KEY (leCompte) REFERENCES Compte(idCompte),
    FOREIGN KEY (lAnnonce) REFERENCES Annonce(idAnnonce),
    PRIMARY KEY (leCompte, lAnnonce)
);



-- Table Annonce
CREATE TABLE Annonce (
    idAnnonce INT PRIMARY KEY AUTO_INCREMENT,
    laVille VARCHAR(5), -- correspond au Code Postal
    TypeDeBien VARCHAR(50),
    M2Habitable INT,
    M2Terrains INT,
    Prix DECIMAL(15, 2),
    ParticulierPro ENUM('Particulier', 'Professionnel'),
    Garage BOOLEAN,
    Piscine BOOLEAN,
    Meuble BOOLEAN,
    Description TEXT,
    URLOriginale VARCHAR(255),
    FOREIGN KEY (laVille) REFERENCES Ville(CodePostal)
);


-- Table Ville
CREATE TABLE Ville (
    CodePostal VARCHAR(5) PRIMARY KEY,
    NomVille VARCHAR(100) NOT NULL
);
