const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Connected to the mydatabase.db database.');
});

const createTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS diaries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        sentiment TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            // Table already created
        }else{
            // Table just created, creating some rows
            var insert = 'INSERT INTO diaries (content, sentiment) VALUES (?,?)'
            db.run(insert, ["What a beautiful day!", "positive"])
            db.run(insert, ["I'm so tired.", "negative"])
        }
    });
}

module.exports = {
    db,
    createTable
};
