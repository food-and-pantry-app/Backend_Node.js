Great! It looks like your database and tables are now set up correctly. With your tables created successfully, you should now be able to perform all CRUD operations without encountering errors related to missing tables.

Let’s recap the `curl` commands you can use to test the CRUD operations for both your `pantry` and `recipes` endpoints. Make sure your server is running when you execute these commands.

### Test Pantry CRUD Operations

1. **Create a Pantry Item**:

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

2. **List Pantry Items**:

   ```bash
   curl -X GET http://localhost:3000/api/pantry/
   ```

3. **Update a Pantry Item**:

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

4. **Delete a Pantry Item**:

   ```bash
   curl -X DELETE http://localhost:3000/api/pantry/1
   ```

### Test Recipes CRUD Operations

1. **Create a Recipe**:

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

2. **List Recipes**:

   ```bash
   curl -X GET http://localhost:3000/api/recipes/
   ```

3. **Update a Recipe**:

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

4. **Delete a Recipe**:

   ```bash
   curl -X DELETE http://localhost:3000/api/recipes/1
   ```

Make sure the IDs used in the update and delete operations correspond to actual entries in your database. These `curl` commands should now work correctly if everything is set up as described.
