"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Loading() {
  const [dots, setDots] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold tracking-tight">
          Chargement en cours{dots}
        </h2>
        <p className="text-muted-foreground">
          Veuillez patienter pendant le chargement des annonces
        </p>
      </div>
    </div>
  );
}
