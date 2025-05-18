    "use client";

    import { Button } from '@/components/ui/button';
import { Annonce, getAnnoncesByAccount } from '@/lib/services/annoncesServices';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

    interface AnnonceWithGeo extends Annonce {
    latitude?: number;
    longitude?: number;
    }

    const MapPage = () => {
    const router = useRouter();
    const [annonces, setAnnonces] = useState<AnnonceWithGeo[]>([]);
    const [center, setCenter] = useState({ lat: 46.603354, lng: 1.888334 }); // Centre de la France par défaut
    const [zoom, setZoom] = useState(6);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAnnonce, setSelectedAnnonce] = useState<AnnonceWithGeo | null>(null);
        
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
    const getCoordinatesFromPostalCode = async (codePostal: string, ): Promise<{lat: number, lng: number} | null> => {
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

        fetchAnnonces();
    }, []);

    // Obtenir l'icône appropriée en fonction du type de bien
    const getMarkerIcon = (typedebien?: string) => {
        
        switch(typedebien) {
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

    // Gérer le clic sur un marqueur
    const handleMarkerClick = (annonce: AnnonceWithGeo) => {
        setSelectedAnnonce(annonce);
    };

    // Naviguer vers la page de détail d'une annonce
    const goToAnnonceDetails = (id: string) => {
        router.push(`/annonce/${id}`);
    };

    return (
        <div className="flex flex-col h-screen">
        <div className="p-4 flex justify-between items-center bg-white shadow-sm z-10">
            <Button variant="outline" onClick={() => router.push('/annonce')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux annonces
            </Button>
            <h1 className="text-xl font-bold">Carte de vos annonces immobilières</h1>
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
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
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
                    onCloseClick={() => setSelectedAnnonce(null)}
                    >
                    <div className="p-2 max-w-xs">
                        <h3 className="font-bold text-md">{selectedAnnonce.nomannonce}</h3>
                        <p className="text-sm mt-1">{selectedAnnonce.typedebien} - {selectedAnnonce.nomville}</p>
                        <p className="text-sm font-semibold mt-1">{selectedAnnonce.prix}€ - {selectedAnnonce.m2habitable}m²</p>
                        <Button 
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full"
                        onClick={() => goToAnnonceDetails(selectedAnnonce.idannonce)}
                        >
                        Voir l&apos;annonce
                        </Button>
                    </div>
                    </InfoWindow>
                )}
                </GoogleMap>
            </LoadScript>
            </div>
        )}
        </div>
    );
    };

    export default MapPage;