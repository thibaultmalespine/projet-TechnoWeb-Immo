import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price : number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").split('.')[0]
}

// Helper function to validate image files
export function validateImageFile(file: File): boolean {
  // Check if file is an image
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return false;
  }
  
  // Check file size (limit to 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return false;
  }
  
  return true;
}
