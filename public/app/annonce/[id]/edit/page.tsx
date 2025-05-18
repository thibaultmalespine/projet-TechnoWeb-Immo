"use client"

import type React from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { type Annonce, getAnnonceByID, updateAnnonce } from "@/lib/services/annoncesServices"
import { AlertCircle } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditAnnoncePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [annonce, setAnnonce] = useState<Annonce | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { id } = useParams(); 
  
  // Effet pour charger l'annonce au chargement de la page
  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        setLoading(true)
        if (id) {
            const annonce = await getAnnonceByID(id?.toString())
            setAnnonce(annonce)
        }
      } catch (err) {
        setError("Erreur lors du chargement de l'annonce")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnonce()
  }, [id])

  const handleChange = (field: keyof Annonce, value: unknown) => {
    if (!annonce) return

    setAnnonce({
      ...annonce,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!annonce) return

    try {
      setLoading(true)

      // Utiliser la fonction updateAnnonce du service
      if (id) {
          await updateAnnonce(id.toString(), annonce)
      }

      // Rediriger vers la page de détail après la sauvegarde
      router.push(`/annonce/${id}`)
    } catch (err) {
      setError("Erreur lors de la sauvegarde des modifications")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !annonce) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center">
          <p>Chargement en cours...</p>
        </div>
      </div>
    )
  }

  if (error && !annonce) {
      <div className="max-w-md mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button 
          className="mt-4"
          variant="outline"
          onClick={() => router.push("/annonce")}
        >
          Retour au tableau de bord
        </Button>
      </div>
  }

  if (!annonce) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center">
          <p className="text-red-500">Annonce non trouvée</p>
          <Button 
          className="mt-4"
          variant="outline"
          onClick={() => router.push("/annonce")}
        >
          Retour au tableau de bord
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Modifier l&apos;annonce</CardTitle>
          <CardDescription>Modifiez les informations de votre annonce immobilière</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Informations générales */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informations générales</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomannonce">Titre de l&apos;annonce</Label>
                  <Input
                    id="nomannonce"
                    value={annonce.nomannonce}
                    onChange={(e) => handleChange("nomannonce", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urloriginale">URL originale</Label>
                  <Input
                    id="urloriginale"
                    value={annonce.urloriginale}
                    onChange={(e) => handleChange("urloriginale", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={annonce.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </div>

            {/* Localisation */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Localisation</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codepostal">Code postal</Label>
                  <Input
                    id="codepostal"
                    value={annonce.codepostal}
                    onChange={(e) => handleChange("codepostal", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nomville">Ville</Label>
                  <Input
                    id="nomville"
                    value={annonce.nomville}
                    onChange={(e) => handleChange("nomville", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Caractéristiques du bien */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Caractéristiques du bien</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="typedebien">Type de bien</Label>
                  <Select value={annonce.typedebien || ""} onValueChange={(value) => handleChange("typedebien", value)}>
                    <SelectTrigger id="typedebien">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Appartement">Appartement</SelectItem>
                      <SelectItem value="Maison">Maison</SelectItem>
                      <SelectItem value="Studio">Studio</SelectItem>
                      <SelectItem value="Terrain">Terrain</SelectItem>
                      <SelectItem value="Commerce">Commerce</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prix">Prix (€)</Label>
                  <Input
                    id="prix"
                    type="number"
                    value={annonce.prix}
                    onChange={(e) => handleChange("prix", Number(e.target.value))}
                    required
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="particulierpro">Vendeur</Label>
                  <Select
                    value={annonce.particulierpro || ""}
                    onValueChange={(value) => handleChange("particulierpro", value)}
                  >
                    <SelectTrigger id="particulierpro">
                      <SelectValue placeholder="Type de vendeur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Particulier">Particulier</SelectItem>
                      <SelectItem value="Professionnel">Professionnel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="m2habitable">Surface habitable (m²)</Label>
                  <Input
                    id="m2habitable"
                    type="number"
                    value={annonce.m2habitable}
                    onChange={(e) => handleChange("m2habitable", Number(e.target.value))}
                    required
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="m2terrains">Surface du terrain (m²)</Label>
                  <Input
                    id="m2terrains"
                    type="number"
                    value={annonce.m2terrains || ""}
                    onChange={(e) => handleChange("m2terrains", e.target.value ? Number(e.target.value) : undefined)}
                    min="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="meuble"
                    checked={annonce.meuble || false}
                    onCheckedChange={(checked) => handleChange("meuble", checked)}
                  />
                  <Label htmlFor="meuble">Meublé</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="garage"
                    checked={annonce.garage || false}
                    onCheckedChange={(checked) => handleChange("garage", checked)}
                  />
                  <Label htmlFor="garage">Garage</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="piscine"
                    checked={annonce.piscine || false}
                    onCheckedChange={(checked) => handleChange("piscine", checked)}
                  />
                  <Label htmlFor="piscine">Piscine</Label>
                </div>
              </div>
            </div>

            {/* Champ caché pour lecompte */}
            <input type="hidden" value={annonce.lecompte} />

            {error && <p className="text-red-500">{error}</p>}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
