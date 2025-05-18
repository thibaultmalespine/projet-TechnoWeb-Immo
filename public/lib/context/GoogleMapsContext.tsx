"use client";

import { LoadScriptProps, useLoadScript } from '@react-google-maps/api';
import { createContext, ReactNode, useContext } from 'react';

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
}

const GoogleMapsContext = createContext<GoogleMapsContextType | null>(null);

interface GoogleMapsProviderProps {
  children: ReactNode;
  apiKey: string;
  options?: Omit<LoadScriptProps, 'googleMapsApiKey' | 'children'>;
}

export const GoogleMapsProvider = ({ 
  children, 
  apiKey,
  options = { id: 'google-maps-script' }
}: GoogleMapsProviderProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    ...options
  });

  const value = {
    isLoaded,
    loadError,
  };

  return (
    <GoogleMapsContext.Provider value={value}>
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