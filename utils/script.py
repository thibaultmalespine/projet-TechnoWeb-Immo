import json

# Chargement des données depuis le fichier JSON
with open('result.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Ouvrir un fichier SQL en mode écriture (cela écrasera le fichier s'il existe déjà)
with open('../insert_villes.sql', 'w', encoding='utf-8') as sql_file:
    # Générer les requêtes SQL et les écrire dans le fichier
    for entry in data:
        nom_ville = entry["nom"]
        for code_postal in entry["codesPostaux"]:
            # Créer la requête SQL pour chaque ligne et l'écrire dans le fichier
            sql_file.write(f"INSERT INTO Ville (CodePostal, NomVille) VALUES ('{code_postal}', '{nom_ville}');\n")

print("Les requêtes SQL ont été enregistrées dans 'insert_villes.sql'.")
