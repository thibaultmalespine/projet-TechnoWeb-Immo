import express from 'express';
import { deleteImage, uploadImage } from '../controleurs/controleursUploadImage.js';
import upload from '../multer-config.js';

const router = express.Router();

// Route for image upload using the controller
router.post('/upload-image', upload.single('image'), uploadImage);

// Route for image deletion
router.delete('/delete-image', deleteImage);

export default router;
