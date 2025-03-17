
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function LoginForm({
  className,
  onLogin,
  ...props
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onLogin) {
      onLogin({ email, password }) // On transmet les données
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Connexion à votre compte</CardTitle>
          <CardDescription>
            Entrez votre adresse e-mail ci-dessous pour vous connecter à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Adresse e-mail</Label>
                <Input id="email" type="email" placeholder="exemple@domaine.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
                <Button variant="outline" className="w-full">
                  Se connecter avec Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Pas encore de compte ?{" "}
              <a href="signup" className="underline underline-offset-4">
                Créez-en un
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
