// const express = require("express");
// const router = express.Router();
// const recipesController = require("../controllers/recipesController");

// // Create a new recipe
// router.post("/", recipesController.createRecipe);

// // Get all recipes
// router.get("/", recipesController.listAllRecipes);

// // Update a recipe
// router.put("/:id", recipesController.updateRecipe);

// // Delete a recipe
// router.delete("/:id", recipesController.deleteRecipe);

// module.exports = router;

const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");

// Create a new recipe
router.post("/", recipesController.createRecipe);

// Get all recipes
router.get("/", recipesController.listAllRecipes);

// Update a recipe
router.put("/:id", recipesController.updateRecipe);

// Delete a recipe
router.delete("/:id", recipesController.deleteRecipe);

module.exports = router;
