"use client"

import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Compte } from "@/lib/services/comptesServices"
import { getCompte, updateCompte } from "@/lib/services/comptesServices"
import { toast } from "sonner"

export default function EditComptePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [compte, setCompte] = useState<Compte>({
    prenom: "",
    nom: "",
    email: "",
    motdepasse: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Récupérer les données du compte
  useEffect(() => {
    const fetchCompte = async () => {
      try {
        setIsLoading(true)
        const compteData = await getCompte()

        if (compteData) {
          setCompte({
            ...compteData,
            motdepasse: "", // Ne pas afficher le mot de passe actuel pour des raisons de sécurité
          })
        } else {
          setError("Compte non trouvé")
        }
      } catch (err) {
        setError("Erreur lors de la récupération du compte")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompte()
  }, [])

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCompte((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Effacer l'erreur pour ce champ lorsqu'il est modifié
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Validation simple
  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!compte.prenom || compte.prenom.length < 2) {
      errors.prenom = "Le prénom doit contenir au moins 2 caractères"
    }

    if (!compte.nom || compte.nom.length < 2) {
      errors.nom = "Le nom doit contenir au moins 2 caractères"
    }

    if (compte.motdepasse && compte.motdepasse.length < 6) {
      errors.motdepasse = "Le mot de passe doit contenir au moins 6 caractères"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Valider le formulaire
    if (!validateForm()) {
      return
    }

    try {
      setIsLoading(true)
      await updateCompte(compte)

      toast(
        "Compte mis à jour",{
            description: "Les informations du compte ont été mises à jour avec succès.",
        })

      router.push("/compte")
    } catch (err) {
      toast("Erreur",{
            description: "Une erreur est survenue lors de la mise à jour du compte.",
            className: "warning", 
        })
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
        <Button className="mt-4" onClick={() => router.push("/compte")}>
          Retour aux informations du compte
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Modifier mon compte</CardTitle>
          <CardDescription>
            Modifiez vos informations personnelles. Laissez le champ mot de passe vide si vous ne souhaitez pas le
            modifier.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                name="prenom"
                placeholder="Prénom"
                value={compte.prenom}
                onChange={handleChange}
                disabled={isLoading}
              />
              {formErrors.prenom && <p className="text-sm font-medium text-destructive">{formErrors.prenom}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                name="nom"
                placeholder="Nom"
                value={compte.nom}
                onChange={handleChange}
                disabled={isLoading}
              />
              {formErrors.nom && <p className="text-sm font-medium text-destructive">{formErrors.nom}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="motdepasse">Mot de passe</Label>
              <Input
                id="motdepasse"
                name="motdepasse"
                type="password"
                placeholder="Laisser vide pour conserver le mot de passe actuel"
                value={compte.motdepasse}
                onChange={handleChange}
                disabled={isLoading}
              />
              {formErrors.motdepasse && <p className="text-sm font-medium text-destructive">{formErrors.motdepasse}</p>}
              <p className="text-sm text-muted-foreground pb-5">
                Laissez ce champ vide si vous ne souhaitez pas modifier le mot de passe.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/compte")} disabled={isLoading} type="button">
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer les modifications
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
