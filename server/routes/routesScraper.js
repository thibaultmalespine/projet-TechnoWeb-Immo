import express from 'express';
import scraping from '../scraper/scarper.js';

const router = express.Router();

router.post("/scraper", scraping);

export default router;