/**
 * Service to handle sharing annonces functionality
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL!;
/**
 * Generate a shareable link for annonces
 * @returns Promise with the shareable link
 */
export async function generateShareLink(): Promise<string> {
  try {
    const response = await fetch(`${API_BASE}/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    });
    
    if (!response.ok) {
      throw new Error(`Error generating share link: ${response.status}`);
    }
    
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Failed to generate share link:', error);
    throw error;
  }
}

/**
 * Fetch annonces using a share token
 * @param token The share token to fetch annonces
 * @returns Promise with the annonces data
 */
export async function getSharedAnnonce(token: string) {
  try {
    const response = await fetch(`${API_BASE}/share/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching shared annonces: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch shared annonces:', error);
    throw error;
  }
}
