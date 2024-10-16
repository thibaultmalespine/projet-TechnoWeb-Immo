const express = require('express');
const path = require('path');

const app = express();

 // middleware pour servir les fichiers static
app.use('/static',express.static(path.join(__dirname, '../public/static/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'));
});

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
});
