"use client"

import { LoginForm } from "@/components/login-form";

export default function Page() {
  const handleLogin = (formData) => {
    alert("Données du formulaire : \nemail : "+formData["email"].value +"\npassword : "+formData["password"].value);
    // Ici : appel API, redirection, gestion d'erreur...
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onLogin = {handleLogin}/>
      </div>
    </div>
  );
}
