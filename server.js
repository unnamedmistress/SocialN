// Import the Express module
const express = require("express");

// Import the database connection
const db = require("./config/connection");

// Import the routes
const routes = require("./routes");

// Create an instance of the Express application
const app = express();

// Set the server port
const PORT = process.env.PORT || 3001;

// Parse request bodies as JSON
app.use(express.json());

// Parse request bodies as URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Mount the routes
app.use(routes);

// Once the database connection is open, start the server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}, sing the song of my people! beep boop beep boop`);
  });
});
