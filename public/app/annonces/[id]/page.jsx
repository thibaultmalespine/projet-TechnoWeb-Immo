"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { deleteAnnonceById, getAnnonceById } from "@/lib/api"
import { ArrowLeft, Car, Euro, Home, MapPin, Maximize2, PocketIcon as Pool, Ruler, Sofa, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import Loading from "../loading"


export default function AnnoncePage() {
    const [annonce, setAnnonce] = useState({});  // État pour stocker l' annonce
    const [loading, setLoading] = useState(true);  // État pour gérer le chargement
    const [formattedPrice, setFormattedPrice] = useState();
    const [error, setError] = useState();
    const params = useParams();
    const router = useRouter();

    useEffect(()=>{
      const fetchAnnonce = async () => {
        try {
          const annonceData = await getAnnonceById(params.id);
          setAnnonce(annonceData); 
          setFormattedPrice(annonceData.prix)
        } catch {
          setError(true);
        } finally {
          setLoading(false);  // Fin du chargement
        }
      }
      fetchAnnonce();       
    },[]);

    useEffect(() => {
      if (error) {
        notFound();
      }
    }, [error])

    function handleDeleteButton(){
      deleteAnnonceById(params.id);
      router.push("/annonces");
    }

  if (loading) {
    return (
      <Loading></Loading>
    )
  }


  return (
    <div className="container mx-4 py-8 w-auto">
      <Link href="/annonces" className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Retour aux annonces
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Titre, Code postal, Image */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{annonce.nomannonce}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="h-4 w-4" />
              <span>
                {annonce.codepostal} {annonce.nomville}
              </span>
            </div>
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src={"/placeholder.svg"}
                alt={annonce.nomannonce}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/*Caractéristiques*/}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Euro className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Prix</p>
                <p className="font-bold text-xl">{formattedPrice} €</p>
              </CardContent>
            </Card>

            {annonce.m2habitable > 0 && (
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Maximize2 className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Surface habitable</p>
                  <p className="font-bold text-xl">{annonce.m2habitable} m²</p>
                </CardContent>
              </Card>
            )}

            {annonce.m2terrains > 0 && (
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Ruler className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Surface terrain</p>
                  <p className="font-bold text-xl">{annonce.m2terrains} m²</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Home className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Type de bien</p>
                <p className="font-bold text-xl">{annonce.typedebien}</p>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div className="prose max-w-none">
              {annonce.description && annonce.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Badges garage, piscine, meublé */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Caractéristiques</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Badge variant={annonce.garage ? "default" : "outline"} className="h-8">
                  <Car className="h-4 w-4 mr-2" />
                  Garage
                </Badge>
                <span>{annonce.garage ? "Oui" : "Non"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={annonce.piscine ? "default" : "outline"} className="h-8">
                  <Pool className="h-4 w-4 mr-2" />
                  Piscine
                </Badge>
                <span>{annonce.piscine ? "Oui" : "Non"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={annonce.meuble ? "default" : "outline"} className="h-8">
                  <Sofa className="h-4 w-4 mr-2" />
                  Meublé
                </Badge>
                <span>{annonce.meuble ? "Oui" : "Non"}</span>
              </div>
            </div>
          </div>
        
          {/* Bouton supprimer */}
          <div className="grid md:grid-cols-3 gap-4">
            <Button onClick={handleDeleteButton} variant="destructive" size="sm" className="flex items-center gap-2 col-start-3 cursor-pointer">
              <Trash2 className="h-4 w-4" />
              <span>Supprimer</span>
            </Button>
          
          </div>
    
        </div>
      </div>
    </div>
  )
}

