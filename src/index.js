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

app.post('/diaries', (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    const insert = 'INSERT INTO diaries (content) VALUES (?)';
    db.run(insert, [content], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, content });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
