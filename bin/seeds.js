// bin/seeds.js

const mongoose = require("mongoose");
const Celeb = require("../models/Celebrity.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-movies-celebrities";

const celebs = [
	{
		name: "Tom Hanks",
		ocupation: "Actor",
		catchPhrase: "Momma saids im special"
	},
];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);

    // Create new documents in the books collection
    return Celeb.create(celebs);
  })
  .then((booksFromDB) => {
    console.log(`Created ${booksFromDB.length} books`);

    // Once the documents are created, close the DB connection
    return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log("DB connection closed!");
  })
  .catch((err) => {
    console.log(`An error occurred while creating books from the DB: ${err}`);
  });