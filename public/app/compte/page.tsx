"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Annonce, deleteAnnonce, getAnnoncesByAccount } from "@/lib/services/annoncesServices";
import { Compte, deleteCompte, getCompte } from '@/lib/services/comptesServices';
import { AlertCircle, LogOut, Pencil, Trash, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [compte, setCompte] = useState<Compte | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCompte();
  }, []);

  async function fetchCompte() {
    try {
      const data = await getCompte();
      setCompte(data);
    } catch {
      setError('Erreur lors du chargement des informations de compte');
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    async function fetchAnnonces() {
        try {
          const annonces = await getAnnoncesByAccount();
          annonces.forEach((annonce : Annonce) => {
            deleteAnnonce(annonce.idannonce);
          });
        } catch {
          setError("Erreur lors du chargement des annonces");
        } finally {
          setLoading(false);
        }
      }
    await fetchAnnonces();

    setTimeout(async () => {
      try {
        if (compte && compte.idcompte !== undefined){
          await deleteCompte(compte.idcompte);
        } else {
          throw new Error("Pas de compte connecté ?!")
        }
        router.push("/");
      } catch (err) {
        setError((err as Error).message || "Erreur lors de la suppression du compte");
        setConfirmDelete(false);
      }
    }, 500)
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  
  if (error) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button 
          className="mt-4"
          variant="outline"
          onClick={() => router.push("/annonce")}
        >
          Retour au tableau de bord
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto p-4">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.push("/annonce")}
      >
        Retour au tableau de bord
      </Button>
      
      <Card className="w-full max-w-md space-y-6 p-6">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Mon Profil</h2>
          
          {compte && (
            <div className="space-y-4 w-full">
              <div className="flex flex-col space-y-1">
                <Label className="text-muted-foreground text-sm">Nom</Label>
                <p className="font-medium">{compte.nom}</p>
              </div>
              
              <div className="flex flex-col space-y-1">
                <Label className="text-muted-foreground text-sm">Prénom</Label>
                <p className="font-medium">{compte.prenom}</p>
              </div>
              
              <div className="flex flex-col space-y-1">
                <Label className="text-muted-foreground text-sm">Email</Label>
                <p className="font-medium">{compte.email}</p>
              </div>
              
              <div className="flex flex-col space-y-4 mt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={async () => {
                    document.cookie = 'connect.sid=; Max-Age=0; path=/';
                    router.push('/');
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Se déconnecter
                </Button>

                <Link href="/compte/edit">
                  <Button className="w-full" variant="outline">
                    <Pencil className="mr-2 h-4 w-4" /> Modifier mes informations
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setConfirmDelete(true)}
                >
                  <Trash className="mr-2 h-4 w-4" /> Supprimer mon compte
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer votre compte ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes vos annonces et données seront définitivement supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}