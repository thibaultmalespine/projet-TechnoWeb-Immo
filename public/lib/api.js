const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fonction pour récupérer les annonces 
export async function getAnnonces() {
    const response = await fetch(`${API_URL}/annonce`, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: 'include',  // Permet d'inclure les cookies (session) dans la requête
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Erreur lors de la récupération des annonces');
    }
  }

// Fonction pour récupérer une annonce par son ID 
export async function getAnnonceById(id) {
    const response = await fetch(`${API_URL}/annonce/${id}`, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: 'include',  // Permet d'inclure les cookies (session) dans la requête
    });

    if (response.ok) {
      return response.json();
    }else {
      throw new Error('Erreur lors de la récupération des annonces');
    }
}

// Fonction pour supprimer une annonce par son ID
export async function deleteAnnonceById(id){
  const response = await fetch(`${API_URL}/annonce/${id}`, {
    method: 'DELETE',
    headers: { "Content-type": "application/json" },
    credentials: 'include',  // Permet d'inclure les cookies (session) dans la requête
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Erreur lors de la supprission de l'annonce id ${id}`);
  }
}

// Fonction pour récupérer un compte client
export async function getCompte() {
  const response = await fetch(`${API_URL}/compte`, {
    method: 'GET',
    headers: { "Content-type": "application/json" },
    credentials: 'include',  // Permet d'inclure les cookies (session) dans la requête
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Erreur lors de la récupération des annonces');
  }
}

// Fonction pour modifier un compte client
export async function updateCompte(id, data) {
  const response = await fetch(`${API_URL}/compte/${id}`, {
    method: 'PUT',
    headers: { "Content-type": "application/json" },
    credentials: 'include',  // Permet d'inclure les cookies (session) dans la requête
    body: JSON.stringify(data)

  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Une erreur est survenue lors de la mise à jour du compte');
  }
}

// Fonction pour scrapper une annonce leboncoin
export async function scrap(url){
  const response = await fetch(`${API_URL}/scraper`, {
    method: 'POST',
    headers: { "Content-type": "application/json" },
    credentials: 'include',  // Permet d'inclure les cookies (session) dans la requête
    body: JSON.stringify(url)
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Erreur lors du fetch de l'annonce`);
  }
}
