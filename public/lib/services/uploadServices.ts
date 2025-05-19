/**
 * Services for handling image uploads to the server
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

/**
 * Response type for image upload
 */
export interface UploadResponse {
  message: string;
  imagePath: string;
}

/**
 * Upload a single image file to the server
 * @param file - The file to upload
 * @returns Promise with the server response containing the image path
 */
export async function uploadSingleImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${API_BASE}/upload-image`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const data = await response.json() as UploadResponse;
    return data.imagePath;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Upload multiple image files to the server
 * @param files - Array of files to upload
 * @returns Promise with array of image paths
 */
export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  if (!files || files.length === 0) return [];

  // Upload each image individually and collect their paths
  const uploadPromises = files.map(file => uploadSingleImage(file));
  
  return Promise.all(uploadPromises);
}

/**
 * Delete an image from the server
 * @param imagePath - The path of the image to delete
 * @returns Promise with success status
 */
export async function deleteImage(imagePath: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/delete-image`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ imagePath }),
    });

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

/**
 * Delete multiple images from the server
 * @param imagePaths - Array of image paths to delete
 * @returns Promise resolving when all images are deleted
 */
export async function deleteMultipleImages(imagePaths: string[]): Promise<boolean[]> {
  if (!imagePaths || imagePaths.length === 0) return [];

  const deletePromises = imagePaths.map(path => deleteImage(path));
  
  return Promise.all(deletePromises);
}
