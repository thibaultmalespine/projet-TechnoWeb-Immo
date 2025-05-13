"use client"

import { useState } from "react"
import { updateCompte } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function EditAccount({ userId, onCancel, fetchAnnonces }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    motdepasse: "",
    confirmPassword: "",
  })

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    // Vérification que les mots de passe correspondent
    if (formData.motdepasse && formData.motdepasse !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setLoading(false)
      return
    }

    try {
      // Préparation des données à envoyer (sans confirmPassword)
      const dataToUpdate = { ...formData }
      delete dataToUpdate.confirmPassword

      // Si le mot de passe est vide, on ne l'envoie pas
      if (!dataToUpdate.password) {
        delete dataToUpdate.password
      }

      // Appel à l'API pour mettre à jour le compte
      await updateCompte(userId, dataToUpdate)
      setSuccess(true)

      fetchAnnonces(); // recharge les données

      // Retour au mode affichage après 1 secondes
      setTimeout(() => {
        if (onCancel) onCancel()
      }, 1000)
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la mise à jour du compte")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Modifier mon compte</h2>

      {success && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <AlertDescription>
            Vos informations ont été mises à jour avec succès. Retour à l'affichage...
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="space-y-2">
          <Label htmlFor="prenom">Prénom</Label>
          <Input id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Votre prénom" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nom">Nom</Label>
          <Input id="nom" name="nom" value={formData.nom} onChange={handleChange} placeholder="Votre nom" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Nouveau mot de passe</Label>
          <Input
            type="password"
            id="motdepasse"
            name="motdepasse"
            value={formData.motdepasse}
            onChange={handleChange}
            placeholder="Laissez vide pour ne pas modifier"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Laissez vide pour ne pas modifier"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end pt-2">
          <Button type="button" variant="outline" onClick={onCancel} className="sm:order-first">
            Annuler
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mise à jour...
              </>
            ) : (
              "Mettre à jour"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
