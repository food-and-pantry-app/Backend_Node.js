const path = require("path");
const fs = require("fs");
const recipesModel = require("../models/recipesModel");
const {
  generateRecipesByCategory,
} = require("../../services/recipesGPT/seedRecipesGPT");
const {
  generateRecipeImage,
} = require("../../services/recipesGPT/generateIMG");
const {
  loadRecipesAndSaveToDB,
} = require("../../services/recipesGPT/writeRecipesToDB");

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
    res.status(201).json({
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

async function generateAndSaveRecipes(req, res) {
  const { cuisine } = req.body; // Extract 'cuisine' from the request body

  try {
    // Step 1: Generate recipes and save to JSON file
    await generateRecipesByCategory(cuisine);

    // Step 2: Load initial recipes from JSON and save to the database without images
    await loadRecipesAndSaveToDB();

    // Step 3: Attempt to update the recipes JSON file with images from DALL-E
    try {
      await updateRecipesWithImages();
    } catch (imgError) {
      console.error(
        "Image generation failed, but recipes were saved:",
        imgError
      );
    }

    res.status(201).json({
      message:
        "Recipes generated and saved successfully, images may be pending",
    });
  } catch (error) {
    console.error("Error in generating and saving recipes:", error);
    res.status(500).json({
      error: "Failed to generate or save recipes",
      details: error.message,
    });
  }

  async function updateRecipesWithImages() {
    const filePath = path.join(
      __dirname,
      "../../services/recipesGPT/recipeItems.json"
    );
    try {
      const data = fs.readFileSync(filePath, "utf8");
      const recipes = JSON.parse(data);

      const updatedRecipes = await Promise.all(
        recipes.map(async (recipe) => {
          try {
            const imageUrl = await generateRecipeImage(
              `${recipe.Title} ${recipe.Cuisine}`
            );
            recipe.Images = imageUrl;
            return recipe;
          } catch (imgError) {
            console.error(
              `Failed to generate image for ${recipe.Title}:`,
              imgError
            );
            return { ...recipe, Images: null }; // Fallback: save recipe without image if DALL-E fails
          }
        })
      );

      fs.writeFileSync(filePath, JSON.stringify(updatedRecipes, null, 2));
    } catch (error) {
      console.error("Error during the image update process:", error);
      throw error; // Continue throwing to signal the upper catch block
    }
  }
}

module.exports = {
  createRecipe,
  listAllRecipes,
  updateRecipe,
  deleteRecipe,
  generateAndSaveRecipes,
};
