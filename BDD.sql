-- Table Compte
CREATE TABLE Compte (
    idCompte INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(100) NOT NULL,
    Prenom VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    MotDePasse VARCHAR(255) NOT NULL
);

-- Table RecherchesEnregistrees (association entre Compte et Recherche)
CREATE TABLE RecherchesEnregistrees (
    leCompte INT,
    laRecherche INT,
    FOREIGN KEY (leCompte) REFERENCES Compte(idCompte),
    FOREIGN KEY (laRecherche) REFERENCES Recherche(idRecherche),
    PRIMARY KEY (leCompte, laRecherche)
);

-- Table AnnoncesEnregistrees (association entre Compte et Annonce)
CREATE TABLE AnnoncesEnregistrees (
    leCompte INT,
    lAnnonce INT,
    FOREIGN KEY (leCompte) REFERENCES Compte(idCompte),
    FOREIGN KEY (lAnnonce) REFERENCES Annonce(idAnnonce),
    PRIMARY KEY (leCompte, lAnnonce)
);

-- Table Recherche
CREATE TABLE Recherche (
    idRecherche INT PRIMARY KEY AUTO_INCREMENT,
    laVille VARCHAR(5), -- correspond au Code Postal
    DistanceAutourVille INT,
    TypeDeBien VARCHAR(50),
    M2HabitableMax INT,
    M2HabitableMin INT,
    M2TerrainsMax INT,
    M2TerrainsMin INT,
    PrixMax DECIMAL(15, 2),
    PrixMin DECIMAL(15, 2),
    ParticulierPro ENUM('Particulier', 'Professionnel'),
    Garage ENUM('Oui', 'Non'),
    Piscine ENUM('Oui', 'Non'),
    Meuble ENUM('Oui', 'Non'),
    FOREIGN KEY (laVille) REFERENCES Ville(CodePostal)
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
    Garage ENUM('Oui', 'Non'),
    Piscine ENUM('Oui', 'Non'),
    Meuble ENUM('Oui', 'Non'),
    Description TEXT,
    URLOriginale VARCHAR(255),
    FOREIGN KEY (laVille) REFERENCES Ville(CodePostal)
);

-- Table Ville
CREATE TABLE Ville (
    CodePostal VARCHAR(5) PRIMARY KEY,
    NomVille VARCHAR(100) NOT NULL
);
