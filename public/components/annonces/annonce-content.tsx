import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Annonce } from "@/lib/services/annoncesServices";
import { AlertCircle } from "lucide-react";
import { AnnonceCard } from "./annonce-card";

interface AnnonceContentProps {
  annonces: Annonce[];
  showDetails?: boolean;
}

export function AnnonceContent({ annonces, showDetails = true }: AnnonceContentProps) {
  if (annonces.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Aucune annonce trouvée</AlertTitle>
        <AlertDescription>
          Aucune annonce ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {annonces.map((annonce) => (
        <AnnonceCard key={annonce.idannonce} annonce={annonce} showDetails={showDetails} />
      ))}
    </div>
  );
}
