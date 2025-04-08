"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AnnonceCard } from "./annonce-card"
import { AnnoncesFilters } from "./annonces-filters"

export function AnnoncesList({ annonces: initialAnnonces }) {
  const router = useRouter()
  const [annonces, setAnnonces] = useState(initialAnnonces || [])
  const [filteredAnnonces, setFilteredAnnonces] = useState(initialAnnonces || [])
  const [sortOption, setSortOption] = useState("recent")

  useEffect(() => {
    if (initialAnnonces) {
      console.log(initialAnnonces);
      
      setAnnonces(initialAnnonces)
      setFilteredAnnonces(initialAnnonces)
    }
  }, [initialAnnonces])

  const handleFilterChange = (filters) => {
    let filtered = [...annonces]

    // Filtre par recherche textuelle
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (annonce) =>
          annonce.nomannonce.toLowerCase().includes(searchLower) ||
          annonce.description?.toLowerCase().includes(searchLower) ||
          annonce.nomville.toLowerCase().includes(searchLower),
      )
    }

    // Filtre par type de bien
    if (filters.typedebien) {
      filtered = filtered.filter((annonce) => annonce.typedebien === filters.typedebien)
    }

    // Filtre par prix
    filtered = filtered.filter((annonce) => annonce.prix >= filters.prixMin && annonce.prix <= filters.prixMax)

    // Filtre par surface
    if (filters.surfaceMin > 0) {
      filtered = filtered.filter((annonce) => annonce.m2habitable >= filters.surfaceMin)
    }

    // Filtre par vendeur
    if (filters.particulierpro) {
      filtered = filtered.filter((annonce) => annonce.particulierpro === filters.particulierpro)
    }

    // Filtres booléens
    if (filters.garage) {
      filtered = filtered.filter((annonce) => annonce.garage)
    }

    if (filters.piscine) {
      filtered = filtered.filter((annonce) => annonce.piscine)
    }

    if (filters.meuble) {
      filtered = filtered.filter((annonce) => annonce.meuble)
    }

    setFilteredAnnonces(filtered)
  }

  const handleSortChange = (value) => {
    setSortOption(value)
    const sorted = [...filteredAnnonces]

    switch (value) {
      case "prixAsc":
        sorted.sort((a, b) => a.prix - b.prix)
        break
      case "prixDesc":
        sorted.sort((a, b) => b.prix - a.prix)
        break
      case "surfaceDesc":
        sorted.sort((a, b) => (b.m2habitable || 0) - (a.m2habitable || 0))
        break
      case "recent":
        // Ici on suppose que les annonces les plus récentes ont un ID plus élevé
        sorted.sort((a, b) => b.idannonce - a.idannonce)
        break
      default:
        break
    }

    setFilteredAnnonces(sorted)
  }

  const handleAddAnnonce = () => {
    router.push("/annonces/ajouter")
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold">
            {filteredAnnonces.length} annonce{filteredAnnonces.length !== 1 ? "s" : ""} disponible
            {filteredAnnonces.length !== 1 ? "s" : ""}
          </h2>

          <Button onClick={handleAddAnnonce} className="bg-primary hover:bg-primary/90 cursor-pointer">
            <Plus className="mr-2 h-4 w-4" /> Ajouter une annonce
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Trier par:</span>
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px] cursor-pointer" >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Plus récentes</SelectItem>
              <SelectItem value="prixAsc">Prix croissant</SelectItem>
              <SelectItem value="prixDesc">Prix décroissant</SelectItem>
              <SelectItem value="surfaceDesc">Surface décroissante</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AnnoncesFilters onFilterChange={handleFilterChange} />

      {filteredAnnonces.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Aucune annonce trouvée</AlertTitle>
          <AlertDescription>
            Aucune annonce ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnonces.map((annonce) => (
            <AnnonceCard key={annonce.idannonce} annonce={annonce} />
          ))}
        </div>
      )}
    </div>
  )
}

