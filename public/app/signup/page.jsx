"use client"

import { SignUpForm } from "@/components/signup-form"

export default function SignUpPage() {
  const handleSignUp = (userData) => {
    // Ici vous pouvez implémenter la logique d'inscription
    console.log("Données d'inscription:", userData)
    // Par exemple, appeler une API pour créer un compte
  }

  return (
    <div className="container mx-auto max-w-md py-12">
      <SignUpForm onSignUp={handleSignUp} />
    </div>
  )
}

