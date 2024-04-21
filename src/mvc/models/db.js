// models/db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Adjust path to go two levels up from models to src
const dbPath = path.join(__dirname, "..", "..", "mydb.sqlite3");

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Successfully connected to the database in src directory.");
  }
});

db.on("trace", (sql) => {
  console.log("Executing SQL:", sql);
});

module.exports = db;
