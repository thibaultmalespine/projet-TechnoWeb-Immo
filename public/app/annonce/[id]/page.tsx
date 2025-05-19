"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { type Annonce, deleteAnnonce, getAnnonceByID } from "@/lib/services/annoncesServices"
import { AlertCircle, ArrowLeft, Edit, Home, Trash } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AnnoncePage() {
  const router = useRouter()
  const [annonce, setAnnonce] = useState<Annonce | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  // Unwrap the promise here
  const { id } = useParams()

  useEffect(() => {
    async function loadAnnonce() {
      try {
        if (id) {
          const data = await getAnnonceByID(id.toString())
          setAnnonce(data)
        }
      } catch {
        setError("Erreur lors du chargement de l'annonce")
      } finally {
        setLoading(false)
      }
    }

    loadAnnonce()
  }, [id]) // Now 'id' is a dependency in the useEffect hook

  const handleDelete = async () => {
    try {
      if(id){
        await deleteAnnonce(id?.toString())
      }
      
      router.push("/annonce")
    } catch (err) {
      setError((err as Error).message || "Erreur lors de la suppression")
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Skeleton className="h-8 w-64 mb-6" />
        <Skeleton className="h-64 w-full mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button className="mt-4" variant="outline" onClick={() => router.push("/annonce")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour au tableau de bord
        </Button>
      </div>
    )
  }

  if (!annonce) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Alert>
          <AlertTitle>Annonce non trouvée</AlertTitle>
          <AlertDescription>L&apos;annonce que vous cherchez n&apos;existe pas ou a été supprimée.</AlertDescription>
        </Alert>
        <Button className="mt-4" variant="outline" onClick={() => router.push("/annonce")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour au tableau de bord
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Button variant="outline" className="mb-6" onClick={() => router.push("/annonce")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux annonces
      </Button>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-2xl">{annonce.nomannonce}</CardTitle>
          <div className="space-x-2">
            <Button variant="outline" size="icon" onClick={() => router.push(`/annonce/${id}/edit`)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon" onClick={() => setConfirmDelete(true)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <Image
          src="/placeholder.svg"
          alt={`Photo de ${annonce.nomannonce}`}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        />

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Home className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg font-medium">{annonce.typedebien || "Non spécifié"}</span>
            </div>
            <div className="text-2xl font-bold text-right">
              {annonce.prix ? `${annonce.prix.toLocaleString()} €` : "Prix non spécifié"}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{annonce.description || "Aucune description disponible"}</p>
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

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette annonce ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible et supprimera définitivement l&apos;annonce {annonce.nomannonce}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
