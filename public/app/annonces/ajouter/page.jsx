"use client"

import { AjouterAnnonceForm } from "@/components/annonces/ajouter-annonce-form";
import { redirect, useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AjouterAnnoncePage() {
  const router = useRouter()
  async function postAnnonces(formData) {
    
    try {
      const response = await fetch(`${API_URL}/annonce`, {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body : JSON.stringify(formData),
        credentials: 'include',  // Permet d'inclure les cookies (session) dans la requête
      });

      if (response.ok) {
        redirect("/annonces")       
      } else {
        throw new Error('Erreur lors de l\'envoie de l\'annonce');
      }
    }
    catch(err){
      console.error(err);
    }
  }
  return (
    <div className="container mx-10 py-4 size-auto">
        <h1 className="text-2xl font-bold mb-6 m-4">Ajouter une nouvelle annonce</h1>   
        <AjouterAnnonceForm onSubmit={postAnnonces}/>
    </div>
  )
}
