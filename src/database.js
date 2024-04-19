const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const DB_PATH = path.resolve(__dirname, "..", "mydb.sqlite3"); // Adjust the path to point to the root directory

function setupDatabase() {
  let db = new sqlite3.Database(
    DB_PATH,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error("Error opening database: " + err.message);
        return;
      }
      console.log("Connected to the SQLite database.");

      // Create the recipes table
      db.run(
        `CREATE TABLE IF NOT EXISTS recipes (
          RecipeID INTEGER PRIMARY KEY AUTOINCREMENT,
          Title TEXT NOT NULL,
          Images TEXT,
          Cuisine TEXT,
          Description TEXT,
          Ingredients TEXT,
          Instructions TEXT,
          PrepTime INTEGER,
          CookTime INTEGER,
          TotalTime INTEGER,
          Servings INTEGER,
          CreatedAt TEXT
        )`,
        (err) => {
          if (err) {
            console.error("Error creating recipes table: " + err.message);
            return;
          }
          console.log("Table `recipes` created or already exists.");
        }
      );

      // Create the pantry table
      db.run(
        `CREATE TABLE IF NOT EXISTS pantry (
          ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Name TEXT NOT NULL,
          Quantity INTEGER NOT NULL,
          Unit TEXT NOT NULL,
          Tags TEXT,
          ImageURL TEXT,
          ExpirationDate TEXT
        )`,
        (err) => {
          if (err) {
            console.error("Error creating pantry table: " + err.message);
            return;
          }
          console.log("Table `pantry` created or already exists.");
        }
      );
    }
  );

  return db;
}

module.exports = setupDatabase;
