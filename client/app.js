const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist'));

app.all('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(3000);
console.log('Listening on localhost:3000');
