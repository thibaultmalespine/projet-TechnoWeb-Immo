const loginForm = document.querySelector("#login-form");

loginForm.addEventListener('submit',async (event) => {
    event.preventDefault()
    
    // Récupération des données du formulaire
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());
  
        const response = await fetch(`/compte/login?email=${data.email}&motDePasse=${data.motDePasse}`);
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            alert("connexion réussi")
        } else if(response.status === 404) {
            alert("compte non trouvé")
        }
  


})