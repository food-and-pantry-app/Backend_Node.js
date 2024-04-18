const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./mydb.sqlite3",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) console.error(err.message);
  }
);

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

function getAllItems(callback) {
  const query = "SELECT * FROM pantry";
  db.all(query, [], (err, rows) => {
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
      callback(null, { id: this.changes });
    }
  );
}

function deleteItem(id, callback) {
  const query = `DELETE FROM pantry WHERE ID = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, { deleted: this.changes });
  });
}

module.exports = { addItem, getAllItems, updateItem, deleteItem };
