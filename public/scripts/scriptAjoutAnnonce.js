// Fonction pour afficher/masquer le formulaire
function toggleForm() {
    var form = document.getElementById("annonceForm");
    if (form.style.display === "block") {
        form.style.display = "none";
    } else {
        form.style.display = "block";
    }
}

// Fonction pour masquer le formulaire après soumission
function closeForm() {
    var form = document.getElementById("annonceForm");
    form.style.display = "none";
    alert("Annonce soumise avec succès !");
}

// Rediriger après avoir ajouter une annonce
const form = document.querySelector('#annonceForm')

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Récupération des données du formulaire
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/annonce/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    })
  
    if (response.ok) {
        window.location.href = "/pages/mesAnnonces.html"
    } else {
        alert("une erreur est survenue sur le serveur")
    }

})