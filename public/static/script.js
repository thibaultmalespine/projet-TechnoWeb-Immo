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