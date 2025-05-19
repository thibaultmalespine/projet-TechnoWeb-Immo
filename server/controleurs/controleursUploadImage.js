/**
 * Contrôleur pour la gestion des uploads d'images
 */
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Contrôleur pour uploader une image
export const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier téléchargé' });
    }

    // Get relative path for saving in database
    const relativePath = `/images/${req.file.filename}`;
    
    return res.status(200).json({
      message: 'Image téléchargée avec succès',
      imagePath: relativePath
    });
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    return res.status(500).json({ error: 'Erreur lors du téléchargement de l\'image' });
  }
};

// Contrôleur pour supprimer une image
export const deleteImage = (req, res) => {
  try {
    const { imagePath } = req.body;
    
    if (!imagePath) {
      return res.status(400).json({ error: 'Chemin d\'image non fourni' });
    }
    
    // Extract filename from path
    const filename = path.basename(imagePath);
    
    // Build the full path to the image
    const imageFsPath = path.join(__dirname, '..', '..', 'public', 'images', filename);
    
    // Check if file exists
    if (fs.existsSync(imageFsPath)) {
      // Delete the file
      fs.unlinkSync(imageFsPath);
      return res.status(200).json({ message: 'Image supprimée avec succès' });
    } else {
      // File not found but don't fail the request
      console.warn(`Image not found at path: ${imageFsPath}`);
      return res.status(200).json({ message: 'Image non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
    return res.status(500).json({ error: 'Erreur lors de la suppression de l\'image' });
  }
};
