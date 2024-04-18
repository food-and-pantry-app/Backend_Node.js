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

module.exports = { createItem, listItems, updateItem, deleteItem };
