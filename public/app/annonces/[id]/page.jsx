"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import {
  ArrowLeft,
  Building,
  Calendar,
  Car,
  Euro,
  Home,
  MapPin,
  Maximize2,
  PocketIcon as Pool,
  Ruler,
  Sofa,
  User,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Fonction pour récupérer une annonce par son ID (à remplacer par votre logique)
async function getAnnonceById(id) {
  // Exemple de données fictives
  const annonces = [
    {
      idAnnonce: 1,
      URLOriginale: "/placeholder.svg?height=400&width=600",
      NomAnnonce: "Magnifique appartement avec vue sur mer",
      CodePostal: "06000",
      NomVille: "Nice",
      TypeDeBien: "Appartement",
      M2Habitable: 85,
      M2Terrains: 0,
      Prix: 450000,
      ParticulierPro: "Particulier",
      Garage: true,
      Piscine: false,
      Meuble: true,
      LeCompte: "jean.dupont@example.com",
      Description:
        "Superbe appartement de 3 pièces avec vue panoramique sur la mer. Entièrement rénové avec des matériaux de qualité. Proche de toutes commodités.",
    },
    {
      idAnnonce: 2,
      URLOriginale: "/placeholder.svg?height=400&width=600",
      NomAnnonce: "Villa avec piscine et grand jardin",
      CodePostal: "13100",
      NomVille: "Aix-en-Provence",
      TypeDeBien: "Villa",
      M2Habitable: 180,
      M2Terrains: 1200,
      Prix: 890000,
      ParticulierPro: "Professionnel",
      Garage: true,
      Piscine: true,
      Meuble: false,
      LeCompte: "immopro@example.com",
      Description:
        "Magnifique villa de 6 pièces avec piscine et grand jardin arboré. Cuisine équipée, 4 chambres dont une suite parentale, 3 salles de bain.",
    },
    {
      idAnnonce: 3,
      URLOriginale: "/placeholder.svg?height=400&width=600",
      NomAnnonce: "Studio en centre-ville",
      CodePostal: "75003",
      NomVille: "Paris",
      TypeDeBien: "Appartement",
      M2Habitable: 28,
      M2Terrains: 0,
      Prix: 320000,
      ParticulierPro: "Professionnel",
      Garage: false,
      Piscine: false,
      Meuble: true,
      LeCompte: "parisimmo@example.com",
      Description:
        "Charmant studio entièrement meublé en plein cœur du Marais. Idéal pour investissement locatif ou pied-à-terre parisien.",
    },
    {
      idAnnonce: 4,
      URLOriginale: "/placeholder.svg?height=400&width=600",
      NomAnnonce: "Maison de campagne avec dépendances",
      CodePostal: "37000",
      NomVille: "Tours",
      TypeDeBien: "Maison",
      M2Habitable: 150,
      M2Terrains: 5000,
      Prix: 380000,
      ParticulierPro: "Particulier",
      Garage: true,
      Piscine: false,
      Meuble: false,
      LeCompte: "sophie.martin@example.com",
      Description:
        "Belle maison de campagne avec dépendances sur un terrain de 5000m². Possibilité d'aménager les combles. Environnement calme et verdoyant.",
    },
    {
      idAnnonce: 5,
      URLOriginale: "/placeholder.svg?height=400&width=600",
      NomAnnonce: "Terrain constructible vue lac",
      CodePostal: "74000",
      NomVille: "Annecy",
      TypeDeBien: "Terrain",
      M2Habitable: 0,
      M2Terrains: 800,
      Prix: 280000,
      ParticulierPro: "Professionnel",
      Garage: false,
      Piscine: false,
      Meuble: false,
      LeCompte: "alpes-immo@example.com",
      Description:
        "Terrain constructible de 800m² avec vue sur le lac d'Annecy. Viabilisé, CU positif. Possibilité de construire jusqu'à 200m² au sol.",
    },
    {
      idAnnonce: 6,
      URLOriginale: "/placeholder.svg?height=400&width=600",
      NomAnnonce: "Appartement T3 avec terrasse",
      CodePostal: "33000",
      NomVille: "Bordeaux",
      TypeDeBien: "Appartement",
      M2Habitable: 72,
      M2Terrains: 0,
      Prix: 395000,
      ParticulierPro: "Particulier",
      Garage: true,
      Piscine: false,
      Meuble: false,
      LeCompte: "pierre.durand@example.com",
      Description:
        "Bel appartement T3 avec terrasse de 15m² exposée sud. Résidence récente avec ascenseur. Proche tramway et commerces.",
    },  
  ]

  return annonces.find((annonce) => annonce.idAnnonce === Number.parseInt(id))
}

export default async function AnnoncePage({ params }) {
  const annonce = await getAnnonceById(params.id)

  if (!annonce) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Annonce non trouvée</h1>
        <p className="mb-8">L'annonce que vous recherchez n'existe pas ou a été supprimée.</p>
        <Link href="/annonces">
          <Button>Retour aux annonces</Button>
        </Link>
      </div>
    )
  }

  const formattedPrice = formatPrice(annonce.Prix)
  const formattedDate = new Date(annonce.DatePublication).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="container mx-4 py-8 w-auto">
      <Link href="/annonces" className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Retour aux annonces
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{annonce.NomAnnonce}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="h-4 w-4" />
              <span>
                {annonce.CodePostal} {annonce.NomVille}
              </span>
            </div>

            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src={annonce.URLOriginale || "/placeholder.svg"}
                alt={annonce.NomAnnonce}
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

            {annonce.M2Habitable > 0 && (
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Maximize2 className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Surface habitable</p>
                  <p className="font-bold text-xl">{annonce.M2Habitable} m²</p>
                </CardContent>
              </Card>
            )}

            {annonce.M2Terrains > 0 && (
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Ruler className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Surface terrain</p>
                  <p className="font-bold text-xl">{annonce.M2Terrains} m²</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Home className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Type de bien</p>
                <p className="font-bold text-xl">{annonce.TypeDeBien}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div className="prose max-w-none">
              {annonce.Description.split("\n").map((paragraph, index) => (
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
                <Badge variant={annonce.Garage ? "default" : "outline"} className="h-8">
                  <Car className="h-4 w-4 mr-2" />
                  Garage
                </Badge>
                <span>{annonce.Garage ? "Oui" : "Non"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={annonce.Piscine ? "default" : "outline"} className="h-8">
                  <Pool className="h-4 w-4 mr-2" />
                  Piscine
                </Badge>
                <span>{annonce.Piscine ? "Oui" : "Non"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={annonce.Meuble ? "default" : "outline"} className="h-8">
                  <Sofa className="h-4 w-4 mr-2" />
                  Meublé
                </Badge>
                <span>{annonce.Meuble ? "Oui" : "Non"}</span>
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
                  {annonce.ParticulierPro === "Particulier" ? (
                    <User className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Building className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span>{annonce.ParticulierPro}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Publié le {formattedDate}</span>
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
                  {annonce.ParticulierPro === "Particulier" ? (
                    <User className="h-6 w-6" />
                  ) : (
                    <Building className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{annonce.LeCompte}</p>
                  <p className="text-sm text-muted-foreground">{annonce.ParticulierPro}</p>
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

