// models/db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.join(__dirname, "..", "..", "mydb.sqlite3"); // Ensure it points to the root

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  }
});

module.exports = db;
