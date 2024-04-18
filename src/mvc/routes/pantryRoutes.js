const express = require("express");
const router = express.Router();
const pantryController = require("../controllers/pantryController");

// Create a new pantry item
router.post("/", pantryController.createItem);

// Get all pantry items
router.get("/", pantryController.listItems);

// Update a pantry item
router.put("/:id", pantryController.updateItem);

// Delete a pantry item
router.delete("/:id", pantryController.deleteItem);

module.exports = router;
