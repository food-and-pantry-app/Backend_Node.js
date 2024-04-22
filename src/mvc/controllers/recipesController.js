// const recipesModel = require("../models/recipesModel");

// function createRecipe(req, res) {
//   console.log("Attempting to create recipe with data:", req.body); // Detailed logging
//   recipesModel.addRecipe(req.body, (err, result) => {
//     if (err) {
//       console.error("Error creating recipe:", err.message); // Error logging
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res
//       .status(201)
//       .json({ message: "Recipe created", data: req.body, id: result.id });
//   });
// }

// function listAllRecipes(req, res) {
//   recipesModel.getAllRecipes((err, recipes) => {
//     if (err) {
//       console.error("Error listing recipes:", err.message); // Error logging
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({ message: "Success", data: recipes });
//   });
// }

// function updateRecipe(req, res) {
//   console.log("Updating recipe with ID:", req.params.id); // Log which recipe is being updated
//   recipesModel.updateRecipe(req.params.id, req.body, (err, result) => {
//     if (err) {
//       console.error("Error updating recipe:", err.message); // Error logging
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({ message: "Recipe updated", id: req.params.id });
//   });
// }

// function deleteRecipe(req, res) {
//   console.log("Deleting recipe with ID:", req.params.id); // Log which recipe is being deleted
//   recipesModel.deleteRecipe(req.params.id, (err, result) => {
//     if (err) {
//       console.error("Error deleting recipe:", err.message); // Error logging
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({ message: "Recipe deleted", id: req.params.id });
//   });
// }

// module.exports = {
//   listAllRecipes,
//   createRecipe,
//   updateRecipe,
//   deleteRecipe,
// };

const recipesModel = require("../models/recipesModel");

function createRecipe(req, res) {
  console.log("Attempting to create recipe with data:", req.body); // Detailed logging
  recipesModel.addRecipe(req.body, (err, result) => {
    if (err) {
      console.error("Error creating recipe:", err.message); // Error logging
      res
        .status(500)
        .json({ error: "Failed to create recipe", details: err.message });
      return;
    }
    res
      .status(201)
      .json({
        message: "Recipe created successfully",
        data: req.body,
        id: result.id,
      });
  });
}

function listAllRecipes(req, res) {
  recipesModel.getAllRecipes((err, recipes) => {
    if (err) {
      console.error("Error listing recipes:", err.message); // Error logging
      res
        .status(500)
        .json({ error: "Failed to retrieve recipes", details: err.message });
      return;
    }
    res.json({ message: "Recipes retrieved successfully", data: recipes });
  });
}

function updateRecipe(req, res) {
  console.log("Updating recipe with ID:", req.params.id); // Log which recipe is being updated
  recipesModel.updateRecipe(req.params.id, req.body, (err, result) => {
    if (err) {
      console.error("Error updating recipe:", err.message); // Error logging
      res
        .status(500)
        .json({ error: "Failed to update recipe", details: err.message });
      return;
    }
    res.json({
      message: "Recipe updated successfully",
      id: req.params.id,
      changes: result.changes,
    });
  });
}

function deleteRecipe(req, res) {
  console.log("Deleting recipe with ID:", req.params.id); // Log which recipe is being deleted
  recipesModel.deleteRecipe(req.params.id, (err, result) => {
    if (err) {
      console.error("Error deleting recipe:", err.message); // Error logging
      res
        .status(500)
        .json({ error: "Failed to delete recipe", details: err.message });
      return;
    }
    res.json({
      message: "Recipe deleted successfully",
      id: req.params.id,
      deletedCount: result.deleted,
    });
  });
}

module.exports = {
  listAllRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
