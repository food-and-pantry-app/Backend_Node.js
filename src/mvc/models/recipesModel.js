const db = require("./db");

function getAllRecipes(callback) {
  db.all("SELECT * FROM Recipes", [], function (err, rows) {
    callback(err, rows);
  });
}

function addRecipe(recipeData, callback) {
  const {
    RecipeID,
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
  const sql = `INSERT INTO Recipes (RecipeID, Title, Images, Cuisine, Description, Ingredients, Instructions, PrepTime, CookTime, TotalTime, Servings, CreatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
  const params = [
    RecipeID,
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
    callback(err, { id: this.lastID });
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
    callback(err, { id: this.changes });
  });
}

function deleteRecipe(id, callback) {
  const sql = `DELETE FROM Recipes WHERE RecipeID = ?`;
  db.run(sql, [id], function (err) {
    callback(err, { deleted: this.changes });
  });
}

module.exports = {
  getAllRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
