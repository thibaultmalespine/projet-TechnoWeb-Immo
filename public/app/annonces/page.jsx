"use client"

import { AnnoncesList } from "@/components/annonces/annonces-list";
import { getAnnonces } from "@/lib/api";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function AnnoncesPage() {

  const [annonces, setAnnonces] = useState(null);  // État pour stocker les annonces
  const [loading, setLoading] = useState(true);  // État pour gérer le chargement

  useEffect(()=>{
    const fetchAnnonces = async () => {
    try {
      const annoncesData = await getAnnonces();
      setAnnonces(annoncesData);  
    } finally {
      setLoading(false);  // Fin du chargement
    }
    }

    fetchAnnonces()
  },[]);

  if(loading){
    return(<Loading/>)
  }
  return (
    <div className="container mx-4 py-8 w-auto">
      <h1 className="text-3xl font-bold mb-8">Toutes nos annonces immobilières</h1>
      <AnnoncesList annonces={annonces} />
    </div>
  )
}
