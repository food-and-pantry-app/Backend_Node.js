const fs = require("fs");
const path = require("path");
const pantryModel = require("../../mvc/models/pantryModel");

const INPUT_FILE = path.join(__dirname, "pantryItems.json");

function loadItemsAndSaveToDB() {
  fs.readFile(INPUT_FILE, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.error("Error reading pantry items file:", err);
      return;
    }
    const items = JSON.parse(data);
    items.forEach((item) => {
      pantryModel.addItem(item, (err, result) => {
        if (err) {
          console.error("Error saving item to database:", err);
        } else {
          console.log("Item saved to database with ID:", result.id);
        }
      });
    });
  });
}

// Call this function to start the import process
loadItemsAndSaveToDB();
