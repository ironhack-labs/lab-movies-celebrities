const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model");


const DB_NAME = 'lab-movies-celebrities';
const MONGO_DB_URI = 'mongodb://127.0.0.1:27017'

const celebrities = require("../data.json");

mongoose.connect(`${MONGO_DB_URI}/${DB_NAME}`)
  .then(() => {
    console.log(`Connected to DB: ${DB_NAME}`)
  })
  .catch(err => {
    console.error(err)
    process.exit(0);
  })

process.on("SIGINT", function () {
  mongoose.connection.close()
    .then(() => {
      console.log("Mongoose disconnected on app termination");
      process.exit(0);
    })
    .catch(err => console.log(`Error disconnecting: ${err}`))
});

mongoose.connection.once("open", () => {
  Celebrity.deleteMany()
    .then(() => {
      return Celebrity.create(celebrities);
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .then(() => {
      console.log("Connection closed");
      process.exit(1);
    })
    .catch((err) => {
      console.error(err);
      process.exit();
    });
});
