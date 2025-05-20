// annonces-filters.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Annonce } from "@/lib/services/annoncesServices"
import { Search, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

type VendeurType = "Particulier" | "Professionnel";

type AnnonceFiltersProps = {
  onFilterChange: (filters: Partial<Annonce> & { search?: string; prixMin?: number; prixMax?: number; surfaceMin?: number; surfaceMax?: number }) => void
  sortOption: string;
  onSortChange: (value: string) => void;
}

export function AnnonceFilters({ onFilterChange, sortOption, onSortChange }: AnnonceFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    typedebien: "",
    prixMin: 0,
    prixMax: 1000000,
    surfaceMin: 0,
    surfaceMax: 0,
    particulierpro: undefined as VendeurType | undefined,
    garage: false,
    piscine: false,
    meuble: false,
  })

  const handleFilterChange = (key: string, value: string | number | boolean | undefined) => {
    let processedValue = value;
    if (key === "particulierpro" && value === "Tous") {
      processedValue = undefined;
    } else if (key !== "particulierpro" && value === "Tous") {
      processedValue = "";
    }
    
    const newFilters = { ...filters, [key]: processedValue }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      search: "",
      typedebien: "",
      prixMin: 0,
      prixMax: 1000000,
      surfaceMin: 0,
      surfaceMax:0,
      particulierpro: undefined,
      garage: false,
      piscine: false,
      meuble: false,
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher une annonce..."
            className="pl-8"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={filters.typedebien} onValueChange={(value) => handleFilterChange("typedebien", value)}>
            <SelectTrigger className="w-[180px] cursor-pointer">
              <SelectValue placeholder="Type de bien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tous">Tous les types</SelectItem>
              <SelectItem value="Appartement">Appartement</SelectItem>
              <SelectItem value="Maison">Maison</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
              <SelectItem value="Terrain">Terrain</SelectItem>
              <SelectItem value="Local commercial">Local commercial</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">Trier par:</span>
            <Select value={sortOption} onValueChange={onSortChange}>
              <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récentes</SelectItem>
                <SelectItem value="prixAsc">Prix croissant</SelectItem>
                <SelectItem value="prixDesc">Prix décroissant</SelectItem>
                <SelectItem value="surfaceAsc">Surface croissante</SelectItem>
                <SelectItem value="surfaceDesc">Surface décroissante</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 cursor-pointer border-1 border-solid">
                <SlidersHorizontal className="h-4 w-4 " />
                Filtres
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 border-1 border-solid">
              <div className="grid gap-4">
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Prix</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="prixMin">Min</Label>
                      <Input
                        id="prixMin"
                        type="number"
                        value={String(Number(filters.prixMin))}
                        onChange={(e) => handleFilterChange("prixMin", Number(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prixMax">Max</Label>
                      <Input
                        id="prixMax"
                        type="number"
                        value={String(Number(filters.prixMax))}
                        onChange={(e) => handleFilterChange("prixMax", Number(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Surface (m²)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="surfaceMin">Min</Label>
                      <Input
                        id="surfaceMin"
                        type="number"
                        value={String(Number(filters.surfaceMin))}
                        onChange={(e) => handleFilterChange("surfaceMin", Number(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surfaceMax">Max</Label>
                      <Input
                        id="surfaceMax"
                        type="number"
                        value={String(Number(filters.surfaceMax))}
                        onChange={(e) => handleFilterChange("surfaceMax", Number(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-lg">Vendeur</h4>
                  <Select
                    value={filters.particulierpro ?? "Tous"}
                    onValueChange={(value) => handleFilterChange("particulierpro", value)}
                  >
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Tous" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tous">Tous</SelectItem>
                      <SelectItem value="Particulier">Particulier</SelectItem>
                      <SelectItem value="Professionnel">Professionnel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-lg">Caractéristiques</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="garage">Garage</Label>
                      <Switch
                        id="garage"
                        checked={filters.garage}
                        onCheckedChange={(checked) => handleFilterChange("garage", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="piscine">Piscine</Label>
                      <Switch
                        id="piscine"
                        checked={filters.piscine}
                        onCheckedChange={(checked) => handleFilterChange("piscine", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="meuble">Meublé</Label>
                      <Switch
                        id="meuble"
                        checked={filters.meuble}
                        onCheckedChange={(checked) => handleFilterChange("meuble", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Button variant="outline" onClick={handleReset} className="cursor-pointer">
                  Réinitialiser les filtres
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
