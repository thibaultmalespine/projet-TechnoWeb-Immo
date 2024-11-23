// Gère l'envoi du formulaire de connexion
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener('submit',async (event) => {
    event.preventDefault()
    
    // Récupération des données du formulaire
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch(`/compte/login`, {
        method : 'POST',
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(data)
    });
    if (response.ok) {
        document.location.href = '/pages/mesAnnonces.html'
    } else if(response.status === 404) {
        alert("compte non trouvé")
    }
})

// Gère l'envoi du formulaire de création de compte
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener('submit',async (event) => {
    event.preventDefault()
    
    // Récupération des données du formulaire
    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData.entries());
  
    const response = await fetch(`/compte/createCompte`, {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(data)
    });
    if (response.ok) {
        document.location.href = '/pages/mesAnnonces.html'
    } else if(response.status === 500) {
        alert("erreur du serveur, veuillez réessayer plus tard")
    }
})