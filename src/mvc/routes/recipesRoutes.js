const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");

router.post("/", recipesController.createRecipe);
router.get("/", recipesController.listAllRecipes);
router.put("/:id", recipesController.updateRecipe);
router.delete("/:id", recipesController.deleteRecipe);

// Route to handle generating recipes via GPT-3.5 and images via DALL-E 3
router.post("/generate", recipesController.generateAndSaveRecipes);

module.exports = router;
