"use client"

import { AnnoncesList } from "@/components/annonces/annonces-list";
import { getAnnonces } from "@/lib/api";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { CircleUserRound } from 'lucide-react';
import Link from "next/link";

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
    <div className="container mx-4 py-8 w-auto relative">
      <h1 className="text-3xl font-bold mb-8">Toutes vos annonces immobilières</h1>
      <AnnoncesList annonces={annonces} />
      <div className="py-8 mx-4 absolute right-0 top-0 w-max  h-10 ">
        <Link href="/compte" className="hover:underline">
          <CircleUserRound className="inline"/> 
          <span className="text-sm"> Votre Compte </span>
        </Link>
      </div>
    </div>
  )
}
