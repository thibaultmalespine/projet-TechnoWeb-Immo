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