const db = require("./db"); // Ensure this path correctly points to your DB module

function getAllRecipes(callback) {
  db.all("SELECT * FROM Recipes", [], function (err, rows) {
    if (err) {
      console.error("Error fetching recipes:", err.message); // Error logging
      callback(err, null);
      return;
    }
    callback(null, rows);
  });
}

function addRecipe(recipeData, callback) {
  const {
    Title,
    Images,
    Cuisine,
    Description,
    Ingredients,
    Instructions,
    PrepTime,
    CookTime,
    TotalTime,
    Servings,
    CreatedAt,
  } = recipeData;
  const sql = `INSERT INTO Recipes (Title, Images, Cuisine, Description, Ingredients, Instructions, PrepTime, CookTime, TotalTime, Servings, CreatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    Title,
    JSON.stringify(Images),
    Cuisine,
    Description,
    JSON.stringify(Ingredients),
    JSON.stringify(Instructions),
    PrepTime,
    CookTime,
    TotalTime,
    Servings,
    CreatedAt,
  ];
  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error adding recipe:", err.message); // Log SQL error
      callback(err);
      return;
    }
    callback(null, { id: this.lastID });
  });
}

function updateRecipe(id, recipeData, callback) {
  const {
    Title,
    Images,
    Cuisine,
    Description,
    Ingredients,
    Instructions,
    PrepTime,
    CookTime,
    TotalTime,
    Servings,
    CreatedAt,
  } = recipeData;
  const sql = `UPDATE Recipes SET Title = ?, Images = ?, Cuisine = ?, Description = ?, Ingredients = ?, Instructions = ?, PrepTime = ?, CookTime = ?, TotalTime = ?, Servings = ?, CreatedAt = ? WHERE RecipeID = ?`;
  const params = [
    Title,
    JSON.stringify(Images),
    Cuisine,
    Description,
    JSON.stringify(Ingredients),
    JSON.stringify(Instructions),
    PrepTime,
    CookTime,
    TotalTime,
    Servings,
    CreatedAt,
    id,
  ];
  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error updating recipe:", err.message); // Log SQL error
      callback(err);
      return;
    }
    callback(null, { id: this.changes });
  });
}

function deleteRecipe(id, callback) {
  const sql = `DELETE FROM Recipes WHERE RecipeID = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Error deleting recipe:", err.message); // Log SQL error
      callback(err);
      return;
    }
    callback(null, { deleted: this.changes });
  });
}

module.exports = {
  getAllRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
