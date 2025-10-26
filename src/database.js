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
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS diaries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            sentiment TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error(err.message);
            }
        });

        db.run(`ALTER TABLE diaries ADD COLUMN feedback TEXT`, (err) => {
            if (err) {
                // ignore if column already exists
            } else {
                console.log("Table altered, feedback column added.");
            }
        });
    });
}

module.exports = {
    db,
    createTable
};
