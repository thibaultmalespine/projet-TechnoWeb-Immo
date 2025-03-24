"use client"

import { AnnoncesList } from "@/components/annonces/annonces-list";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AnnoncesPage() {
  const [annonces, setAnnonces] = useState([]); // État pour stocker les annonces
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  // Fonction pour récupérer les annonces
  
  async function getAnnonces() {
    try {
      const response = await fetch(`${API_URL}/annonce`, {
        method: 'GET',
        headers: { "Content-type": "application/json" },
        credentials: 'include',  // Permet d'inclure les cookies (session) dans la requête
      });

      if (response.ok) {
        const data = await response.json();
        setAnnonces(data); // Mettre à jour l'état des annonces        
      } else {
        throw new Error('Erreur lors de la récupération des annonces');
      }
    } catch (err) {
      setError(err.message); // Si erreur, on met à jour l'état d'erreur
    } finally {
      setLoading(false); // On arrête le chargement, qu'il y ait une erreur ou non
    }
  }

  // Utilisation de useEffect pour charger les annonces au montage du composant
  useEffect(() => {
    getAnnonces();    
  }, []); // [] assure que l'effet ne sera exécuté qu'une seule fois, au montage du composant
  

  return (
    <div className="container mx-4 py-8 w-auto">
      <h1 className="text-3xl font-bold mb-8">Toutes nos annonces immobilières</h1>
      <AnnoncesList annonces={annonces} />
    </div>
  )
}

