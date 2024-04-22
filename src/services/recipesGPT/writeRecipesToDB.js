const fs = require("fs");
const path = require("path");
const recipesModel = require("../../mvc/models/recipesModel");

const INPUT_FILE = path.join(__dirname, "recipeItems.json");

function formatIngredients(ingredients) {
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
    const recipes = JSON.parse(data);
    recipes.forEach((recipe) => {
      // Format ingredients if necessary
      recipe.Ingredients = formatIngredients(recipe.Ingredients);

      // Ensure image URLs are saved correctly
      if (typeof recipe.Images === "string") {
        recipe.Images = cleanString(recipe.Images); // Clean the string from any extra quotes
      }

      // You might also want to ensure that other fields are clean
      recipe.Title = cleanString(recipe.Title);
      recipe.Description = cleanString(recipe.Description);
      recipe.Cuisine = cleanString(recipe.Cuisine);

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

// Call this function to start the import process
loadRecipesAndSaveToDB();
