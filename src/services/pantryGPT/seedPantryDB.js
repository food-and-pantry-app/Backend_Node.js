require("dotenv").config({ path: "../../../.env" });
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";
const OUTPUT_FILE = path.join(__dirname, "pantryItems.json"); // Output file in the current directory

const generatePantryItemsByCategory = async (category, count) => {
  console.log(`Generating ${count} pantry item(s) for category: ${category}`);
  const maxTokens = 150 + count * 70; // Increase tokens as needed based on items

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `Generate ${count} pantry items specifically for the "${category}" category. Each item should have a Name, Quantity as an integer, Unit from the specified list, "${category}" as Tags, an ImageURL set to null, an ExpirationDate in ISO format, and the response format must be in JSON. Do not output in Markdown, a string of JSON data is expected.  Here is an example of your output ([
              {
                "Name": "Frozen Green Beans",
                "Quantity": 2,
                "Unit": "bags",
                "Tags": "Frozen",
                "ImageURL": null,
                "ExpirationDate": "2023-09-30"
              }
            ]) Your properties should be Name, Quantity, Unit, Tags, ImageURL, and ExpirationDate.`,
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

    // Process and save the response to a JSON file
    const jsonResponse = JSON.parse(
      response.data.choices[0].message.content.trim()
    );
    console.log(`Generated Pantry Items for ${category}:\n`, jsonResponse);

    saveItemsToFile(jsonResponse);
  } catch (error) {
    console.error(`Error generating items for ${category}:`, error.message);
    if (error.response) {
      console.error("Status code:", error.response.status);
      console.error("Response body:", error.response.data);
      if (error.response.data.error && error.response.data.error.message) {
        console.error("Detailed Error:", error.response.data.error.message);
      }
    } else {
      console.error("No response data");
    }
  }
};

function saveItemsToFile(items) {
  // Read the current content of the file
  fs.readFile(OUTPUT_FILE, { encoding: "utf8", flag: "a+" }, (err, data) => {
    let json = [];
    if (!err && data.length) {
      json = JSON.parse(data); // Parse existing data if file is not empty
    }
    json.push(...items); // Append new items directly
    // Write updated JSON back to file
    fs.writeFile(OUTPUT_FILE, JSON.stringify(json, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Successfully saved items to file:", OUTPUT_FILE);
      }
    });
  });
}

// Example usage:
generatePantryItemsByCategory("Frozen", 20);

// Produce
// Dairy & Eggs
// Meat & Seafood
// Canned Goods
// Dry Goods
// Baking Supplies
// Spices & Herbs
// Snacks
// Condiments
// Beverages
// Frozen
