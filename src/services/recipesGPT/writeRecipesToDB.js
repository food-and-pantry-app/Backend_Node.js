const fs = require("fs");
const path = require("path");
const recipesModel = require("../../mvc/models/recipesModel");

const INPUT_FILE = path.join(__dirname, "recipeItems.json");

function formatIngredients(ingredients) {
  if (!Array.isArray(ingredients)) {
    console.error("Invalid ingredients format:", ingredients);
    return []; // Return an empty array if ingredients are not in expected format
  }
  return ingredients.map((ingredient) => {
    if (typeof ingredient === "string") {
      // Split the string if needed or adapt this part to your specific format
      return { Name: ingredient, Quantity: "", Unit: "" };
    }
    return ingredient; // Assumes ingredients are already in the correct object format
  });
}

function cleanString(input) {
  // Remove any surrounding quotes and unnecessary whitespace
  return input.replace(/^"|"$/g, "").trim();
}

function loadRecipesAndSaveToDB() {
  fs.readFile(INPUT_FILE, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.error("Error reading recipe items file:", err);
      return;
    }
    let recipes;
    try {
      recipes = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing recipe items file:", parseError);
      return;
    }

    recipes.forEach((recipe) => {
      // Check each field for existence and clean/format if necessary
      recipe.Ingredients = formatIngredients(recipe.Ingredients);
      recipe.Images = cleanString(recipe.Images || "");
      recipe.Title = cleanString(recipe.Title || "Untitled");
      recipe.Description = cleanString(recipe.Description || "");
      recipe.Cuisine = cleanString(recipe.Cuisine || "General");

      recipesModel.addRecipe(recipe, (err, result) => {
        if (err) {
          console.error("Error saving recipe to database:", err);
        } else {
          console.log("Recipe saved to database with ID:", result.id);
        }
      });
    });
  });
}

module.exports = { loadRecipesAndSaveToDB };
