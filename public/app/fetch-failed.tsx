"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FetchFailed() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 sm:px-6 md:px-8">
      <Card className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-2xl shadow-lg">
        <CardContent className="pt-4 sm:pt-6 text-center">
          <Alert variant="destructive" className="mb-4 sm:mb-6">
            <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4" />
            <AlertTitle className="block text-xl sm:text-2xl font-bold text-center">
              Désolé, les données n&apos;ont pas pu être récupérées
            </AlertTitle>
            <AlertDescription className="w-full block text-center text-muted-foreground text-sm sm:text-base mt-2">
              Vérifiez que vous êtes bien connecté à votre compte.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-center pb-4 sm:pb-6">
          <Button 
            onClick={handleRedirect} 
            variant="default" 
            size="lg"
            className="w-full sm:w-auto"
          >
            Page de connexion
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
