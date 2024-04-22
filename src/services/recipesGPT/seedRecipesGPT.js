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
            content: `Generate ${count} concise recipes for "${cuisine}" cuisine. Each recipe should include a Title (String), Images as null, Cuisine (String), a short Description (String), Ingredients as an array of strings, Instructions as an array of strings, PrepTime (Int), CookTime (Int), TotalTime (Int), Servings (Int), and CreatedAt in ISO format. The response must be in JSON format.`,
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

    // Clean response and remove markdown or backticks
    let jsonResponseText = response.data.choices[0].message.content.trim();
    jsonResponseText = jsonResponseText.replace(/`+/g, ""); // Remove backticks

    try {
      // Attempt to parse the cleaned JSON text
      const jsonResponse = JSON.parse(jsonResponseText);
      console.log(`Generated Recipes for ${cuisine}:\n`, jsonResponse);
      saveItemsToFile(jsonResponse);
    } catch (parseError) {
      // Log and throw error if JSON parsing fails
      console.error("Failed to parse JSON:", parseError.message);
      throw new Error(
        "GPT response failed, did not meet filter requirements. Try again."
      );
    }
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
      try {
        json = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing existing JSON data:", parseErr);
        json = [];
      }
    }

    // Append new items ensuring they are in correct format or filter out invalid items
    if (Array.isArray(items)) {
      json.push(
        ...items
          .map((item) => {
            if (item && typeof item === "object") {
              return item; // Add additional validation as necessary
            }
            return null;
          })
          .filter((item) => item !== null)
      );
    } else {
      console.error("Invalid recipes format:", items);
      throw new Error("Failed to append invalid recipe format to the file.");
    }

    fs.writeFile(OUTPUT_FILE, JSON.stringify(json, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing to file:", writeErr);
      } else {
        console.log("Successfully saved items to file:", OUTPUT_FILE);
      }
    });
  });
}

// Example usage
generateRecipesByCategory("Italian", 3);
