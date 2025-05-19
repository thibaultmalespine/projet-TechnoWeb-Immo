const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export type Annonce = {
  idannonce : string,
  nomannonce: string;
  urloriginale: string;
  descriptionbien?: string;
  typedebien?: string;
  codepostal: string;
  nomville: string;
  prix: number;
  m2habitable: number;
  m2terrains?: number;
  meuble?: boolean;
  particulierpro?: "Particulier" | "Professionnel";
  garage?: boolean;
  piscine?: boolean;
  lecompte: string;
  cheminsimages?: string[]; 
};

export async function getAnnoncesByAccount() {
  const res = await fetch(`${API_BASE}/annonce`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des annonces");
  return res.json();
}

export async function getAnnonceByID(id: string) {
  const res = await fetch(`${API_BASE}/annonce/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Annonce non trouvée");
  return res.json();
}

export async function createAnnonce(data: Annonce) {
  const res = await fetch(`${API_BASE}/annonce`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la création");
  return res.json();
}

export async function updateAnnonce(id: string, data: Annonce) {
  const res = await fetch(`${API_BASE}/annonce/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  return res.json();
}

export async function deleteAnnonce(id: string) {
  const res = await fetch(`${API_BASE}/annonce/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
}
