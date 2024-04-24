require("dotenv").config({ path: "../../../.env" });
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";
const OUTPUT_FILE = path.join(__dirname, "recipeItems.json");

const generateRecipesByCategory = async (cuisine) => {
  console.log(`Generating recipe item(s) for cuisine: ${cuisine}`);

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `Generate a concise recipe for "${cuisine}" cuisine. Each recipe should include a Title (String), Images as null, Cuisine (String), a short Description (String), Ingredients (String), Instructions (String), PrepTime (Int), CookTime (Int), TotalTime (Int), Servings (Int), and CreatedAt in ISO format. The response must be in JSON format.  Only output a string in JSON format, no backticks or markdown.  Only the string thats it!`,
          },
        ],
        max_tokens: 1000,
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
    jsonResponseText = jsonResponseText
      .replace(/`+/g, "")
      .replace(/[\r\n]+/g, " ")
      .trim(); // Remove backticks and newlines

    // Attempt to safely parse the JSON
    const jsonResponse = safeJSONParse(jsonResponseText);
    if (jsonResponse) {
      console.log(`Generated Recipes for ${cuisine}:\n`, jsonResponse);
      saveItemsToFile(jsonResponse);
    } else {
      throw new Error("Failed to parse JSON properly.");
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

function safeJSONParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("JSON parsing error:", e.message);
    return null;
  }
}

function saveItemsToFile(items) {
  const filePath = path.join(__dirname, "recipeItems.json");
  fs.readFile(filePath, { encoding: "utf8", flag: "a+" }, (err, data) => {
    let json = [];
    if (!err && data.length) {
      try {
        json = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing existing JSON data:", parseErr);
        json = []; // Reset to empty array if parsing fails
      }
    }

    const itemsToAdd = Array.isArray(items) ? items : [items];
    json.push(...itemsToAdd.filter((item) => item && typeof item === "object"));

    fs.writeFile(filePath, JSON.stringify(json, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing to file:", writeErr);
      } else {
        console.log("Successfully saved items to file:", filePath);
      }
    });
  });
}

// module.exports = { generateRecipesByCategory };
generateRecipesByCategory("Italian");
