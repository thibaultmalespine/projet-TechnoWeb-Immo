'use client'

import React, { useState, useEffect } from 'react'
import { getCompte } from '@/lib/api';
import Loading from "../loading";
import { Suspense } from 'react';


function Compte() {

    const [compte, setCompte] = useState();


    useEffect(()=>{
        const fetchAnnonces = async () => {
            try {
                const compteData = await getCompte();
                setCompte(compteData);  
            } catch {
                console.error("Problème lors de la récupération des infos du compte client");
            }
        }

        fetchAnnonces();
    },[]);


  return (
    <Suspense fallback={<Loading/>}>
        <div>{compte}</div>
    </Suspense>
  )
}

export default Compte