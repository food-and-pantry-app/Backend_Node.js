const sqlite3 = require("sqlite3").verbose();
const DB_PATH = "./mydb.sqlite3"; // Consistent database file path

// Function to set up the database
function setupDatabase() {
  let db = new sqlite3.Database(
    DB_PATH,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error("Error opening database " + err.message);
        return;
      }

      console.log("Connected to the SQLite database.");

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
          } else {
            console.log("Table `recipes` created or already exists.");
          }
        }
      );

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
          } else {
            console.log("Table `pantry` created or already exists.");
          }
        }
      );
    }
  );

  return db;
}

module.exports = setupDatabase; // Exporting the setup function
