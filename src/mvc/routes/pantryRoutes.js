const express = require("express");
const router = express.Router();
const pantryController = require("../controllers/pantryController");

// Create a new pantry item
router.post("/", pantryController.createItem);

// Create multiple pantry items
router.post("/batch", pantryController.createMultipleItems);

// Get all pantry items
router.get("/", pantryController.listItems);

// Update a pantry item
router.put("/:id", pantryController.updateItem);

// Delete a pantry item
router.delete("/:id", pantryController.deleteItem);

// Delete multiple pantry items
router.delete("/", pantryController.deleteMultipleItems);

// Delete all pantry items
router.delete("/all", pantryController.deleteAllItems);

module.exports = router;
