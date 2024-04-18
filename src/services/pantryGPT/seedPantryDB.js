require("dotenv").config({ path: "../../../.env" });
const axios = require("axios");

const API_KEY = process.env.API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

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
            content: `Generate ${count} pantry items specifically for the "${category}" category. Each item should have a name, quantity as an integer, unit from the specified list, "${category}" as a tag, an expiration date in ISO format, and the respons format must be in JSON. Do not output in Markdown, a string of JSON data is expected.`,
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

    // Fetch and log the raw response string, ensuring it is JSON formatted
    const jsonResponse = response.data.choices[0].message.content.trim();
    console.log(`Generated Pantry Items for ${category}:\n`, jsonResponse);
    return jsonResponse;
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
    return null;
  }
};

// Example usage:
generatePantryItemsByCategory("Meat & Seafood", 30);
