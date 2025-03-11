// Gère l'envoi du formulaire de création de compte
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener('submit',async (event) => {
    event.preventDefault()
    // Récupération des données du formulaire
    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData.entries());
  
    const response = await fetch(`/compte`, {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(data)
    });
    
    if (response.status === 201) {
        alert("compte ajouté avec succès !")
        document.location.href = '/index.html'
    } else if(response.status === 500) {
        alert("erreur du serveur, veuillez réessayer plus tard")
    }
})