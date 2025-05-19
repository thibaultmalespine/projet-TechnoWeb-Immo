"use client";

import FetchFailed from "@/app/fetch-failed";
import Loading from "@/app/loading";
import { AnnonceList } from "@/components/annonces/annonce-list";
import { Annonce } from "@/lib/services/annoncesServices";
import { getSharedAnnonce } from "@/lib/services/shareService";
import { useEffect, useState } from "react";

const ERROR_MESSAGE = "Erreur lors de la récupération des annonces partagées";

export default function SharedAnnoncesPage({ params }: { params: { token: string } }) {
  const { token } = params;
  
  const [annoncesState, setAnnoncesState] = useState<{
    data: Annonce[] | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const annoncesData = await getSharedAnnonce(token);
        
        setAnnoncesState({
          data: annoncesData,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error(ERROR_MESSAGE, error);
        setAnnoncesState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        });
      }
    };

    fetchAnnonces();
  }, [token]);

  if (annoncesState.isLoading) {
    return <Loading />;
  }

  if (annoncesState.error || !annoncesState.data) {
    return <FetchFailed />;
  }

  return (
    <div className="container mx-4 py-8 w-auto">
      <AnnonceList annonces={annoncesState.data} showHeader={false} />
    </div>
  );
}
