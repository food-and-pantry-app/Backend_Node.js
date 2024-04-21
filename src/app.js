const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS module
const recipesRoutes = require("./mvc/routes/recipesRoutes");
const pantryRoutes = require("./mvc/routes/pantryRoutes");
const setupDatabase = require("./database"); // Import the setupDatabase function

const app = express();

app.use(cors()); // Enable CORS for all origins
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json()); // Parse JSON-encoded bodies

// Set up database tables
setupDatabase(); // This should ensure tables are ready before the server starts listening.

// Routing
app.use("/api/recipes", recipesRoutes);
app.use("/api/pantry", pantryRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
