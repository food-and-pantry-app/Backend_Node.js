require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS module
const recipesRoutes = require("./mvc/routes/recipesRoutes");
const pantryRoutes = require("./mvc/routes/pantryRoutes");
const setupDatabase = require("./database"); // Import the setupDatabase function

const app = express();

app.use(cors());
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());

setupDatabase();

app.use("/api/recipes", recipesRoutes);
app.use("/api/pantry", pantryRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
