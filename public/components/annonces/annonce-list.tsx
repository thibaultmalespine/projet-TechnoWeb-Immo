"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Annonce } from "@/lib/services/annoncesServices";
import { generateShareLink } from "@/lib/services/shareService";
import { ClipboardCopyIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnnonceContent } from "./annonce-content";
import { AnnonceFilters } from "./annonce-filters";
import { AnnonceListHeader } from "./annonce-list-header";

interface AnnoncesListProps {
  annonces: Annonce[];
  showHeader?: boolean;
  isShared?: boolean;
}

type SortOption = "recent" | "prixAsc" | "prixDesc" | "surfaceAsc" | "surfaceDesc";

type AnnonceFiltersType = Partial<Annonce> & {
  search?: string;
  prixMin?: number;
  prixMax?: number;
  surfaceMin?: number;
  surfaceMax?: number;
};

export function AnnonceList({ annonces: initialAnnonces, showHeader = true, isShared = false }: AnnoncesListProps) {
  const router = useRouter();
  const [annonces, setAnnonces] = useState<Annonce[]>(initialAnnonces || []);
  const [filteredAnnonces, setFilteredAnnonces] = useState<Annonce[]>(initialAnnonces || []);
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    if (initialAnnonces) {
      setAnnonces(initialAnnonces);
      setFilteredAnnonces(initialAnnonces);
    }
  }, [initialAnnonces]);

  const handleFilterChange = (filters: AnnonceFiltersType) => {
    let filtered = [...annonces];
    filtered = applyTextSearch(filtered, filters.search);
    filtered = applyTypeFilter(filtered, filters.typedebien);
    filtered = applyPriceFilter(filtered, filters.prixMin, filters.prixMax);
    filtered = applySurfaceFilter(filtered, filters.surfaceMin, filters.surfaceMax);
    filtered = applySellerTypeFilter(filtered, filters.particulierpro);
    filtered = applyFeaturesFilter(filtered, {
      garage: filters.garage,
      piscine: filters.piscine,
      meuble: filters.meuble,
    });

    // Apply current sort option after filtering
    filtered = sortAnnonces(filtered, sortOption);

    setFilteredAnnonces(filtered);
  };

  const applyTextSearch = (annonces: Annonce[], searchTerm?: string): Annonce[] => {
    if (!searchTerm) return annonces;

    const searchLower = searchTerm.toLowerCase();
    return annonces.filter(
      (annonce) =>
        annonce.nomannonce.toLowerCase().includes(searchLower) ||
        annonce.descriptionbien?.toLowerCase().includes(searchLower) ||
        annonce.nomville?.toLowerCase().includes(searchLower)
    );
  };

  const applyTypeFilter = (annonces: Annonce[], propertyType?: string): Annonce[] => {
    if (!propertyType) return annonces;
    return annonces.filter((annonce) => annonce.typedebien === propertyType);
  };

  const applyPriceFilter = (annonces: Annonce[], min?: number, max?: number): Annonce[] => {
    if (min === undefined && max === undefined) return annonces;

    return annonces.filter((annonce) => {
      const price = annonce.prix ?? 0;
      const aboveMin = min === undefined || price >= min;
      const belowMax = max === undefined || price <= max;
      return aboveMin && belowMax;
    });
  };

  const applySurfaceFilter = (annonces: Annonce[], min?: number, max?: number): Annonce[] => {
    let filtered = annonces;

    if (min !== undefined && min > 0) {
      filtered = filtered.filter((annonce) => (annonce.m2habitable ?? 0) >= min);
    }

    if (max !== undefined && max > 0) {
      filtered = filtered.filter((annonce) => (annonce.m2habitable ?? 0) <= max);
    }

    return filtered;
  };

  const applySellerTypeFilter = (annonces: Annonce[], sellerType?: string): Annonce[] => {
    if (!sellerType) return annonces;
    return annonces.filter((annonce) => annonce.particulierpro === sellerType);
  };

  const applyFeaturesFilter = (
    annonces: Annonce[],
    features: { garage?: boolean; piscine?: boolean; meuble?: boolean }
  ): Annonce[] => {
    let filtered = annonces;

    if (features.garage) {
      filtered = filtered.filter((annonce) => annonce.garage);
    }

    if (features.piscine) {
      filtered = filtered.filter((annonce) => annonce.piscine);
    }

    if (features.meuble) {
      filtered = filtered.filter((annonce) => annonce.meuble);
    }

    return filtered;
  };

  const handleSortChange = (value: string) => {
    setSortOption(value as SortOption);
    const sorted = sortAnnonces(filteredAnnonces, value as SortOption);
    setFilteredAnnonces(sorted);
  };

  const sortAnnonces = (annonces: Annonce[], sortBy: SortOption): Annonce[] => {
    const sorted = [...annonces];

    switch (sortBy) {
      case "prixAsc":
        return sorted.sort((a, b) => (a.prix ?? 0) - (b.prix ?? 0));
      case "prixDesc":
        return sorted.sort((a, b) => (b.prix ?? 0) - (a.prix ?? 0));
      case "surfaceAsc":
        return sorted.sort((a, b) => (a.m2habitable ?? 0) - (b.m2habitable ?? 0));
      case "surfaceDesc":
        return sorted.sort((a, b) => (b.m2habitable ?? 0) - (a.m2habitable ?? 0));
      case "recent":
        return sorted.sort((a, b) => parseInt(b.idannonce) - parseInt(a.idannonce));
      default:
        return sorted;
    }
  };

  const navigateToCreateAnnonce = () => router.push("/annonce/create");
  const navigateToMap = () => router.push("/map");

  const handleShareClick = async () => {
    try {
      const link = await generateShareLink();
      setShareLink(link);
      setShowSharePopup(true);
    } catch (error) {
      console.error("Failed to share annonces:", error);
      toast.error("Erreur", {
        description: "Impossible de générer le lien de partage.",
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success("Lien copié !", {
        duration: 2000,
      });
    } catch {
      toast.error("Erreur lors de la copie");
    }
  };

  return (
    <div className="relative">
      {showHeader && (
        <AnnonceListHeader
          annonceCount={filteredAnnonces.length}
          onAddAnnonceClick={navigateToCreateAnnonce}
          onShowMapClick={navigateToMap}
          onShareClick={handleShareClick}
        />
      )}

      <AnnonceFilters 
        onFilterChange={handleFilterChange} 
        sortOption={sortOption}
        onSortChange={handleSortChange}
      />

      <AnnonceContent annonces={filteredAnnonces} isShared={isShared}/>

      {/* Share Link Popup */}
      {showSharePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <Button
              variant={"ghost"}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowSharePopup(false)}
            >
              <X size={20} />
            </Button>
            

            <h3 className="text-lg font-bold mb-4">Lien de partage</h3>

            <div className="flex items-center gap-2">
              <Input value={shareLink} readOnly className="flex-grow" />
              <Button
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
                title="Copier le lien"
              >
                <ClipboardCopyIcon size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
