const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const { db, createTable } = require('./database.js');

app.use(cors());
app.use(express.json());
app.use(express.static('../public'));

createTable();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
