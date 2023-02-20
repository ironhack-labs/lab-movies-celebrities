// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

<<<<<<< HEAD
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/lab-movies-celebrities";
mongoose.set('strictQuery', false)
=======
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-movies-celebrities";

>>>>>>> e7c62d983b383bac70f302b9f7650e2f29e56ea5
mongoose
  .set("strictQuery", false)
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
