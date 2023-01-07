const mongoose = require("mongoose");

const MovieModel = require("../models/Movie.model");

const CelebrityModel = require("../models/Celebrity.model");

const MONGODB_URI = process.env.MONGODB_URI;

const movies = [
  {
    title: "Star Wars",
    genre: "Action",
    plot: "Rebel ships go piu piu, Death Star goes Brrrrappp",
  },
];

const celebrities = [
  {
    name: "Harrison Ford",
    occupation: "Actor",
    catchPhrase: "I have a baaad feeling about this",
  },
];

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connection established!");
    return CelebrityModel.create(celebrities);
  })
  .then(() => {
    console.log("Connection closed!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Error while seeding db: ", err);
  });
