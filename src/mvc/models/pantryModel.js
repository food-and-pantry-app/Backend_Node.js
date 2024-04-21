const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../../mydb.sqlite3");
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error("Error opening database: " + err.message);
});

function addItem(item, callback) {
  const { Name, Quantity, Unit, Tags, ImageURL, ExpirationDate } = item;
  const query = `INSERT INTO pantry (Name, Quantity, Unit, Tags, ImageURL, ExpirationDate) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(
    query,
    [Name, Quantity, Unit, Tags, ImageURL, ExpirationDate],
    function (err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, { id: this.lastID });
    }
  );
}

function addMultipleItems(items, callback) {
  const placeholders = items.map(() => "(?, ?, ?, ?, ?, ?)").join(",");
  const values = [];
  items.forEach((item) => {
    values.push(
      item.Name,
      item.Quantity,
      item.Unit,
      item.Tags,
      item.ImageURL,
      item.ExpirationDate
    );
  });

  const sql = `INSERT INTO pantry (Name, Quantity, Unit, Tags, ImageURL, ExpirationDate) VALUES ${placeholders}`;
  db.run(sql, values, function (err) {
    if (err) {
      console.error("Error in addMultipleItems:", err.message);
      callback(err);
      return;
    }
    callback(null, { lastID: this.lastID });
  });
}

function getAllItems(callback) {
  db.all("SELECT * FROM pantry", [], (err, rows) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, rows);
  });
}

function updateItem(id, item, callback) {
  const { Name, Quantity, Unit, Tags, ImageURL, ExpirationDate } = item;
  const query = `UPDATE pantry SET Name = ?, Quantity = ?, Unit = ?, Tags = ?, ImageURL = ?, ExpirationDate = ? WHERE ID = ?`;
  db.run(
    query,
    [Name, Quantity, Unit, Tags, ImageURL, ExpirationDate, id],
    function (err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, { changes: this.changes });
    }
  );
}

function deleteItem(id, callback) {
  db.run(`DELETE FROM pantry WHERE ID = ?`, [id], function (err) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, { deleted: this.changes });
  });
}

function deleteMultiple(ids, callback) {
  const placeholders = ids.map(() => "?").join(",");
  db.run(
    `DELETE FROM pantry WHERE ID IN (${placeholders})`,
    ids,
    function (err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, { deletedCount: this.changes });
    }
  );
}

// function deleteAllItems(callback) {
//   db.run(`DELETE FROM pantry`, function (err) {
//     if (err) {
//       callback(err);
//       return;
//     }
//     callback(null, { deletedCount: this.changes });
//   });
// }

function deleteAllItems(callback) {
  console.log("Attempting to delete all items from the pantry table.");
  db.run(`DELETE FROM pantry`, function (err) {
    if (err) {
      console.error("Error deleting items:", err);
      callback(err);
      return;
    }
    console.log(`Deleted ${this.changes} items from the pantry.`);
    callback(null, { deletedCount: this.changes });
  });
}

module.exports = {
  addItem,
  addMultipleItems,
  getAllItems,
  updateItem,
  deleteItem,
  deleteMultiple,
  deleteAllItems,
};
