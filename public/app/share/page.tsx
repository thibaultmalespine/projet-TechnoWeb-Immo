"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { type Annonce } from "@/lib/services/annoncesServices"
import { formatPrice } from "@/lib/utils"
import { AlertCircle, ArrowLeft, ChevronLeft, ChevronRight, Home } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AnnoncePageShared() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [annonce, setAnnonce] = useState<Annonce | null>(null)
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    try {
      const storedAnnonce = localStorage.getItem('sharedAnnonce')
      if (storedAnnonce) {
        const parsedAnnonce = JSON.parse(storedAnnonce) as Annonce
        setAnnonce(parsedAnnonce)
      } else {
        setError("Aucune annonce trouvée dans le stockage local")
      }
    } catch (err) {
      setError("Erreur lors de la récupération de l'annonce")
      console.error("Error parsing annonce from localStorage:", err)
    }
  }, [])

  // Carousel navigation
  const nextSlide = () => {
    if (annonce?.cheminsimages?.length) {
      setCurrentSlide((prev) => 
        prev === annonce.cheminsimages!.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevSlide = () => {
    if (annonce?.cheminsimages?.length) {
      setCurrentSlide((prev) => 
        prev === 0 ? annonce.cheminsimages!.length - 1 : prev - 1
      )
    }
  }

  // Determine what to display - carousel, single image, or placeholder
  const renderImageSection = () => {
    if (annonce?.cheminsimages && annonce.cheminsimages.length > 1) {
      // Render carousel for multiple images
      return (
        <div className="relative">
          <Image
            src={annonce.cheminsimages[currentSlide]}
            alt={`Photo de ${annonce.nomannonce} (${currentSlide + 1}/${annonce.cheminsimages.length})`}
            width={800}
            height={400}
            className="w-full h-64 object-cover"
          />
          
          {/* Carousel Controls */}
          <div className="absolute inset-0 flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost" 
              size="icon"
              className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Slide indicators */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {annonce.cheminsimages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? "bg-primary" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      )
    } else if (annonce?.cheminsimages && annonce.cheminsimages.length === 1) {
      // Render single image
      return (
        <Image
          src={annonce.cheminsimages[0]}
          alt={`Photo de ${annonce.nomannonce}`}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        />
      )
    } else {
      // Render placeholder
      return (
        <Image
          src="/placeholder.svg"
          alt={`Photo de ${annonce?.nomannonce || 'bien immobilier'}`}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        />
      )
    }
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button className="mt-4" variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
      </div>
    )
  }

  if (!annonce) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Alert>
          <AlertTitle>Annonce non trouvée</AlertTitle>
          <AlertDescription>L&apos;annonce que vous cherchez n&apos;existe pas ou n&apos;a pas été partagée correctement.</AlertDescription>
        </Alert>
        <Button className="mt-4" variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Button variant="outline" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
      </Button>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">{annonce.nomannonce}</CardTitle>
        </CardHeader>

        {renderImageSection()}

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Home className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg font-medium">{annonce.typedebien || "Non spécifié"}</span>
            </div>
            <div className="text-2xl font-bold text-right">
              {annonce.prix ? `${formatPrice(annonce.prix)} €` : "Prix non spécifié"}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{annonce.descriptionbien || "Aucune description disponible"}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Localisation</p>
              <p>
                {annonce.nomville} {annonce.codepostal && `(${annonce.codepostal})`}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Surface habitable</p>
              <p>{annonce.m2habitable ? `${annonce.m2habitable} m²` : "Non spécifié"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Terrain</p>
              <p>{annonce.m2terrains ? `${annonce.m2terrains} m²` : "Non spécifié"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Type de vendeur</p>
              <p>{annonce.particulierpro || "Non spécifié"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Caractéristiques</p>
              <p>
                {[annonce.meuble && "Meublé", annonce.garage && "Garage", annonce.piscine && "Piscine"]
                  .filter(Boolean)
                  .join(", ") || "Aucune information"}
              </p>
            </div>
          </div>

          {annonce.urloriginale && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Lien original</h3>
                <a
                  href={annonce.urloriginale}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Voir l&apos;annonce originale
                </a>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
