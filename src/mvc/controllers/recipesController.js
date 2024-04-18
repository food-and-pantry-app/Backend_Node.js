const recipesModel = require("../models/recipesModel");

function listAllRecipes(req, res) {
  recipesModel.getAllRecipes((err, recipes) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "success", data: recipes });
  });
}

function createRecipe(req, res) {
  recipesModel.addRecipe(req.body, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res
      .status(201)
      .json({ message: "Recipe created", data: req.body, id: result.id });
  });
}

function updateRecipe(req, res) {
  recipesModel.updateRecipe(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Recipe updated", id: req.params.id });
  });
}

function deleteRecipe(req, res) {
  recipesModel.deleteRecipe(req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Recipe deleted", id: req.params.id });
  });
}

module.exports = {
  listAllRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
