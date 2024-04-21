require("dotenv").config({ path: "../../../.env" });
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";
const OUTPUT_FILE = path.join(__dirname, "recipeItems.json");

const generateRecipesByCategory = async (cuisine, count) => {
  console.log(`Generating ${count} recipe item(s) for cuisine: ${cuisine}`);
  const maxTokens = 800 + count * 200;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `Generate ${count} concise recipes for "${cuisine}" cuisine. Each recipe should include a Title, Images as null, Cuisine, a short Description, Ingredients as a JSON array, Instructions as a JSON array, PrepTime, CookTime, TotalTime, Servings, and CreatedAt in ISO format. The response must be in JSON format.`,
          },
        ],
        max_tokens: maxTokens,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract JSON formatted string from response
    const jsonResponse = JSON.parse(
      response.data.choices[0].message.content.trim()
    );
    console.log(`Generated Recipes for ${cuisine}:\n`, jsonResponse);
    saveItemsToFile(jsonResponse);
  } catch (error) {
    console.error(`Error generating recipes for ${cuisine}:`, error.message);
    if (error.response) {
      console.error("Status code:", error.response.status);
      console.error("Response body:", error.response.data);
      if (error.response.data.error && error.response.data.error.message) {
        console.error("Detailed Error:", error.response.data.error.message);
      }
    } else {
      console.error("No response data");
      console.error("Check your API call or increase max_tokens.");
    }
  }
};

function saveItemsToFile(items) {
  fs.readFile(OUTPUT_FILE, { encoding: "utf8", flag: "a+" }, (err, data) => {
    let json = [];
    if (!err && data.length) {
      json = JSON.parse(data);
    }
    json.push(...items.recipes);
    fs.writeFile(OUTPUT_FILE, JSON.stringify(json, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Successfully saved items to file:", OUTPUT_FILE);
      }
    });
  });
}

// Example usage
generateRecipesByCategory("Italian", 5);
