// Requerimos mongoose e importamos el modelo
const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model");

//Conexión a la BBDD
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-movies-celebrities";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Soy el seed Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const celebrities = [
  {
    name: "Beyonce",
    occupation: "singer",
    catchPhrase: "If you like it then you should've put a ring on it",
  },
  {
    name: "Jay-Z",
    occupation: "singer",
    catchPhrase: "I got 99 problems but a b*tch ain't one",
  },
  {
    name: "Kim Kardashian",
    occupation: "unknown",
    catchPhrase: "Honey, would you put a bumper sticker on a Bentley?",
  },
  {
    name: "Ryan Gosling",
    occupation: "actor",
    catchPhrase: "Hey, girl",
  },
];

//Seed the database - celebrities

Celebrity.create(celebrities)
  .then((x) => {
    console.log(`Created ${x.length} celebrities`);
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(
      `An error occurred while creating celebrities from the DB: ${err}`
    )
  );


  //Solo se puede cerrar la conexión una vez por "seed"