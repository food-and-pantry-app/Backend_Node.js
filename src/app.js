const express = require("express");
const bodyParser = require("body-parser");
const recipesRoutes = require("./mvc/routes/recipesRoutes");
const pantryRoutes = require("./mvc/routes/pantryRoutes");
const setupDatabase = require("./database"); // Import the setupDatabase function

const app = express();
app.use(bodyParser.json());

// Set up database tables
const db = setupDatabase(); // This should ensure tables are ready before the server starts listening.

app.use("/api/recipes", recipesRoutes);
app.use("/api/pantry", pantryRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
