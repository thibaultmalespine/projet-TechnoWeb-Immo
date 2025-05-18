"use client";

import { AnnoncesList } from "@/components/annonces/annonces-list";
import { Annonce, getAnnoncesByAccount } from "@/lib/services/annoncesServices";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import FetchFailed from "../fetch-failed";
import Loading from "../loading";


export default function AnnoncesPage() {
  const [annonces, setAnnonces] = useState<Annonce[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const annoncesData: Annonce[] = await getAnnoncesByAccount();
        setAnnonces(annoncesData);
        setIsSuccess(true);
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces :", error);
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (isSuccess && annonces) {
    return (
      <div className="container mx-4 py-8 w-auto">
        <div className="md:flex flex-row-reverse justify-between">
            <div className="mb-5 pt-1">
                <Link href="/compte" className="hover:underline">
                    <CircleUserRound className="inline" />
                    <span className="text-sm"> Votre Compte </span>
                </Link>
            </div>
            <h1 className="text-3xl font-bold mb-8">
            Toutes vos annonces immobilières
            </h1>
        </div>

        <AnnoncesList annonces={annonces} />
      </div>
    );
  } else {
    return <FetchFailed />;
  }
}
