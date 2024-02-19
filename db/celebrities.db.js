// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const DB_NAME = "movies-celebrities";
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

mongoose
  .connect(`${MONGO_URI}/${DB_NAME}`)
  .then(() => console.log(`Connected to db: ${DB_NAME}`))
  .catch((err) => console.error(`Error conecting to Mongo: ${err}`));

process.on("SIGINT", () => {
  mongoose.connection
    .close()
    .then(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    })
    .catch((err) =>
      console.log(`Mongoose default connection disconnection error: ${err}`)
    );
});
