'use client'

import React, { useState, useEffect } from 'react'
import { getCompte } from '@/lib/api';
import Loading from "../loading";
import { Suspense } from 'react';
import UserProfile from './UserProfile';
import Link from 'next/link';
import { House } from 'lucide-react';
import EditAccount from './edit-account';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FetchFailed from '../fetch-failed';

function Compte() {

    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [email, setEmail] = useState();
    const [isEditing, setIsEditing] = useState(false)
    const [id, setId] = useState();
    const [isSuccess, setIsSuccess] = useState(true);

    useEffect(()=>{        
        fetchAnnonces();
    },[]);

    const fetchAnnonces = async () => {
        try {
            const compteData = await getCompte();
            setNom(compteData.nom);
            setPrenom(compteData.prenom);
            setEmail(compteData.email);
            setId(compteData.idcompte);
        } catch {
            setIsSuccess(false);
            console.error("Problème lors de la récupération des infos du compte client");
        }
    }

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    }


    if (! isSuccess) {
        return(
            <FetchFailed></FetchFailed>
        )
    }
    return (
        <Suspense fallback={<Loading/>}>
            <div className="container mx-4 py-8 w-auto relative h-screen ">
                <main className="flex flex-col h-full items-center justify-center p-4 md:p-8">
                    <Card className="w-full max-w-md">
                        <CardContent className="pt-6">
                        <h1 className="text-2xl font-bold text-center mb-6">Profil Utilisateur</h1>

                        {!isEditing ? (
                            <div className="space-y-6">
                            <UserProfile nom={nom} prenom={prenom} email={email} />

                            <div className="flex justify-center mt-6">
                                <Button onClick={handleEditClick} className="w-full sm:w-auto">
                                Modifier mon compte
                                </Button>
                            </div>
                            <div className="flex justify-center mt-6">
                                <Button className="w-full sm:w-auto " variant={"destructive"} >
                                Deconnection 
                                </Button>
                            </div>
                            </div>
                        ) : (
                            <EditAccount userId={id} onCancel={handleEditClick} fetchAnnonces={fetchAnnonces} />
                        )}
                        </CardContent>
                    </Card>
                </main>

                <div className="py-8 mx-4 absolute right-0 top-0 w-max  h-10 ">
                    <Link href="/annonces" className="hover:underline">
                    <House className="inline"/> 
                    <span className="text-sm"> Vos Annonces </span>
                    </Link>
                </div>
            </div>
        </Suspense>
    )
    }

export default Compte