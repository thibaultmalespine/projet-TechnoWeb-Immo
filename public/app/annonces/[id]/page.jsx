"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getAnnonceById } from "@/lib/api"
import {
  ArrowLeft,
  Building,
  Car,
  Euro,
  Home,
  MapPin,
  Maximize2,
  PocketIcon as Pool,
  Ruler,
  Sofa,
  User
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Loading from "../loading"


export default function AnnoncePage({ params }) {
    const [annonce, setAnnonce] = useState({});  // État pour stocker l' annonce
    const [loading, setLoading] = useState(true);  // État pour gérer le chargement
    const [formattedPrice, setFormattedPrice] = useState();


    useEffect(()=>{
      const fetchAnnonce = async () => {
      try {
        const annonceData = await getAnnonceById(params.id);
        setAnnonce(annonceData); 
        setFormattedPrice(annonceData.prix)
        
      } finally {
        setLoading(false);  // Fin du chargement
      }
      }
   
      fetchAnnonce()

      

    },[]);

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

          <div>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div className="prose max-w-none">
              {annonce.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

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
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Prix</h3>
                <p className="text-2xl font-bold text-primary">{formattedPrice} €</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  {annonce.particulierpro === "Particulier" ? (
                    <User className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Building className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span>{annonce.particulierpro}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full">Contacter le vendeur</Button>
                <Button variant="outline" className="w-full">
                  Sauvegarder l'annonce
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Vendeur</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  {annonce.particulierpro === "Particulier" ? (
                    <User className="h-6 w-6" />
                  ) : (
                    <Building className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{annonce.lecompte}</p>
                  <p className="text-sm text-muted-foreground">{annonce.particulierpro}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Voir toutes ses annonces
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

