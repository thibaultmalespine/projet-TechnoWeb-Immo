import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

 // middleware pour servir les fichiers static
app.use('/static',express.static(path.join(__dirname, '../public/static/')));

 // routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'));
});

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
});

export default app;
