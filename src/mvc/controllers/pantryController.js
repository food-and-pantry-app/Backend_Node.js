const pantryModel = require("../models/pantryModel");

function createItem(req, res) {
  pantryModel.addItem(req.body, (err, result) => {
    if (err) {
      res.status(500).send("Error adding item to the database");
      return;
    }
    res.status(201).json(result);
  });
}

function createMultipleItems(req, res) {
  pantryModel.addMultipleItems(req.body.items, (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Failed to add items", details: err.message });
      return;
    }
    res
      .status(201)
      .json({ message: "Items added successfully", lastInsertedId: result.id });
  });
}

function listItems(req, res) {
  pantryModel.getAllItems((err, items) => {
    if (err) {
      res.status(500).send("Error retrieving items from the database");
      return;
    }
    res.json(items);
  });
}

function updateItem(req, res) {
  pantryModel.updateItem(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(500).send("Error updating the item in the database");
      return;
    }
    res.json({ message: "Item updated", id: req.params.id });
  });
}

function deleteItem(req, res) {
  pantryModel.deleteItem(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send("Error deleting the item from the database");
      return;
    }
    res.json({ message: "Item deleted", id: req.params.id });
  });
}

function deleteMultipleItems(req, res) {
  const ids = req.body.ids; // Expecting an array of IDs from the request body
  pantryModel.deleteMultiple(ids, function (err, result) {
    if (err) {
      res
        .status(500)
        .json({ message: "Error deleting multiple items", error: err.message });
      return;
    }
    res
      .status(200)
      .json({ message: "Items deleted", deletedCount: result.deletedCount });
  });
}

function deleteAllItems(req, res) {
  console.log("DELETE /all handler executing.");
  pantryModel.deleteAllItems((err, result) => {
    if (err) {
      console.error("Error when deleting all items:", err);
      res.status(500).send("Error deleting all items from the database");
      return;
    }
    console.log(`Response from model: ${JSON.stringify(result)}`);
    res.json({
      message: "All items deleted",
      deletedCount: result.deletedCount,
    });
  });
}

module.exports = {
  createItem,
  createMultipleItems,
  listItems,
  updateItem,
  deleteItem,
  deleteMultipleItems,
  deleteAllItems,
};
