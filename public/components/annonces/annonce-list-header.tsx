import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Plus, Share2 } from "lucide-react";

interface AnnonceListHeaderProps {
  annonceCount: number;
  sortOption: string;
  onSortChange: (value: string) => void;
  onAddAnnonceClick: () => void;
  onShowMapClick: () => void;
  onShareClick: () => void;
}

export function AnnonceListHeader({
  annonceCount,
  sortOption,
  onSortChange,
  onAddAnnonceClick,
  onShowMapClick,
  onShareClick
}: AnnonceListHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">
          {annonceCount} annonce{annonceCount !== 1 ? "s" : ""} disponible
          {annonceCount !== 1 ? "s" : ""}
        </h2>

        <Button onClick={onAddAnnonceClick} className="bg-primary hover:bg-primary/90 cursor-pointer">
          <Plus className="mr-2 h-4 w-4" /> Ajouter une annonce
        </Button>
        
        <Button onClick={onShowMapClick} className="bg-primary hover:bg-primary/90 cursor-pointer">
          <MapPin className="mr-2 h-4 w-4" /> Voir sur la map
        </Button>

        <Button onClick={onShareClick} className="bg-primary hover:bg-primary/90 cursor-pointer">
          <Share2 className="mr-2 h-4 w-4" /> Partager les annonces
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Trier par:</span>
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
    </div>
  );
}
