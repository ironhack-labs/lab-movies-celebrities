const mongoose = require('mongoose');
const { count } = require('../models/Celebrity.model');
const Celebrity = require('../models/Celebrity.model');


const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab-movies-celebrities';

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
    name: "Scarlett Johansson",
    occupation: "Actress",
    catchPhrase: "Success is most often achieved by those who don’t know that failure is inevitable"
  },
  {
    name: "Dwayne Johnson",
    occupation: "Actor",
    catchPhrase: "I am thankful for all of those who said NO to me. It’s because of them I’m doing it myself.",
  },
  {
    name: "Jennifer Lawrence",
    occupation: "Actress",
    catchPhrase: "Saying it is impossible to live without failing at something is impossible. Unless you live so cautiously that you might as well not have lived at all, in which case you have failed by default.",
  },
  {
    name: "Vin Diesel",
    occupation: "Actor",
    catchPhrase: "I’ve failed over and over and over again in my life. And that is why I succeed.",
  },
  {
    name: "Angelina Jolie",
    occupation: "Actress",
    catchPhrase: "I walk slowly but never backward.",
  },

];




Celebrity.create(celebrities)
  .then(celebritiesFromDB => {
    console.log(`Created ${celebritiesFromDB.length} celebrities`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating celebrities from the DB: ${err}`));
