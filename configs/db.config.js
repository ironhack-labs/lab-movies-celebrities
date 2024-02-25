const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-movies-celebrities";

mongoose.connect(MONGODB_URI)
  .then(() => console.log(`Connected to Mongo! Database: "${MONGODB_URI}"`))
  .catch((error) => console.error("Error connecting to mongo: ", error));