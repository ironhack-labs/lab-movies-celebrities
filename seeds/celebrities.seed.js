const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-movies-celebrities";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const celebrities = [
  {
    name: "Tom Cruise",
    occupation: "actor",
    catchPhrase: "Prizes are wonderfulPrizes are wonderful",
  },
  {
    name: "Beyonce",
    occupation: "singer",
    catchPhrase: "Trust is very important, and not just in relationships.",
  },
  {
    name: "Will Smith",
    occupation: "actor",
    catchPhrase:
      "Don't chase people. Be yourself, do your thing and work hard ",
  },
];

Celebrity.create(celebrities)
  .then((celebritiesFromDB) => {
    console.log(`Created ${celebritiesFromDB.length} celebrities`);
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while creating books from the DB: ${err}`)
  );
