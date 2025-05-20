"use client";

import { Annonce, getAnnoncesByAccount } from '@/lib/services/annoncesServices';
import { Libraries, LoadScriptProps, useLoadScript } from '@react-google-maps/api';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Type pour une annonce avec coordonnées géographiques
export interface AnnonceWithGeo extends Annonce {
  latitude?: number;
  longitude?: number;
}

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
  annonces: AnnonceWithGeo[];
  isLoadingAnnonces: boolean;
  errorLoadingAnnonces: string | null;
  getCoordinatesFromPostalCode: (codePostal: string) => Promise<{ lat: number, lng: number } | null>;
  refreshAnnonces: () => Promise<void>;
}

// Définir les bibliothèques à charger par défaut
const defaultLibraries: Libraries = ['places', 'geometry'];

const GoogleMapsContext = createContext<GoogleMapsContextType | null>(null);

interface GoogleMapsProviderProps {
  children: ReactNode;
  apiKey: string;
  options?: Omit<LoadScriptProps, 'googleMapsApiKey' | 'children'>;
  loadAnnoncesOnMount?: boolean;
}

export const GoogleMapsProvider = ({ 
  children, 
  apiKey,
  options = { id: 'google-maps-script' },
  loadAnnoncesOnMount = true
}: GoogleMapsProviderProps) => {
  // État pour stocker les annonces avec leurs coordonnées géographiques
  const [annonces, setAnnonces] = useState<AnnonceWithGeo[]>([]);
  const [isLoadingAnnonces, setIsLoadingAnnonces] = useState<boolean>(false);
  const [errorLoadingAnnonces, setErrorLoadingAnnonces] = useState<string | null>(null);

  // Utilisation de useMemo pour les options afin d'éviter les rechargements inutiles
  const loadScriptOptions = useMemo(() => ({
    googleMapsApiKey: apiKey,
    libraries: defaultLibraries,
    ...options
  }), [apiKey, options]);

  // useLoadScript est maintenant utilisé avec les options mémorisées
  // pour éviter des rechargements inutiles de l'API
  const { isLoaded, loadError } = useLoadScript(loadScriptOptions);

  // Fonction pour obtenir les coordonnées à partir d'un code postal
  const getCoordinatesFromPostalCode = useCallback(async (codePostal: string): Promise<{ lat: number, lng: number } | null> => {
    try {
      // Utiliser l'API Nominatim pour obtenir les coordonnées
      const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${codePostal}&country=France&format=json&limit=1`);
      const data = await response.json();

      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées:', error);
      return null;
    }
  }, []);

  // Fonction pour charger les annonces avec leurs coordonnées géographiques
  const loadAnnonces = useCallback(async () => {
    try {
      setIsLoadingAnnonces(true);
      setErrorLoadingAnnonces(null);
      
      const annoncesData: AnnonceWithGeo[] = await getAnnoncesByAccount();

      // Ajouter les coordonnées géographiques à chaque annonce
      const annoncesWithGeo = await Promise.all(annoncesData.map(async (annonce) => {
        const coordinates = await getCoordinatesFromPostalCode(annonce.codepostal);
        return {
          ...annonce,
          latitude: coordinates?.lat,
          longitude: coordinates?.lng
        };
      }));

      // Filtrer les annonces sans coordonnées valides
      const validAnnonces = annoncesWithGeo.filter(annonce => annonce.latitude && annonce.longitude);
      setAnnonces(validAnnonces);
      
      return validAnnonces;
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces:', error);
      setErrorLoadingAnnonces('Impossible de charger les annonces.');
      return [];
    } finally {
      setIsLoadingAnnonces(false);
    }
  }, [getCoordinatesFromPostalCode]);

  // Fonction exposée pour rafraîchir les annonces
  const refreshAnnonces = useCallback(async () => {
    if (isLoaded) {
      await loadAnnonces();
    }
  }, [isLoaded, loadAnnonces]);

  // Charger les annonces lorsque Google Maps est chargé
  useEffect(() => {
    if (isLoaded && loadAnnoncesOnMount) {
      loadAnnonces();
    }
  }, [isLoaded, loadAnnonces, loadAnnoncesOnMount]);

  // Mémorisation de la valeur du contexte pour éviter des re-rendus inutiles
  const contextValue = useMemo(() => ({
    isLoaded,
    loadError,
    annonces,
    isLoadingAnnonces,
    errorLoadingAnnonces,
    getCoordinatesFromPostalCode,
    refreshAnnonces
  }), [
    isLoaded, 
    loadError, 
    annonces, 
    isLoadingAnnonces, 
    errorLoadingAnnonces,
    getCoordinatesFromPostalCode,
    refreshAnnonces
  ]);

  return (
    <GoogleMapsContext.Provider value={contextValue}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = (): GoogleMapsContextType => {
  const context = useContext(GoogleMapsContext);
  
  if (!context) {
    throw new Error('useGoogleMaps doit être utilisé dans un GoogleMapsProvider');
  }
  
  return context;
};