const loginForm = document.querySelector("#login-form");

loginForm.addEventListener('submit',async (event) => {
    event.preventDefault()
    
    // Récupération des données du formulaire
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());
  
        const response = await fetch(`/compte/login?email=${data.email}&motDePasse=${data.motDePasse}`);
        if (response.redirected) {
            document.location.href = response.url
        } else if(response.status === 404) {
            alert("compte non trouvé")
        }

})