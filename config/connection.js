const mongoose = require("mongoose");

// Connect to the MongoDB database, either using the connection string in the process environment or a local connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social-network",
  {
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
  }
);

// Enable debugging messages for Mongoose
mongoose.set("debug", true);

// Export the Mongoose connection object
module.exports = mongoose.connection;
