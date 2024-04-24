const axios = require("axios");
require("dotenv").config({ path: "../../../.env" });

const fs = require("fs");
// Retrieve the API key from environment variables
const API_KEY = process.env.API_KEY;

const headers = {
  Authorization: `Bearer ${API_KEY}`, // Make sure this references the correct environment variable
  "Content-Type": "application/json",
};

/**
 * Generates an image using OpenAI's DALL-E 3 based on a detailed prompt.
 * @param {string} detailedPrompt - A detailed description of the image to generate.
 * @returns {Promise<string>} - The URL of the generated image.
 */
async function generateRecipeImage(detailedPrompt) {
  try {
    // Make an HTTP POST request to the OpenAI API to generate an image
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "dall-e-3",
        prompt: detailedPrompt, // Use the detailed prompt provided
        n: 1, // Generate one image
        size: "1024x1024", // Specify the image size
      },
      { headers } // Include the authorization headers
    );

    // Extract the URL of the generated image from the response
    const imageUrl = response.data.data[0].url;
    console.log("Generated image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error generating recipe image:", error.message);
    if (error.response) {
      // If there is an API response error, log detailed information
      console.error("API response error:", error.response.data);
    }
    throw new Error("Failed to generate recipe image.");
  }
}

// module.exports = { generateRecipeImage };
// generateRecipeImage("A delicious pasta dish with tomato sauce and basil");
