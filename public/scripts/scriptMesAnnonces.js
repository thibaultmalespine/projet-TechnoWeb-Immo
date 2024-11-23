async function fetchAnnonces() {
    try {
        const response = await fetch('/annonce/getAnnonceByAccount');
        if (response.ok) {
            const annonces = await response.json();

            const container = document.getElementById('annonces-container');
            annonces.forEach(annonce => {

                const annonceDiv = document.createElement('div');
                annonceDiv.classList.add('annonce');
                
                annonceDiv.innerHTML = `
                    <h2>${annonce.nomannonce}</h2>
                    <p>Ville : ${annonce.nomville}</p>
                    <p>Code Postal   : ${annonce.codepostal}</p>
                    <p>Type de bien : ${annonce.typedebien}</p>
                    <p>Surface habitable : ${annonce.m2habitable} m²</p>
                    <p>Surface du terrain : ${annonce.m2terrains} m²</p>
                    <p>Prix : ${annonce.prix} €</p>
                    <p>Propriétaire : ${annonce.particulierpro}</p>
                    ${annonce.garage ? '<p>Garage disponible</p>' : ''}
                    ${annonce.piscine ? '<p>Piscine disponible</p>' : ''}
                    ${annonce.meuble ? '<p>Meublé</p>' : ''}
                    <p>Description : ${annonce.description}</p>
                    <hr>
                `;
                
                container.appendChild(annonceDiv);
            });
        }
    } catch (error) {
        console.error("Erreur lors du chargement des annonces:", error);
    }
}

// Appeler la fonction pour récupérer et afficher les annonces
fetchAnnonces();

async function generateShareLink() {
    const response = await fetch("/share", {
        method : "POST"
    })

    const link = await response.text();

    const p = document.querySelector("#shareLink")
    p.innerText = link;
}