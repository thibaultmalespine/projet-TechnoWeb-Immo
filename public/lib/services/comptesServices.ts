const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export type Compte = {
  idcompte ?: number,
  prenom: string;
  nom: string;
  email: string;
  motdepasse: string;
};

export async function getCompte() {
  const res = await fetch(`${API_BASE}/compte`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des comptes");
  return res.json();
}

export async function login(data: { email: string; motdepasse: string }) {
  const res = await fetch(`${API_BASE}/compte/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la connexion");
  return res.json();
}

export async function createCompte(data: Compte) {
  const res = await fetch(`${API_BASE}/compte`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la création du compte");
  return res.json();
}

export async function updateCompte(compte: Compte) {
  const id = compte.idcompte;
  const res = await fetch(`${API_BASE}/compte/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(compte),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour du compte");
  return res.json();
}

export async function deleteCompte(id: number) {
  const res = await fetch(`${API_BASE}/compte/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression du compte");
}
