# Backend API for Pantry and Recipes Management

## Overview

This backend API provides a system for managing pantry items and recipes. It supports full CRUD operations, allowing users to create, read, update, and delete pantry items and recipes. The API is built using Node.js with Express and communicates with an SQLite database.

## Getting Started

### Initial Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Pantry Endpoints

- **Create a Pantry Item**

  ```bash
  curl -X POST http://localhost:3000/api/pantry/ \
  -H "Content-Type: application/json" \
  -d '{
      "Name": "Olive Oil",
      "Quantity": 1,
      "Unit": "bottle",
      "Tags": "cooking, oil",
      "ImageURL": "https://example.com/olive_oil.jpg",
      "ExpirationDate": "2025-05-12"
  }'
  ```

- **List Pantry Items**

  ```bash
  curl -X GET http://localhost:3000/api/pantry/
  ```

- **Update a Pantry Item**

  ```bash
  curl -X PUT http://localhost:3000/api/pantry/1 \
  -H "Content-Type: application/json" \
  -d '{
      "Name": "Extra Virgin Olive Oil",
      "Quantity": 2,
      "Unit": "bottle",
      "Tags": "cooking, oil, healthy",
      "ImageURL": "https://example.com/extra_virgin_olive_oil.jpg",
      "ExpirationDate": "2026-01-01"
  }'
  ```

- **Delete a Pantry Item**

  ```bash
  curl -X DELETE http://localhost:3000/api/pantry/1
  ```

### Recipes Endpoints

- **Create a Recipe**

  ```bash
  curl -X POST http://localhost:3000/api/recipes/ \
  -H "Content-Type: application/json" \
  -d '{
      "Title": "Tomato Pasta",
      "Images": ["https://example.com/tomato_pasta.jpg"],
      "Cuisine": "Italian",
      "Description": "Simple and delicious tomato pasta.",
      "Ingredients": "[{\"ingredient\": \"Pasta\", \"quantity\": \"200g\"}, {\"ingredient\": \"Tomato Sauce\", \"quantity\": \"100ml\"}]",
      "Instructions": "[\"Boil Pasta\", \"Mix with sauce\"]",
      "PrepTime": 10,
      "CookTime": 20,
      "TotalTime": 30,
      "Servings": 2,
      "CreatedAt": "2024-10-10T00:00:00Z"
  }'
  ```

- **List Recipes**

  ```bash
  curl -X GET http://localhost:3000/api/recipes/
  ```

- **Update a Recipe**

  ```bash
  curl -X PUT http://localhost:3000/api/recipes/1 \
  -H "Content-Type: application/json" \
  -d '{
      "Title": "Updated Tomato Pasta",
      "Images": ["https://example.com/updated_tomato_pasta.jpg"],
      "Cuisine": "Italian",
      "Description": "Updated simple and delicious tomato pasta.",
      "Ingredients": "[{\"ingredient\": \"Pasta\", \"quantity\": \"250g\"}, {\"ingredient\": \"Tomato Sauce\", \"quantity\": \"150ml\"}]",
      "Instructions": "[\"Boil Pasta\", \"Mix with updated sauce\"]",
      "PrepTime": 12,
      "CookTime": 22,
      "TotalTime": 34,
      "Servings": 3,
      "CreatedAt": "2024-10-11T00:00:00Z"
  }'
  ```

- **Delete a Recipe**

  ```bash
  curl -X DELETE http://localhost:3000/api/recipes/1
  ```

Feel free to adjust the `curl` commands to match the specific IDs and details of your database entries.
