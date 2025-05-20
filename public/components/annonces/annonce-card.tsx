import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Annonce } from "@/lib/services/annoncesServices"
import { formatPrice } from "@/lib/utils"
import {
  Building,
  Car,
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

export function AnnonceCard({ annonce, showDetails = true }: { annonce: Annonce, showDetails?: boolean }) {
  const formattedPrice = annonce.prix && formatPrice(annonce.prix)
  
  // Get image source - use first image from cheminsimages if available, otherwise use placeholder
  const imageSrc = annonce.cheminsimages && annonce.cheminsimages.length > 0
    ? `${annonce.cheminsimages[0]}`
    : "/placeholder.svg?height=400&width=600";

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={imageSrc}
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
        <div className="flex flex-col justify-between items-start">
          <CardTitle className="text-xl line-clamp-2 w-[97%]" >{annonce.nomannonce}</CardTitle>
          <p className="font-bold text-xl text-primary ">{formattedPrice} €</p>
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
          {annonce.m2terrains && annonce.m2terrains > 0 ? (
            <div className="flex items-center gap-1 text-sm">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              <span>Terrain: {annonce.m2terrains} m²</span>
            </div>
          ) : (<></>)} 
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

        {annonce.descriptionbien && (
          <p className="text-sm text-muted-foreground line-clamp-3">{annonce.descriptionbien}</p>
        )}
      </CardContent>

      <CardFooter className="pt-2 border-t flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {annonce.particulierpro === "Particulier" ? (
            <User className="h-4 w-4" />
          ) : (
            <Building className="h-4 w-4" />
          )}
        </div>

        {showDetails && (
          <Link href={`/annonce/${annonce.idannonce}`} className="text-sm font-medium text-primary hover:underline">
            Voir détails
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
