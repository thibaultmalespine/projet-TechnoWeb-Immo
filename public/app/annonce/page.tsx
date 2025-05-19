"use client";

import { PageHeader } from "@/components/annonces/annonce-header";
import { AnnonceList } from "@/components/annonces/annonce-list";
import { Annonce, getAnnoncesByAccount } from "@/lib/services/annoncesServices";
import { useEffect, useState } from "react";
import FetchFailed from "../fetch-failed";
import Loading from "../loading";

const PAGE_TITLE = "Toutes vos annonces immobilières";
const ERROR_MESSAGE = "Erreur lors de la récupération des annonces";

export default function AnnoncesPage() {
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
        const annoncesData = await getAnnoncesByAccount();
        
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
  }, []);

  if (annoncesState.isLoading) {
    return <Loading />;
  }

  if (annoncesState.error || !annoncesState.data) {
    return <FetchFailed />;
  }

  return (
    <div className="container mx-4 py-8 w-auto">
      <PageHeader title={PAGE_TITLE} showUserLink />
      <AnnonceList annonces={annoncesState.data} />
    </div>
  );
}
