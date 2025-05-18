-- Insertion des comptes (inchangé)
INSERT INTO Compte (Nom, Prenom, Email, MotDePasse) VALUES
('Dupont', 'Jean', 'jean.dupont@email.com', 'hashed_password1'),
('Martin', 'Sophie', 'sophie.martin@email.com', 'hashed_password2'),
('Lefevre', 'Pierre', 'pierre.lefevre@email.com', 'hashed_password3');

-- Insertion des annonces pour jean.dupont@email.com
INSERT INTO Annonce (URLOriginale, NomAnnonce, CodePostal, NomVille, TypeDeBien, M2Habitable, M2Terrains, Prix, ParticulierPro, Garage, Piscine, Meuble, LeCompte, Description) VALUES
('http://site.com/annonce1', 'Maison de campagne', '75001', 'Paris', 'Maison', 120, 500, 450000, 'Particulier', true, false, true, 'jean.dupont@email.com', 'Superbe maison de campagne rénovée en 2022, avec poutres apparentes, cuisine équipée et un vaste jardin arboré idéal pour les amoureux de la nature.'),
('http://site.com/annonce2', 'Appartement centre', '75002', 'Paris', 'Appartement', 65, 0, 320000, 'Particulier', false, false, false, 'jean.dupont@email.com', 'Appartement lumineux au cœur du 2ème arrondissement, à deux pas des commerces et du métro, parfait pour un jeune couple ou un premier achat.'),
('http://site.com/annonce3', 'Studio étudiant', '75003', 'Paris', 'Appartement', 25, 0, 180000, 'Particulier', false, false, true, 'jean.dupont@email.com', 'Charmant studio meublé dans le Marais, idéal pour un étudiant ou un investissement locatif, avec kitchenette et salle d’eau moderne.'),
('http://site.com/annonce4', 'Maison familiale', '75004', 'Paris', 'Maison', 150, 300, 580000, 'Particulier', true, true, false, 'jean.dupont@email.com', 'Grande maison familiale avec 4 chambres, un garage spacieux et une piscine chauffée, située dans un quartier calme et résidentiel.'),
('http://site.com/annonce5', 'Loft moderne', '75005', 'Paris', 'Appartement', 90, 0, 420000, 'Particulier', true, false, true, 'jean.dupont@email.com', 'Loft contemporain entièrement meublé, avec verrière industrielle, hauts plafonds et une place de parking sécurisée en sous-sol.');

-- Insertion des annonces pour sophie.martin@email.com
INSERT INTO Annonce (URLOriginale, NomAnnonce, CodePostal, NomVille, TypeDeBien, M2Habitable, M2Terrains, Prix, ParticulierPro, Garage, Piscine, Meuble, LeCompte, Description) VALUES
('http://site.com/annonce6', 'Villa luxe', '69001', 'Lyon', 'Maison', 200, 1000, 850000, 'Professionnel', true, true, true, 'sophie.martin@email.com', 'Magnifique villa d’architecte offrant une vue panoramique sur Lyon, avec piscine intérieure, 5 chambres, garage double et un terrain paysagé exceptionnel.'),
('http://site.com/annonce7', 'T2 rénové', '69002', 'Lyon', 'Appartement', 45, 0, 220000, 'Professionnel', false, false, false, 'sophie.martin@email.com', 'T2 entièrement rénové en 2023, avec parquet chêne massif, cuisine ouverte équipée et une localisation idéale près de la place Bellecour.'),
('http://site.com/annonce8', 'Maison mitoyenne', '69003', 'Lyon', 'Maison', 110, 200, 380000, 'Professionnel', true, false, false, 'sophie.martin@email.com', 'Maison mitoyenne pratique et fonctionnelle, avec 3 chambres, un garage et un petit jardin clos, proche des écoles et des transports en commun.'),
('http://site.com/annonce9', 'Studio cosy', '69004', 'Lyon', 'Appartement', 30, 0, 150000, 'Professionnel', false, false, true, 'sophie.martin@email.com', 'Studio cosy et meublé dans le quartier de la Croix-Rousse, avec coin nuit séparé, idéal pour un célibataire ou un pied-à-terre.'),
('http://site.com/annonce10', 'Duplex charmant', '69005', 'Lyon', 'Appartement', 80, 0, 340000, 'Professionnel', false, false, true, 'sophie.martin@email.com', 'Duplex plein de charme avec pierres apparentes, 2 chambres, cuisine équipée et meubles inclus, situé dans le vieux Lyon historique.');

-- Insertion des annonces pour pierre.lefevre@email.com
INSERT INTO Annonce (URLOriginale, NomAnnonce, CodePostal, NomVille, TypeDeBien, M2Habitable, M2Terrains, Prix, ParticulierPro, Garage, Piscine, Meuble, LeCompte, Description) VALUES
('http://site.com/annonce11', 'Maison bord de mer', '13001', 'Marseille', 'Maison', 140, 400, 520000, 'Particulier', true, true, false, 'pierre.lefevre@email.com', 'Maison provençale avec vue imprenable sur la mer, 4 chambres, terrasse ensoleillée, piscine extérieure et garage, à 5 min des calanques.'),
('http://site.com/annonce12', 'T3 lumineux', '13002', 'Marseille', 'Appartement', 70, 0, 280000, 'Particulier', false, false, false, 'pierre.lefevre@email.com', 'T3 spacieux et lumineux avec balcon, séjour double, cuisine semi-ouverte et une situation idéale près du Panier et du port.'),
('http://site.com/annonce13', 'Petite maison', '13003', 'Marseille', 'Maison', 90, 150, 340000, 'Particulier', true, false, false, 'pierre.lefevre@email.com', 'Petite maison de ville avec 2 chambres, un garage et un jardinet fleuri, parfait pour une petite famille ou un couple.'),
('http://site.com/annonce14', 'Studio port', '13004', 'Marseille', 'Appartement', 35, 0, 160000, 'Particulier', false, false, true, 'pierre.lefevre@email.com', 'Studio meublé à deux pas du Vieux-Port, avec coin cuisine équipée, salle d’eau refaite et une ambiance chaleureuse.'),
('http://site.com/annonce15', 'Maison récente', '13005', 'Marseille', 'Maison', 130, 350, 460000, 'Particulier', true, true, false, 'pierre.lefevre@email.com', 'Maison moderne construite en 2020, avec 3 chambres, garage, piscine hors-sol et un jardin bien entretenu, dans un quartier résidentiel calme.');