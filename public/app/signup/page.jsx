"use client"

import { SignUpForm } from "@/components/signup-form";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SignUpPage() {

  const handleSignUp = async (userData) => {
    event.preventDefault()

    const response = await fetch(`${API_URL}/compte`, {
      method : 'POST',
      headers : {
        'Content-type' : 'application/json'
      },
      body : JSON.stringify(userData),
    });
    
    if (response.status === 201) {
      document.location.href = '/annonces'
    } else if(response.status === 500) {
      alert("erreur du serveur, veuillez réessayer plus tard")
    }
}

  return (
    <div className="container mx-auto max-w-md py-12">
      <SignUpForm onSignUp={handleSignUp} />
    </div>
  )
}

