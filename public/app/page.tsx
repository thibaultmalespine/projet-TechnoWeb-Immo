"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/services/comptesServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, motdepasse });
      router.push("/annonce");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-sm shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Se connecter</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@domaine.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={motdepasse}
                onChange={(e) => setMotdepasse(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm mt-1 text-center">{error}</p>
            )}

            <Button className="w-full mt-4" type="submit" disabled={loading}>
              {loading ? "Chargement..." : "Connexion"}
            </Button>
          </form>
          <p className="mt-4 text-sm text-center text-muted-foreground">
            Pas de compte ?{" "}
            <Link href="/register" className="underline">
              S’inscrire
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
