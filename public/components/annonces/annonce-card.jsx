import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { Building, Car, Home, MapPin, Maximize2, PocketIcon as Pool, Ruler, Sofa, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function AnnonceCard({ annonce }) {
  // Fonction pour formater le prix avec des espaces entre les milliers
  const formattedPrice = formatPrice(annonce.prix)

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={"/placeholder.svg?height=400&width=600"}
          alt={annonce.nomannonce}
          fill
          className="object-cover"
        />
        <Badge
          className="absolute top-2 right-2"
          variant={annonce.particulierpro === "Particulier" ? "secondary" : "default"}
        >
          {annonce.particulierpro}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl line-clamp-2">{annonce.nomannonce}</CardTitle>
          <p className="font-bold text-xl text-primary">{formattedPrice} €</p>
        </div>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {annonce.codepostal} {annonce.nomville}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2 flex-grow">
        <div className="grid grid-cols-2 gap-y-2 mb-4">
          <div className="flex items-center gap-1 text-sm">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span>{annonce.typedebien}</span>
          </div>

          {annonce.m2habitable && (
            <div className="flex items-center gap-1 text-sm">
              <Maximize2 className="h-4 w-4 text-muted-foreground" />
              <span>{annonce.m2habitable} m²</span>
            </div>
          )}

          {annonce.m2terrains > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              <span>Terrain: {annonce.m2terrains} m²</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {annonce.garage && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Car className="h-3 w-3" />
              Garage
            </Badge>
          )}

          {annonce.piscine && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Pool className="h-3 w-3" />
              Piscine
            </Badge>
          )}

          {annonce.meuble && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Sofa className="h-3 w-3" />
              Meublé
            </Badge>
          )}
        </div>

        {annonce.description && <p className="text-sm text-muted-foreground line-clamp-3">{annonce.description}</p>}
      </CardContent>

      <CardFooter className="pt-2 border-t flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {annonce.particulierpro === "Particulier" ? <User className="h-4 w-4" /> : <Building className="h-4 w-4" />}
          <span>{annonce.lecompte}</span>
        </div>

        <Link href={`/annonces/${annonce.idannonce}`} className="text-sm font-medium text-primary hover:underline">
          Voir détails
        </Link>
      </CardFooter>
    </Card>
  )
}

