// ajouter-annonce-form.tsx
"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Annonce } from "@/lib/services/annoncesServices"
import { useState } from "react"

type AnnonceAjouterFormProps = {
  onSubmit: (data: Partial<Annonce>) => void
  isSubmitting?: boolean
}

export function AnnonceAjouterForm({ onSubmit, isSubmitting = false }: AnnonceAjouterFormProps) {
  const [formData, setFormData] = useState<Partial<Annonce>>({
    urloriginale: "",
    nomannonce: "",
    codepostal: "",
    nomville: "",
    typedebien: "",
    m2habitable: undefined,
    m2terrains: undefined,
    prix: undefined,
    particulierpro: "Particulier",
    garage: false,
    piscine: false,
    meuble: false,
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: keyof Annonce, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: keyof Annonce, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
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
            <div className="space-y-2">
              <Label htmlFor="nomannonce">Titre de l&apos;annonce*</Label>
              <Input id="nomannonce" name="nomannonce" value={formData.nomannonce || ""} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="urloriginale">URL d&apos;origine*</Label>
              <Input id="urloriginale" name="urloriginale" value={formData.urloriginale || ""} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codepostal">Code postal*</Label>
              <Input id="codepostal" name="codepostal" maxLength={5} value={formData.codepostal || ""} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nomville">Ville*</Label>
              <Input id="nomville" name="nomville" value={formData.nomville || ""} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="typedebien">Type de bien*</Label>
              <Select onValueChange={(value) => handleSelectChange("typedebien", value)} value={formData.typedebien}>
                <SelectTrigger id="typedebien">
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

            <div className="space-y-2">
              <Label htmlFor="prix">Prix (€)*</Label>
              <Input id="prix" name="prix" type="number" value={formData.prix ?? ""} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="m2habitable">Surface habitable (m²)*</Label>
              <Input id="m2habitable" name="m2habitable" type="number" value={formData.m2habitable ?? ""} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="m2terrains">Surface du terrain (m²)</Label>
              <Input id="m2terrains" name="m2terrains" type="number" value={formData.m2terrains ?? ""} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Statut du vendeur*</Label>
            <RadioGroup
              value={formData.particulierpro}
              onValueChange={(value : 'Particulier' | 'Professionnel') => handleSelectChange("particulierpro", value)}
              className="flex flex-row space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Particulier" id="particulier" />
                <Label htmlFor="particulier" className="font-normal">Particulier</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Professionnel" id="professionnel" />
                <Label htmlFor="professionnel" className="font-normal">Professionnel</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <Checkbox
                id="garage"
                checked={!!formData.garage}
                onCheckedChange={(checked) => handleCheckboxChange("garage", !!checked)}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="garage">Garage</Label>
                <p className="text-sm text-muted-foreground">Le bien dispose d&apos;un garage</p>
              </div>
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <Checkbox
                id="piscine"
                checked={!!formData.piscine}
                onCheckedChange={(checked) => handleCheckboxChange("piscine", !!checked)}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="piscine">Piscine</Label>
                <p className="text-sm text-muted-foreground">Le bien dispose d&apos;une piscine</p>
              </div>
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <Checkbox
                id="meuble"
                checked={!!formData.meuble}
                onCheckedChange={(checked) => handleCheckboxChange("meuble", !!checked)}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="meuble">Meublé</Label>
                <p className="text-sm text-muted-foreground">Le bien est vendu meublé</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="min-h-[120px]"
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
