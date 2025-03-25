"use client"

import { LoginForm } from "@/components/login-form";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const handleLogin = async (formData) => {

    event.preventDefault()
    
    // Récupération des données du formulaire
    const data = {
      email : formData["email"].value,
      motdepasse : formData["password"].value
    }
  
    const response = await fetch(`${API_URL}/compte/login`, {
      method : 'POST',
      headers : {"Content-type" : "application/json"},
      body : JSON.stringify(data),
      credentials: 'include',  // Permet d'inclure les cookies (session) dans la requête
    });
    if (response.ok) {
      document.location.href = '/annonces'
    } else if(response.status === 404) {
      alert(await response.text())
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onLogin = {handleLogin}/>
      </div>
    </div>
  );
}
