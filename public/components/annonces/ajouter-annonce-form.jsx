"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function AjouterAnnonceForm({ onSubmit, isSubmitting = false }) {
  // État local pour les données du formulaire
  const [formData, setFormData] = useState({
    urloriginale: "",
    nomannonce: "",
    codep: "",
    ville: "",
    type: "",
    m2_habitable: "",
    m2_terrain: "",
    prix: "",
    particulier_pro: "Particulier",
    garage: false,
    piscine: false,
    meuble: false,
    description: "",
  })

  // Gestion des changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Gestion des changements pour les champs checkbox
  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  // Gestion des changements pour les champs select
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nouvelle annonce immobilière</CardTitle>
        <CardDescription>Remplissez tous les champs pour créer votre annonce immobilière.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations générales */}
            <div className="space-y-2">
              <Label htmlFor="nomannonce">Titre de l'annonce*</Label>
              <Input
                id="nomannonce"
                name="nomannonce"
                placeholder="Appartement T3 avec vue"
                value={formData.nomannonce}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="urloriginale">URL d'origine*</Label>
              <Input
                id="urloriginale"
                name="urloriginale"
                placeholder="https://exemple.com/annonce"
                value={formData.urloriginale}
                onChange={handleChange}
              />
            </div>

            {/* Localisation */}
            <div className="space-y-2">
              <Label htmlFor="codep">Code postal*</Label>
              <Input
                id="codep"
                name="codep"
                placeholder="75001"
                maxLength={5}
                value={formData.codep}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ville">Ville*</Label>
              <Input
                id="ville"
                name="ville"
                placeholder="Paris"
                value={formData.ville}
                onChange={handleChange}
              />
            </div>

            {/* Type de bien */}
            <div className="space-y-2">
              <Label htmlFor="type">Type de bien*</Label>
              <Select onValueChange={(value) => handleSelectChange("type", value)} value={formData.type}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionnez un type de bien" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Appartement">Appartement</SelectItem>
                  <SelectItem value="Maison">Maison</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Terrain">Terrain</SelectItem>
                  <SelectItem value="Local commercial">Local commercial</SelectItem>
                  <SelectItem value="Immeuble">Immeuble</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* prix */}
            <div className="space-y-2">
              <Label htmlFor="prix">Prix (€)*</Label>
              <Input
                id="prix"
                name="prix"
                type="number"
                placeholder="150000"
                value={formData.prix}
                onChange={handleChange}
              />
            </div>

            {/* Surfaces */}
            <div className="space-y-2">
              <Label htmlFor="m2_habitable">Surface habitable (m²)*</Label>
              <Input
                id="m2_habitable"
                name="m2_habitable"
                type="number"
                placeholder="80"
                value={formData.m2_habitable}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="m2_terrain">Surface du terrain (m²)</Label>
              <Input
                id="m2_terrain"
                name="m2_terrain"
                type="number"
                placeholder="200"
                value={formData.m2_terrain}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Statut vendeur */}
          <div className="space-y-3">
            <Label>Statut du vendeur*</Label>
            <RadioGroup
              value={formData.particulier_pro}
              onValueChange={(value) => handleSelectChange("particulier_pro", value)}
              className="flex flex-row space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Particulier" id="particulier" />
                <Label htmlFor="particulier" className="font-normal">
                  Particulier
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Professionnel" id="professionnel" />
                <Label htmlFor="professionnel" className="font-normal">
                  Professionnel
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <Checkbox
                id="garage"
                checked={formData.garage}
                onCheckedChange={(checked) => handleCheckboxChange("garage", checked)}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="garage">Garage</Label>
                <p className="text-sm text-muted-foreground">Le bien dispose d'un garage</p>
              </div>
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <Checkbox
                id="piscine"
                checked={formData.piscine}
                onCheckedChange={(checked) => handleCheckboxChange("piscine", checked)}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="piscine">Piscine</Label>
                <p className="text-sm text-muted-foreground">Le bien dispose d'une piscine</p>
              </div>
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <Checkbox
                id="meuble"
                checked={formData.meuble}
                onCheckedChange={(checked) => handleCheckboxChange("meuble", checked)}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="meuble">Meublé</Label>
                <p className="text-sm text-muted-foreground">Le bien est vendu meublé</p>
              </div>
            </div>
          </div>

          {/* description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Décrivez votre bien immobilier en détail..."
              className="min-h-[120px]"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Ajouter l'annonce"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

