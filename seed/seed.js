const mongoose = require("mongoose");

const MovieModel = require("../models/Movie.model");

const CelebrityModel = require("../models/Celebrity.model");

const MONGODB_URI = "mongodb://127.0.0.1/lab-movies-celebrities";

const movies = [
  {
    title: "Star Wars",
    genre: "Action",
    plot: "Rebel ships go piu piu, Death Star goes Brrrrappp",
  },
  {
    title: "Lord of the Rings",
    genre: "Fantasy",
    plot: "Basically a Harry Potter movie, what changes is the cast",
  },
  {
    title: "The Dark Knight",
    genre: "Action",
    plot: "Rich guy wears a rich Halowween costume and drives a rich car to beat bad guys",
  },
  {
    title: "Die Hard",
    genre: "Action",
    plot: "don't really remember what it is about, but I remember there is a bold guy",
  },
  {
    title: "The Matrix",
    genre: "sci-fi",
    plot: "They say virtual reality is real. Can you believe it??",
  },
  {
    title: "Pulp Fiction",
    genre: "Drama",
    plot: "Now, you’ve got a corpse in a car, minus a head, in a garage. Take me to it.",
  },
  {
    title: "King Kong",
    genre: "Adventure",
    plot: "There is a big monkey who chases little humans",
  },
  {
    title: "Fast and Furious",
    genre: "Action",
    plot: "Some guys go vrrrrrr, and steal other guys",
  },
  {
    title: "Avatar: The Last Airbender",
    genre: "Adventure",
    plot: "Little boy that was cryopreserved for some hundred of years is a guy who can control 4 elements of the nature",
  },
  {
    title: "I Am Legend",
    genre: "Horror",
    plot: "Last days of the humanity on this planet. Or he thinks so.",
  },
];

const celebrities = [
  {
    name: "Harrison Ford",
    occupation: "Actor",
    catchPhrase: "I have a baaad feeling about this",
  },
  {
    name: "Sean Bean",
    occupation: "Actor",
    catchPhrase: "Winter is Coming!",
  },
  {
    name: "Christian Bale",
    occupation: "Actor",
    catchPhrase: "I'm Batman",
  },
  {
    name: "Bruce Willis",
    occupation: "Actor",
    catchPhrase: "Yippee-ki-yay.",
  },
  {
    name: "Keanu Reeves",
    occupation: "Actor",
    catchPhrase: "We have a city to burn",
  },
  {
    name: "Samuel L. Jackson",
    occupation: "Actor",
    catchPhrase: "Mother******",
  },
  {
    name: "Jack Black",
    occupation: "Actor",
    catchPhrase: "COMINGTOYAAAAAHAAAAA",
  },
  {
    name: "Vin Diesel",
    occupation: "Actor",
    catchPhrase: "I don't have friends, I have Family",
  },
  {
    name: "Noah Ringer",
    occupation: "Actor",
    catchPhrase: "No guys, my Avatar isn't blue!",
  },
  {
    name: "Will Smith",
    occupation: "Actor",
    catchPhrase: "Well, all I know is what I read in the papers.",
  },
];

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connection established!");
    return CelebrityModel.create(celebrities);
  })
  .then(() => {
    console.log("Movies and Ceelebrities updated");
    return MovieModel.create(movies);
  })
  .then(() => {
    console.log("Connection closed!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Error while seeding db: ", err);
  });
