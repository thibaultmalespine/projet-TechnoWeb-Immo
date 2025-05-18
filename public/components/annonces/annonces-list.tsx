"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Annonce } from "@/lib/services/annoncesServices";
import { AlertCircle, MapPin, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnnonceCard } from "./annonce-card";
import { AnnoncesFilters } from "./annonces-filters";

interface AnnoncesListProps {
  annonces: Annonce[];
}

export function AnnoncesList({ annonces: initialAnnonces }: AnnoncesListProps) {
  const router = useRouter();
  const [annonces, setAnnonces] = useState<Annonce[]>(initialAnnonces || []);
  const [filteredAnnonces, setFilteredAnnonces] = useState<Annonce[]>(initialAnnonces || []);
  const [sortOption, setSortOption] = useState<string>("recent");

  useEffect(() => {
    if (initialAnnonces) {
      setAnnonces(initialAnnonces);
      setFilteredAnnonces(initialAnnonces);
    }
  }, [initialAnnonces]);

  const handleFilterChange = (filters: Partial<Annonce> & {
    search?: string;
    prixMin?: number;
    prixMax?: number;
    surfaceMin?: number;
  }) => {
    let filtered = [...annonces];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (annonce) =>
          annonce.nomannonce.toLowerCase().includes(searchLower) ||
          annonce.description?.toLowerCase().includes(searchLower) ||
          annonce.nomville?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.typedebien) {
      filtered = filtered.filter((annonce) => annonce.typedebien === filters.typedebien);
    }

    if (filters.prixMin !== undefined && filters.prixMax !== undefined) {
      filtered = filtered.filter(
        (annonce) =>
          (annonce.prix ?? 0) >= filters.prixMin! &&
          (annonce.prix ?? 0) <= filters.prixMax!
      );
    }

    if (filters.surfaceMin !== undefined && filters.surfaceMin > 0) {
      filtered = filtered.filter((annonce) => (annonce.m2habitable ?? 0) >= filters.surfaceMin!);
    }

    if (filters.particulierpro) {
      filtered = filtered.filter((annonce) => annonce.particulierpro === filters.particulierpro);
    }

    if (filters.garage) {
      filtered = filtered.filter((annonce) => annonce.garage);
    }

    if (filters.piscine) {
      filtered = filtered.filter((annonce) => annonce.piscine);
    }

    if (filters.meuble) {
      filtered = filtered.filter((annonce) => annonce.meuble);
    }

    setFilteredAnnonces(filtered);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const sorted = [...filteredAnnonces];

    switch (value) {
      case "prixAsc":
        sorted.sort((a, b) => (a.prix ?? 0) - (b.prix ?? 0));
        break;
      case "prixDesc":
        sorted.sort((a, b) => (b.prix ?? 0) - (a.prix ?? 0));
        break;
      case "surfaceDesc":
        sorted.sort((a, b) => (b.m2habitable ?? 0) - (a.m2habitable ?? 0));
        break;
      case "recent":
        sorted.sort((a, b) => parseInt(b.idannonce) - parseInt(a.idannonce));
        break;
      default:
        break;
    }

    setFilteredAnnonces(sorted);
  };

  const handleAddAnnonce = () => {
    router.push("/annonce/create");
  };

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
            <Button onClick={() => router.push('/map')} className="bg-primary hover:bg-primary/90 cursor-pointer">
              <MapPin className="mr-2 h-4 w-4" /> Voir sur la map
            </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Trier par:</span>
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px] cursor-pointer ">
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
  );
}
