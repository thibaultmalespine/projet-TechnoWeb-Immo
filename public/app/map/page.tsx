"use client";

import { Button } from '@/components/ui/button';
import { useGoogleMaps } from '@/lib/context/GoogleMapsContext';
import { Annonce, getAnnoncesByAccount } from '@/lib/services/annoncesServices';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface AnnonceWithGeo extends Annonce {
    latitude?: number;
    longitude?: number;
}

const MapPage = () => {
    const router = useRouter();
    const { isLoaded, loadError } = useGoogleMaps();
    const [annonces, setAnnonces] = useState<AnnonceWithGeo[]>([]);
    const [center, setCenter] = useState({ lat: 46.603354, lng: 1.888334 }); // Centre de la France par défaut
    const [zoom, setZoom] = useState(6);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAnnonce, setSelectedAnnonce] = useState<AnnonceWithGeo | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [selectedLocationAnnonces, setSelectedLocationAnnonces] = useState<AnnonceWithGeo[]>([]);
    const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>(0);

    // Options de la carte
    const mapOptions = useMemo(() => ({
        disableDefaultUI: false,
        clickableIcons: true,
        scrollwheel: true,
    }), []);

    // Styles du conteneur de carte
    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    // Fonction pour obtenir les coordonnées à partir d'un code postal
    const getCoordinatesFromPostalCode = async (codePostal: string): Promise<{ lat: number, lng: number } | null> => {
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
    };

    // Gestionnaire de clic sur la carte
    const onMapClick = useCallback(() => {
        setSelectedAnnonce(null);
    }, []);

    useEffect(() => {
        const fetchAnnonces = async () => {
            try {
                setIsLoading(true);
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

                setAnnonces(annoncesWithGeo.filter(annonce => annonce.latitude && annonce.longitude));

                // Centrer la carte sur la première annonce avec des coordonnées valides
                const validAnnonce = annoncesWithGeo.find(annonce => annonce.latitude && annonce.longitude);
                if (validAnnonce && validAnnonce.latitude && validAnnonce.longitude) {
                    setCenter({ lat: validAnnonce.latitude, lng: validAnnonce.longitude });
                    setZoom(12);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des annonces:', error);
                setError('Impossible de charger les annonces.');
            } finally {
                setIsLoading(false);
            }
        };

        if (isLoaded) {
            fetchAnnonces();
        }
    }, [isLoaded]);

    // Grouper les annonces par code postal
    const groupAnnoncesByPostalCode = useMemo(() => {
        const groups: { [key: string]: AnnonceWithGeo[] } = {};
        
        annonces.forEach(annonce => {
            if (annonce.codepostal) {
                if (!groups[annonce.codepostal]) {
                    groups[annonce.codepostal] = [];
                }
                groups[annonce.codepostal].push(annonce);
            }
        });
        
        return groups;
    }, [annonces]);

    // Obtenir l'icône appropriée en fonction du type de bien
    const getMarkerIcon = (typedebien?: string) => {
        switch (typedebien) {
            case 'Appartement':
                return '🏢'; // Immeuble
            case 'Maison':
                return '🏠'; // Maison
            case 'Villa':
                return '🏡'; // Villa
            case 'Terrain':
                return '🌳'; // Terrain
            case 'Local commercial':
                return '🏬'; // Commerce
            default:
                return '📍'; // Marqueur par défaut
        }
    };

    // Fonction pour mettre à jour les informations de groupe lorsqu'une annonce est sélectionnée
    const updateSelectedLocationInfo = (annonce: AnnonceWithGeo) => {
        if (annonce.codepostal) {
            const annonceGroup = groupAnnoncesByPostalCode[annonce.codepostal] || [];
            setSelectedLocationAnnonces(annonceGroup);
            
            // Trouver l'index de l'annonce dans le groupe
            const groupIndex = annonceGroup.findIndex(a => a.idannonce === annonce.idannonce);
            setSelectedLocationIndex(groupIndex >= 0 ? groupIndex : 0);
        } else {
            // Pas de code postal, pas de groupe
            setSelectedLocationAnnonces([]);
            setSelectedLocationIndex(0);
        }
    };

    // Gérer le clic sur un marqueur
    const handleMarkerClick = (annonce: AnnonceWithGeo) => {
        const index = annonces.findIndex(a => a.idannonce === annonce.idannonce);
        setSelectedIndex(index);
        setSelectedAnnonce(annonce);
        
        // Mettre à jour les informations du groupe
        updateSelectedLocationInfo(annonce);
    };

    // Naviguer vers l'annonce précédente
    const goToPreviousAnnonce = () => {
        if (annonces.length === 0) return;
        
        if (selectedIndex === -1) {
            // Si aucune annonce n'est sélectionnée, sélectionner la dernière
            const newIndex = annonces.length - 1;
            const newAnnonce = annonces[newIndex];
            setSelectedIndex(newIndex);
            setSelectedAnnonce(newAnnonce);
            
            // Mettre à jour les informations du groupe
            updateSelectedLocationInfo(newAnnonce);
            
            if (newAnnonce.latitude && newAnnonce.longitude) {
                setCenter({ lat: newAnnonce.latitude, lng: newAnnonce.longitude });
            }
            return;
        }

        let newIndex = selectedIndex - 1;
        if (newIndex < 0) newIndex = annonces.length - 1;
        
        const newAnnonce = annonces[newIndex];
        setSelectedIndex(newIndex);
        setSelectedAnnonce(newAnnonce);
        
        // Mettre à jour les informations du groupe
        updateSelectedLocationInfo(newAnnonce);
        
        if (newAnnonce.latitude && newAnnonce.longitude) {
            setCenter({ lat: newAnnonce.latitude, lng: newAnnonce.longitude });
        }
    };

    // Naviguer vers l'annonce suivante
    const goToNextAnnonce = () => {
        if (annonces.length === 0) return;
        
        if (selectedIndex === -1) {
            // Si aucune annonce n'est sélectionnée, sélectionner la première
            const newAnnonce = annonces[0];
            setSelectedIndex(0);
            setSelectedAnnonce(newAnnonce);
            
            // Mettre à jour les informations du groupe
            updateSelectedLocationInfo(newAnnonce);
            
            if (newAnnonce.latitude && newAnnonce.longitude) {
                setCenter({ lat: newAnnonce.latitude, lng: newAnnonce.longitude });
            }
            return;
        }

        let newIndex = selectedIndex + 1;
        if (newIndex >= annonces.length) newIndex = 0;
        
        const newAnnonce = annonces[newIndex];
        setSelectedIndex(newIndex);
        setSelectedAnnonce(newAnnonce);
        
        // Mettre à jour les informations du groupe
        updateSelectedLocationInfo(newAnnonce);
        
        if (newAnnonce.latitude && newAnnonce.longitude) {
            setCenter({ lat: newAnnonce.latitude, lng: newAnnonce.longitude });
        }
    };

    // Navigation entre les annonces du même code postal
    const goToPreviousLocationAnnonce = () => {
        if (selectedLocationAnnonces.length <= 1) return;
        
        let newIndex = selectedLocationIndex - 1;
        if (newIndex < 0) newIndex = selectedLocationAnnonces.length - 1;
        
        const newAnnonce = selectedLocationAnnonces[newIndex];
        setSelectedLocationIndex(newIndex);
        
        // Mettre à jour l'annonce sélectionnée et son index global
        setSelectedAnnonce(newAnnonce);
        const globalIndex = annonces.findIndex(a => a.idannonce === newAnnonce.idannonce);
        setSelectedIndex(globalIndex);
        
        // Centrer la carte si les coordonnées sont différentes
        if (newAnnonce.latitude && newAnnonce.longitude) {
            setCenter({ lat: newAnnonce.latitude, lng: newAnnonce.longitude });
        }
    };

    const goToNextLocationAnnonce = () => {
        if (selectedLocationAnnonces.length <= 1) return;
        
        let newIndex = selectedLocationIndex + 1;
        if (newIndex >= selectedLocationAnnonces.length) newIndex = 0;
        
        const newAnnonce = selectedLocationAnnonces[newIndex];
        setSelectedLocationIndex(newIndex);
        
        // Mettre à jour l'annonce sélectionnée et son index global
        setSelectedAnnonce(newAnnonce);
        const globalIndex = annonces.findIndex(a => a.idannonce === newAnnonce.idannonce);
        setSelectedIndex(globalIndex);
        
        // Centrer la carte si les coordonnées sont différentes
        if (newAnnonce.latitude && newAnnonce.longitude) {
            setCenter({ lat: newAnnonce.latitude, lng: newAnnonce.longitude });
        }
    };

    // Réinitialiser la sélection lorsque l'InfoWindow est fermée
    const handleInfoWindowClose = () => {
        setSelectedAnnonce(null);
        setSelectedIndex(-1);
        setSelectedLocationAnnonces([]);
        setSelectedLocationIndex(0);
    };

    // Si Google Maps n'est pas encore chargé, afficher un écran de chargement
    if (!isLoaded) {
        return (
            <div className="flex flex-col h-screen">
                <div className="p-4 flex justify-center items-center">
                    <h1 className="text-xl font-bold">Chargement de Google Maps...</h1>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    // Si une erreur s'est produite lors du chargement de Google Maps
    if (loadError) {
        return (
            <div className="flex flex-col h-screen">
                <div className="p-4 flex justify-center items-center">
                    <h1 className="text-xl font-bold text-red-600">Erreur de chargement de Google Maps</h1>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-red-500">Impossible de charger Google Maps: {loadError.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="p-4 flex flex-wrap items-center justify-center sm:justify-start bg-white shadow-sm z-10">
                <div className="flex w-full sm:w-auto items-center justify-center sm:justify-start mb-2 sm:mb-0">
                    <Button variant="default" onClick={() => router.push('/annonce')}>
                        <ArrowLeft className="bg-pr mr-2 h-4 w-4" /> Retour aux annonces
                    </Button>
                </div>
                
                <div className="flex space-x-2 w-full sm:w-auto justify-center sm:justify-start sm:ml-4 mb-2 sm:mb-0">
                    <Button 
                        variant="outline"
                        size="sm"
                        onClick={goToPreviousAnnonce}
                        disabled={annonces.length === 0}
                    >
                        ← Précédent
                    </Button>
                    <Button 
                        variant="outline"
                        size="sm"
                        onClick={goToNextAnnonce}
                        disabled={annonces.length === 0}
                    >
                        Suivant →
                    </Button>
                </div>
                
                <div className="w-full sm:w-auto sm:ml-4 text-sm text-center sm:text-left mb-2 sm:mb-0">
                    {selectedAnnonce ? (
                        <span className="font-medium">{selectedIndex + 1}/{annonces.length}: {selectedAnnonce.nomannonce}</span>
                    ) : (
                        <span className="text-gray-500">Aucune annonce sélectionnée</span>
                    )}
                </div>
                
                <h1 className="text-lg sm:text-xl font-bold w-full sm:w-auto sm:ml-auto text-center sm:text-left">
                    Carte de vos annonces immobilières
                </h1>
            </div>

            {isLoading ? (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-lg">Chargement de la carte...</p>
                </div>
            ) : error ? (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-red-500">{error}</p>
                </div>
            ) : (
                <div className="flex-grow">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={zoom}
                        options={mapOptions}
                        onClick={onMapClick}
                    >
                        {annonces.map((annonce) => (
                            annonce.latitude && annonce.longitude ? (
                                <Marker
                                    key={annonce.idannonce}
                                    position={{ lat: annonce.latitude, lng: annonce.longitude }}
                                    onClick={() => handleMarkerClick(annonce)}
                                    title={annonce.nomannonce}
                                    label={getMarkerIcon(annonce.typedebien)}
                                />
                            ) : null
                        ))}

                        {selectedAnnonce && selectedAnnonce.latitude && selectedAnnonce.longitude && (
                            <InfoWindow
                                position={{ lat: selectedAnnonce.latitude, lng: selectedAnnonce.longitude }}
                                onCloseClick={handleInfoWindowClose}
                            >
                                <div className="p-2 max-w-xs">
                                    {selectedLocationAnnonces.length > 1 && (
                                        <div className="mb-2 text-sm text-blue-600 font-medium">
                                            {selectedLocationIndex + 1}/{selectedLocationAnnonces.length} annonces au code postal {selectedAnnonce.codepostal}
                                        </div>
                                    )}
                                    <h3 className="font-bold text-md">{selectedAnnonce.nomannonce}</h3>
                                    <p className="text-sm mt-1">{selectedAnnonce.typedebien} - {selectedAnnonce.nomville}</p>
                                    <p className="text-sm font-semibold mt-1">{selectedAnnonce.prix}€ - {selectedAnnonce.m2habitable}m²</p>
                                    
                                    {selectedLocationAnnonces.length > 1 && (
                                        <div className="flex mt-2 space-x-2">
                                            <Button 
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                onClick={goToPreviousLocationAnnonce}
                                            >
                                                ← Précédente
                                            </Button>
                                            <Button 
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                onClick={goToNextLocationAnnonce}
                                            >
                                                Suivante →
                                            </Button>
                                        </div>
                                    )}
                                    
                                    <Button 
                                        variant="outline"
                                        size="sm"
                                        className="mt-2 w-full"
                                        onClick={() => router.push(`${selectedAnnonce.urloriginale}`)}
                                    >
                                        Voir l&apos;annonce
                                    </Button>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </div>
            )}
        </div>
    );
};

export default MapPage;