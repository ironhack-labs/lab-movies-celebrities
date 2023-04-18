// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
require('dotenv').config();
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI
mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
  const express = require("express");
  
  const app = express();
  
  // Use the celebrities router for all routes starting with "/celebrities"
  // app.use("/celebrities", celebritiesRouter);
  
  // Start the server
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });